import { DatePickerModal, enGB, registerTranslation } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

import CustomButton from "@/components/Button";

registerTranslation("en-GB", enGB);

type DatePickerProps = {
  isOpen: boolean;
  onDismiss: () => void;
  onConfirm: (params: { date: CalendarDate }) => void;
  date: Date;
  value?: string | Date | null;
  onPress: () => void;
};

export const DatePicker = ({ isOpen, onDismiss, onConfirm, date, value, onPress }: DatePickerProps) => {
  return (
    <>
      <CustomButton title={value ? value.toString() : "Select Date"} onPress={onPress} />
      <DatePickerModal
        locale="en-GB"
        mode="single"
        label="Select date"
        saveLabel="   SAVE"
        visible={isOpen}
        onDismiss={onDismiss}
        date={date}
        onConfirm={onConfirm}
      />
    </>
  );
};
