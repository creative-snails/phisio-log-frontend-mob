import { DatePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import * as Localization from "expo-localization";

import CustomButton from "@/components/CustomButton";

type DatePickerProps = {
  isOpen: boolean;
  onDismiss: () => void;
  onConfirm: (params: { date: CalendarDate }) => void;
  date: Date;
  value?: string | Date | null;
  onPress: () => void;
};

export const DatePicker = ({ isOpen, onDismiss, onConfirm, date, value, onPress }: DatePickerProps) => {
  const deviceLocale = Localization.getLocales()[0].languageTag;

  const formattedValue =
    value instanceof Date ? value.toLocaleDateString(deviceLocale) : value?.toString() || "Select Date";

  return (
    <>
      <CustomButton title={formattedValue} onPress={onPress} />

      <DatePickerModal
        locale={deviceLocale}
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
