import {useState} from "react";
import {Button, Card, DatePicker, Icon, Popover, TextField} from "@shopify/polaris";
import {CalendarIcon, XIcon} from "@shopify/polaris-icons";

const formatDate = (date) => {
  if (!date) return "";
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const DatePickerField = ({value, onChange, connectedRight, ...props}) => {
  let date = value ? new Date(value) : new Date();
  const [visible, setVisible] = useState(false);
  const [{month, year}, setDate] = useState({
    month: date.getMonth(),
    year: date.getFullYear(),
  });

  const formattedValue = formatDate(value);

  function handleInputValueChange() {
    console.log("handleInputValueChange");
  }

  function handleOnClose({relatedTarget}) {
    setVisible(false);
  }

  function handleMonthChange(month, year) {
    setDate({month, year});
  }

  function handleDateSelection({end: newSelectedDate}) {
    onChange(formatDate(newSelectedDate));
    setVisible(false);
  }

  const removeValue = () => {
    onChange("");
  };

  return (
    <Popover
      active={visible}
      autofocusTarget="none"
      preferredAlignment="left"
      fullWidth
      preferInputActivator={false}
      preferredPosition="below"
      preventCloseOnChildOverlayClick
      onClose={handleOnClose}
      activator={
        <TextField
          role="combobox"
          label={props?.label || ""}
          prefix={<Icon source={CalendarIcon}/>}
          value={formattedValue}
          onFocus={() => setVisible(true)}
          onChange={handleInputValueChange}
          autoComplete="off"
          suffix={<Button icon={XIcon} variant={"plain"} size={"large"} onClick={removeValue}/>}
        />
      }
    >
      <Card>
        <DatePicker
          month={month}
          year={year}
          selected={date}
          onMonthChange={handleMonthChange}
          onChange={handleDateSelection}
        />
      </Card>
    </Popover>
  );
};

export default DatePickerField;
