import React, {useState} from "react";
import {BlockStack, Box, Icon, InlineStack, Text, TextField, Thumbnail} from "@shopify/polaris";
import {Modal} from "@shopify/app-bridge-react";
import {ClipboardIcon} from "@shopify/polaris-icons";

const InfoField = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const hideModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(props.code).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  return (
    <div className={"setting-info-field"}>
      <label style={{marginBottom: "var(--p-space-100)", display: "block"}}>{props.label}</label>
      <Box background={"bg"} borderRadius={"200"} padding={"300"}>
        <BlockStack gap={300}>
          <InlineStack gap={300} align={"space-between"}>
            {
              props.content && <Box>
                {props.content}
              </Box>
            }
            {
              props.guideImage && <Box onClick={openModal} aria-haspopup={true}>
                <Thumbnail source={props.guideImage} alt={""}/>
                <Modal open={modalOpen} onHide={hideModal} variant={"large"}>
                  <img src={props.guideImage} alt="" style={{maxWidth: "100%"}}/>
                </Modal>
              </Box>
            }
          </InlineStack>
          {
            props?.code && <Box position={"relative"}>
              <TextField label={""} autoComplete={"off"} value={props.code || ""}
                         multiline={true} variant={"borderless"}/>
              <div className={"clipboard-icon"} onClick={copyCode}>
                {!copied && <Icon source={ClipboardIcon}/>}
                {copied && <Text as={"span"}>Copied</Text>}
              </div>
            </Box>
          }
        </BlockStack>
      </Box>
    </div>
  );
};

export default InfoField;
