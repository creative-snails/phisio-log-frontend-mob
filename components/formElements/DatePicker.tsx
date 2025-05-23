import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { DatePickerModal, enGB, registerTranslation } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

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
      <TouchableOpacity style={styles.dateBtn} onPress={onPress}>
        <Text style={styles.dateText}>{value ? value.toString() : "Select Date"}</Text>
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  dateBtn: {
    backgroundColor: "#afd0e3",
    borderRadius: 10,
    boxShadow: "2px 2px 0px #000",
    marginHorizontal: "auto",
    marginVertical: 15,
    padding: 5,
    width: "auto",
  },
  dateText: {
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});
