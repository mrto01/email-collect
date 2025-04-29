import {Box, Button, InlineStack, Text} from "@shopify/polaris";
import React from "react";

 const InsertBlockField = (props) => {
  return (
    <InlineStack gap={"200"} blockAlign="center">
      <Box paddingInlineStart={props.indent || 0}>
        <Text as="p" variant="bodyMd">
          {props.label}
        </Text>
      </Box>
      <Button url={props.url} target="_blank">{props.buttonName}</Button>
    </InlineStack>
  );
};

export default InsertBlockField;
