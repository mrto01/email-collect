import {
  BlockStack,
  Box,
  Button,
  ButtonGroup, Checkbox,
  FullscreenBar, InlineGrid, InlineStack, Scrollable, Select,
  Spinner, Tabs,
  Text, TextField
} from "@shopify/polaris";
import {useLoaderData} from "@remix-run/react";
import {useEffect, useState} from "react";
import {AppProvider} from "@shopify/shopify-app-remix/react";
import {ClientOnly} from "remix-utils/client-only";
import {setEditModalOpen} from "../page/store.js";
import {DesktopIcon, MobileIcon, ViewIcon} from "@shopify/polaris-icons";
import ControlBar from "./components/ControlBar.jsx";
import PopupPreview from "./components/PopupPreview.jsx";

const ClientOnlyLoading = () => {
  return <div style={{height: '100vh', display: 'flex', position: 'relative', flex: '1 1 0%'}}>
    <div style={{
      position: 'absolute',
      inset: '0px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }}>
      <Spinner size="small"/>
    </div>
  </div>;
};

const HeaderBar = () => {
  const onAction = () => {
    setEditModalOpen(false);
  }
  return (
    <FullscreenBar onAction={onAction}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 25px',
        width: '100%'
      }}>
        <Text variant="headingLg" as="span">
          Page title
        </Text>
        <ButtonGroup>
          <Button onClick={() => {
          }} icon={ViewIcon}>
            Preview popup
          </Button>
          <Button variant="primary" onClick={() => {
          }}>
            Save
          </Button>
        </ButtonGroup>
      </div>
    </FullscreenBar>
  );
}

const LayoutColumn = ({display = 'block', children}) => {
  return (
    <Scrollable style={{height: 'calc(100vh - 64px)', display: display}}>
      {children}
    </Scrollable>
  );
};


const PopupEditor = () => {
  let layout = '320px 1fr';
  const [selected, setSelected] = useState(0);
  const tabs = [
    {
      id: 'popup-rule',
      content: 'Rules',
      accessibilityLabel: 'Rules',
      panelID: 'popup-rule',
      sections: [
        {
          title: 'Discount',
          desc: 'Attract customers to subscribe with a discount code.',
          options: [
            {
              type: 'radio',
              name: 'use_discount_type',
              choices: [
                {
                  'label': 'No discount',
                  'value': 'none'
                },
                {
                  'label': 'Auto discount code',
                  'value': 'discount_code',
                  render: () => {
                    return (
                      <BlockStack gap="300">
                        <Text variant="bodySm" tone="subdued" as={'p'}>
                          Auto-generate a unique and non-reusable code for each subscription.
                        </Text>
                      </BlockStack>
                    );
                  }
                },
                {
                  'label': 'Existing discount code',
                  'value': 'existing_discount_code',
                  render: () => {
                    return (
                      <Box paddingBlockStart={'150'}>
                        <Text variant="bodySm" tone="subdued" as={'p'}>
                          Use an existing discount code
                        </Text>
                      </Box>
                    );
                  }
                }
              ]
            }
          ]
        },
      ],
    },
    {
      id: 'popup-layout',
      content: 'Layout',
      panelID: 'popup-layout',
      sections: [],
    },
    {
      id: 'popup-style',
      content: 'Style',
      panelID: 'popup-style',
      sections: [],
    }
  ];
  const handleTabChange = (selectedTabIndex) => {
    setSelected(selectedTabIndex);
  }
  const [selectedView, setSelectedView] = useState('desktop');

  return (
    <InlineGrid columns={{xs: layout, sm: layout, md: layout, lg: layout}}>
      <Box>
        <Box borderStyle={'solid'}
             borderBlockEndWidth={'025'}
             borderBlockStartWidth={'025'}
             borderInlineEndWidth={'025'}
             borderColor={'border'}
             background={'bg-surface'}>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted/>
        </Box>
        <LayoutColumn display={'grid'}>
          <ControlBar tabContent={tabs[selected]}/>
        </LayoutColumn>
      </Box>
      <Box>
        <Box borderStyle={'solid'}
             borderBlockEndWidth={'025'}
             borderBlockStartWidth={'025'}
             borderColor={'border'}
             background={'bg-surface'}
             paddingBlock={'150'}
        >
          <InlineStack blockAlign={'center'} align={'center'}>
            <ButtonGroup variant="segmented">
              <Button
                pressed={selectedView === 'desktop'}
                onClick={() => setSelectedView('desktop')}
                icon={DesktopIcon}
                size={'large'}
              />
              <Button
                pressed={selectedView === 'mobile'}
                onClick={() => setSelectedView('mobile')}
                icon={MobileIcon}
                size={'large'}
              />
            </ButtonGroup>
          </InlineStack>
        </Box>
        <LayoutColumn>
          <PopupPreview/>
        </LayoutColumn>
      </Box>
    </InlineGrid>
  );
}

export default function PopupEditorPage() {
  const {apiKey} = useLoaderData();
  const preventRedirect = (e) => {
    if (e.target.nodeName === 'A' || e.target.nodeName === 'IMG') {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener('click', preventRedirect);

    return () => {
      document.removeEventListener('click', preventRedirect);
    };

  }, []);

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ClientOnly fallback={<ClientOnlyLoading/>}>
        {
          () =>
            <Box background={'bg'}>
              <HeaderBar/>
              <PopupEditor/>
            </Box>
        }
      </ClientOnly>
    </AppProvider>
  );
}
