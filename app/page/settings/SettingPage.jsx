import {BlockStack, Box, Card, InlineStack, Page, Tabs, Text} from "@shopify/polaris";
import {useState} from "react";
import SettingField from "../SettingField.jsx";
import {setStoreSetting, useStoreSettings} from "../store.js";

const TabWrapper = ({selected, children}) => {
  return <div style={{display: selected ? "block" : "none"}}>
    <BlockStack gap={"600"}>
      {children}
    </BlockStack>
  </div>;
};

const ControlSections = () => {
  const tabs = [
    {
      id: "general",
      content: "General",
      accessibilityLabel: "General",
      panelID: "general",
      options: [
        {
          id: "general",
          title: "General Settings",
          content: "General settings content goes here.",
        },
      ],
    },
    {
      id: "popup",
      content: "Popup",
      accessibilityLabel: "Popup",
      panelID: "popup",
      options: [
        {
          type: "popup_template",
          title: "Popup Settings",
          content: "",
        },
      ],
    }
  ]
  const [selected, setSelected] = useState(0);
  const handleTabChange = (selectedTabIndex) => setSelected(selectedTabIndex);
  const settings = useStoreSettings();
  let id = 0;
  const settingChange = (name, value) => {
    setStoreSetting(id, name, value);
  };
  return (
    <Card>
      <BlockStack>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}/>
        <BlockStack>
          {
            tabs.map( ( tab, i) => (
              <TabWrapper key={i} selected={selected === i}>
                {
                  !!tab?.options && tab.options.map( (el, elIndex ) => {
                    const {label} = el;
                    let newProps = {...el, label: ""};
                    let settingField = <SettingField key={elIndex} settings={settings} settingChange={settingChange} {...newProps} />;
                    return (
                      <InlineStack gap={"300"} wrap={false} key={elIndex}>
                        <Box width={"250px"}>
                          {label && <Text as="p">{label}</Text>}
                        </Box>
                        <Box width={"100%"}>
                          {settingField}
                        </Box>
                      </InlineStack>
                    );
                  })
                }
              </TabWrapper>
            ))
          }
        </BlockStack>
      </BlockStack>
    </Card>
  )
}

const SettingPage = () => {
  return (
    <Page title={"Settings"}>
      <ControlSections/>
    </Page>
  );
}

export default SettingPage;
