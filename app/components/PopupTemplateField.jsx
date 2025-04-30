import {Badge, BlockStack, Box, Button, Card, InlineStack, Text} from "@shopify/polaris";
import {setEditModalOpen, setEditModalSrc, setEditModalTitle} from "../page/store.js";

const EmailEditor = ({value, onChange, ...props}) => {
  const {label, helpText, activatorText, modalSrc, modalTitle} = props;

  const openModal = () => {
    setEditModalOpen(true);
    if (modalSrc) setEditModalSrc(modalSrc);
    if (modalTitle) setEditModalTitle(modalTitle);
  };

  const toggleStatus = () => {
    onChange(!value);
  };

  return (
    <Card>
      <InlineStack align={'space-between'} wrap={false} gap={'500'}>
        <BlockStack gap={'200'} inlineAlign={'start'}>

          <InlineStack gap={'200'} blockAlign={'center'} align={'start'}>
            <Text as={'span'} variant="headingMd">
              {label}
            </Text>
            <Badge size={'small'} tone={value ? 'success' : 'new'}>{value ? 'On' : 'Off'}</Badge>
          </InlineStack>

          {helpText && <Text as={'span'}>{helpText}</Text>}

          {activatorText && <Button variant={'plain'} onClick={openModal}>{activatorText}</Button>}

        </BlockStack>

        <Box>
          <Button onClick={toggleStatus}>
            <Text as={'span'} truncate={true}>{value ? 'Turn off' : 'Turn on'}</Text>
          </Button>
        </Box>

      </InlineStack>
    </Card>
  );
};

export default EmailEditor;
