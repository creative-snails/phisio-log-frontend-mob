import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import { DatePicker } from "../formElements/DatePicker";
import FollowUpActions from "./FollowUpActions";

import { commonStyles } from "@/styles/commonStyles";
import { MedicalConsultationType } from "@/types/healthRecordTypes";
import { removeItem, updateItemProperty } from "@/utils/arrayHelpers";

type MedicalConsultationProps = {
  consultation: MedicalConsultationType;
  index: number;
  localValue: MedicalConsultationType[];
  setLocalValue: (value: MedicalConsultationType[]) => void;
  datePickerProps: {
    isOpen: boolean;
    onDismiss: () => void;
    onConfirm: ({ date }: { date: CalendarDate }) => void;
    date: Date;
    value?: string;
    onPress: () => void;
  };
};

const MedicalConsultation = ({
  consultation,
  index,
  localValue,
  setLocalValue,
  datePickerProps,
}: MedicalConsultationProps) => {
  return (
    <View style={styles.innerContainer}>
      <TextInput
        placeholder="Enter consultant name"
        style={commonStyles.textInput}
        value={consultation.consultant}
        onChangeText={(text) => setLocalValue(updateItemProperty(localValue, index, "consultant", text))}
      />
      <DatePicker
        isOpen={datePickerProps.isOpen}
        onDismiss={datePickerProps.onDismiss}
        onConfirm={datePickerProps.onConfirm}
        date={datePickerProps.date}
        value={consultation.date}
        onPress={datePickerProps.onPress}
      />
      <TextInput
        placeholder="Enter diagnosis"
        style={commonStyles.textInput}
        value={consultation.diagnosis}
        onChangeText={(text) => setLocalValue(updateItemProperty(localValue, index, "diagnosis", text))}
      />
      <FollowUpActions
        consultationIndex={index}
        followUpActions={consultation.followUpActions}
        localValue={localValue}
        setLocalValue={setLocalValue}
      />
      <TouchableOpacity style={commonStyles.btn} onPress={() => setLocalValue(removeItem(localValue, index))}>
        <Text>Remove Consultation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: "center",
    borderRadius: 8,
    boxShadow: "1px 1px 10px #000",
    marginHorizontal: 8,
    marginVertical: 20,
    padding: 8,
  },
});

export default MedicalConsultation;
