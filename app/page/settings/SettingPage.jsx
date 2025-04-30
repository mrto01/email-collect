import {BlockStack, Box, Card, InlineStack, Page, Tabs, Text} from "@shopify/polaris";
import {useState} from "react";
import SettingField from "../SettingField.jsx";
import {setEditModalOpen, setStoreSetting, useEditEmailModal, useStoreSettings} from "../store.js";
import {Modal, TitleBar} from "@shopify/app-bridge-react";

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
          type: 'popup_template',
          label: 'Popup',
          name: 'enable_popup_template',
          helpText: 'Enable or disable popup to show customer in frontend.',
          activatorText: 'Edit template',
          modalSrc: '/popup-editor/customer_state_update_email',
          modalTitle: 'Popup template',
        },
      ],
    }
  ]
  const [selected, setSelected] = useState(0);
  const handleTabChange = (selectedTabIndex) => setSelected(selectedTabIndex);
  const settings = useStoreSettings();
  const settingChange = (name, value) => {
    setStoreSetting(name, value);
  };
  return (
      <BlockStack gap="300">
        <Card padding="0">
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}/>
        </Card>
        <Card padding={"500"}>
          <BlockStack gap="400">
            {
              tabs.map( ( tab, i) => (
                <TabWrapper key={i} selected={selected === i}>
                  {
                    !!tab?.options && tab.options.map( (el, elIndex ) => {
                      return (
                        <SettingField key={elIndex} settings={settings} settingChange={settingChange} {...el} />
                      );
                    })
                  }
                </TabWrapper>
              ))
            }
          </BlockStack>
        </Card>
      </BlockStack>
  )
}

const EditingModal = () => {
  let {open, src, title} = useEditEmailModal();
  return (
    <Modal onHide={() => setEditModalOpen(false)} open={open} src={src} variant={'max'}>
      <TitleBar title={title}/>
    </Modal>
  );
};


const SettingPage = () => {
  return (
    <Page title={"Settings"}>
      <ControlSections/>
      <EditingModal/>
    </Page>
  );
}

export default SettingPage;
