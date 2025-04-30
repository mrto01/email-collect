import {BlockStack, Box, Button, Card, Divider, DropZone, Grid, InlineStack, Pagination, Popover, Spinner, Text, TextField, Thumbnail} from '@shopify/polaris';
import {useEffect, useState} from 'react';
import {shopifyFetch} from '../../utils/utils.client.js';
import {XIcon} from '@shopify/polaris-icons';
import DOMPurify from 'dompurify';
import {useAppBridge} from '@shopify/app-bridge-react';

const uploadImage = async (file) => {
  try {
    const stagedUploadsCreate = async () => {
      let data = await shopifyFetch(`
        #graphql
        mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
          stagedUploadsCreate(input: $input) {
            stagedTargets {
              url
              resourceUrl
              parameters {
                name
                value
              }
            }
          }
        }`,
        {
          'input': [
            {
              filename: file.name,
              mimeType: file.type,
              httpMethod: 'POST',
              resource: 'IMAGE',
            },
          ],
        },
      );

      return data?.stagedUploadsCreate?.stagedTargets || [{}];
    };

    const putFile = async (url, parameters) => {
      const formData = new FormData();

      parameters.forEach(({name, value}) => {
        formData.append(name, value);
      });

      formData.append('file', file);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      return response;
    };

    const uploadFileToShopify = async (resourceUrl) => {
      const response = await shopifyFetch(`
        #graphql
        mutation fileCreate($files: [FileCreateInput!]!) {
          fileCreate(files: $files) {
            files {
              id
              fileStatus
              updatedAt
              preview {
                image {
                  url
                }
              }
            }
          }
        }`,
        {
          'files': {
            'alt': '',
            'contentType': 'IMAGE',
            'originalSource': resourceUrl,
          },
        },
      );

      return response?.fileCreate?.files || [];
    };

    const getImageWithRetry = async (id, retries = 5, delay = 2000) => {
      for (let i = 0; i < retries; i++) {
        let imageResponse = await shopifyFetch(
            `#graphql
          query getFileByID($id: ID!) {
            node(id: $id) {
              ... on MediaImage {
                id
                image {
                  url
                }
              }
            }
          }`,
          {id: id},
        );

        const image = imageResponse?.node?.image || null;

        if (image) {
          return image;
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      return null;
    };

    const [{url, parameters, resourceUrl}] = await stagedUploadsCreate();

    if (!url) {
      throw new Error();
    }

    const response = await putFile(url, parameters);
    if (!response.ok) {
      throw new Error('Put file');
    }

    const [{id, fileStatus}] = await uploadFileToShopify(resourceUrl);
    if (!id) throw new Error('Image id');

    if (fileStatus !== 'UPLOADED') throw new Error('Not uploaded file');

    let image = await getImageWithRetry(id);

    return image;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

const Modal = ({onChange, ...props}) => {
  const appBridge = useAppBridge();
  const [modalStatus, setModalStatus] = useState(false);
  const [images, setImages] = useState([]);
  const [searchImage, setSearchImage] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [{startCursor = null, endCursor = null, hasNextPage, hasPreviousPage}, setPagination] = useState({});

  const openModal = () => setModalStatus(true);
  const closeModal = () => setModalStatus(false);

  const onImageSearch = (v) => {
    setSearchImage(v);
  };

  const nextPage = async () => {
    await loadImage(endCursor);
  };

  const previousPage = async () => {
    await loadImage(startCursor, false);
  };

  const loadImage = async (cursor = null, next = true) => {
    setSearchLoading(true);
    shopifyFetch(`
      #graphql
      query loadImages($cursor:String){
        files(${next?'first':'last'}:12, ${next?'after':'before'}:$cursor) {
        nodes {
          ... on MediaImage {
            id
            image {
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          hasPreviousPage
          startCursor
        }
      }
      }`, {cursor: cursor},
    ).then(res => {
        if (res?.files?.nodes?.length) {
          setImages(res.files.nodes);
        }
        if (res?.files?.pageInfo) {
          setPagination(res.files.pageInfo);
        }
      },
    ).finally(() => setSearchLoading(false));
  };

  const handleDropZoneDrop = async (_dropFiles, acceptedFiles, _rejectedFiles) => {
    setUploading(true);
    let file = _dropFiles[0];
    let image = await uploadImage(file);

    if (typeof image === 'object' && image?.url) {
      onChange(image.url);
      closeModal();
    } else {
      appBridge.toast.show(image, {isError: true, duration: 3000});
    }
    setUploading(false);
  };

  useEffect(() => {
    setSearchLoading(true);
    loadImage().then();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchLoading(true);
      shopifyFetch(`
        #graphql
        query {
          files(first: 12, query: "${searchImage}") {
            nodes {
              ... on MediaImage {
                id
                image {
                  url
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
              hasPreviousPage
              startCursor
            }
          }
        }
      `).then(res => {
        if (res?.files?.nodes?.length) {
          setImages(res.files.nodes);
        } else {
          setImages([]);
        }
        if (res?.files?.pageInfo) {
          setPagination(res.files.pageInfo);
        }
      }).finally(() => setSearchLoading(false));

    }, 500);

    return () => clearTimeout(handler);
  }, [searchImage]);

  const activator = <Button size={'large'} onClick={() => setModalStatus(!modalStatus)}>Browse</Button>;

  return (
    <Popover active={modalStatus} fixed fullHeight
             preferredPosition={'mostSpace'}
             activator={activator}
             onClose={closeModal}>
      <Card>
        <BlockStack gap={'400'}>
          <InlineStack gap={'400'} align={'space-between'} blockAlign={'center'}>
            <Text as={'p'} variant={'headingMd'}>Select images</Text>
            <Button icon={XIcon} size={'large'} variant={'tertiary'} onClick={closeModal}/>
          </InlineStack>

          <TextField label={''} autoComplete={'off'} placeholder={'Search image'}
                     value={searchImage} onChange={onImageSearch}/>

          <Box position={'relative'} minWidth={'368px'}>
            {
              searchLoading && <div className={'vnot-load-image-overlay'}>
                <Spinner size={'small'}/>
              </div>
            }
            <Grid gap={'400'} columns={{xs: 4, sm: 4, lg: 4}}>
              {
                images.map((image, i) => {
                  const url = image?.image?.url || '';
                  return (
                    <Grid.Cell key={i}>
                      <Button variant={'plain'} onClick={() => onChange(url)}>
                        <Thumbnail source={url} alt={''} size={'large'}/>
                      </Button>
                    </Grid.Cell>
                  );
                })
              }
            </Grid>
          </Box>

          <InlineStack align={'center'}>
            <Pagination
              hasPrevious={hasPreviousPage}
              onPrevious={previousPage}
              hasNext={hasNextPage}
              onNext={nextPage}
            />
          </InlineStack>

          <Divider/>

          <DropZone onDrop={handleDropZoneDrop} allowMultiple={false} disabled={uploading} accept="image/*" type="image">
            <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png"/>
            {
              uploading && <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <Spinner size="small"/>
              </div>
            }
          </DropZone>
        </BlockStack>
      </Card>
    </Popover>
  );
};

export default function BrowseImageField({value, onChange, ...props}) {
  const onImageChange = (url) => {
    if (url) {
      url = DOMPurify.sanitize(url);
      try {
        url = new URL(url);
        url.search = '';
        url = url.toString();
      } catch (err) {
      }
    }

    onChange(url);
  };

  return (
    <>
      <TextField label={props.label}
                 autoComplete={'off'}
                 type={'url'}
                 value={value}
                 onChange={onImageChange}
                 {...props}
                 connectedRight={<Modal value={value} onChange={onImageChange} {...props} />}/>
    </>
  );
}
