import {
  Card,
  BlockStack,
  Text,
  RadioButton,
  Select,
  TextField,
  Checkbox,
  Divider, Box,
} from "@shopify/polaris";
import {useState, useCallback} from "react";
import SettingField from "../../page/SettingField.jsx";
import {setStoreSetting, useStoreSettings} from "../../page/store.js";

export default function ControlBar({tabContent}) {
  const [discountOption, setDiscountOption] = useState("discount");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("10");
  const [setExpiration, setSetExpiration] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);
  const [stickyBar, setStickyBar] = useState("no");
  const [sidebarWidget, setSidebarWidget] = useState("no");

  const discountTypeOptions = [
    {label: "Percentage off", value: "percentage"},
    {label: "Fixed amount", value: "fixed"},
    {label: "Free shipping", value: "free_shipping"},
  ];
  const settings = useStoreSettings();
  const settingChange = (name, value) => {
    setStoreSetting(name, value);
  };
  return (
    <Box padding="400" background={'bg-surface'}>
      <BlockStack gap="400">
        {tabContent?.sections?.map((section, index) => {
          return (
            <Box key={index} padding="0">
             <BlockStack>
               <BlockStack gap="400">
                 <Text variant="headingMd" as="h6">
                   {section.title}
                 </Text>
                 <Text variant="bodySm" tone="subdued" as={'p'}>
                   {section.desc}
                 </Text>
               </BlockStack>
               {
                 section?.options?.map((option, index) => {
                   return (
                     <SettingField key={index} settings={settings} settingChange={settingChange} {...option} />
                   )
                 })
               }
             </BlockStack>
            </Box>
          );
        })}
        {/* Discount section */}
        <Text variant="headingMd" as="h6">
          Discount coupon
        </Text>
        <Text variant="bodySm" tone="subdued">
          Attract customers to subscribe with a discount code.
        </Text>

        <RadioButton
          label="No discount"
          checked={discountOption === "none"}
          id="noDiscount"
          name="discount"
          onChange={() => setDiscountOption("none")}
        />
        <RadioButton
          label="Discount code"
          checked={discountOption === "discount"}
          id="discountCode"
          name="discount"
          onChange={() => setDiscountOption("discount")}
        />
        {discountOption === "discount" && (
          <BlockStack gap="300">
            <Text variant="bodySm" tone="subdued">
              Auto-generate a unique and non-reusable code for each subscription.
            </Text>
            <Select
              label="Select type"
              options={discountTypeOptions}
              value={discountType}
              onChange={setDiscountType}
            />
            <TextField
              label="Value"
              value={discountValue}
              onChange={setDiscountValue}
              suffix={discountType === "percentage" ? "%" : ""}
              type="number"
              autoComplete="off"
            />
            <Checkbox
              label="Set expiration on discount"
              checked={setExpiration}
              onChange={setSetExpiration}
            />
          </BlockStack>
        )}
        <RadioButton
          label="Enter Shopify discount manually"
          checked={manualEntry}
          id="manualDiscount"
          name="discount"
          onChange={() => {
            setDiscountOption("none");
            setManualEntry(!manualEntry);
          }}
        />

        <Divider/>

        {/* Sticky discount bar */}
        <Text variant="headingMd" as="h6">
          Sticky discount bar
        </Text>
        <Text variant="bodySm" tone="subdued">
          Display a sticky discount bar at the top of your website after a successful subscription.
        </Text>
        <RadioButton
          label="Show"
          checked={stickyBar === "yes"}
          id="showSticky"
          name="sticky"
          onChange={() => setStickyBar("yes")}
        />
        <RadioButton
          label="Don't show"
          checked={stickyBar === "no"}
          id="hideSticky"
          name="sticky"
          onChange={() => setStickyBar("no")}
        />

        <Divider/>

        {/* Sidebar widget */}
        <Text variant="headingMd" as="h6">
          Sidebar widget
        </Text>
        <Text variant="bodySm" tone="subdued">
          Display a sidebar widget if the customer declines the popup without subscribing.
        </Text>
        <RadioButton
          label="Show"
          checked={sidebarWidget === "yes"}
          id="showWidget"
          name="sidebar"
          onChange={() => setSidebarWidget("yes")}
        />
        <RadioButton
          label="Don't show"
          checked={sidebarWidget === "no"}
          id="hideWidget"
          name="sidebar"
          onChange={() => setSidebarWidget("no")}
        />
      </BlockStack>
    </Box>
  );
}
