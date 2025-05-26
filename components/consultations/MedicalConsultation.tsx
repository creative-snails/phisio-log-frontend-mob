import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FollowUpActions from "./FollowUpActions";

import { DatePicker } from "@/components/formElements/DatePicker";
import { useDatePicker } from "@/hooks/useDatePicker";
import { commonStyles } from "@/styles/commonStyles";
import { removeItem, updateItemProperty } from "@/utils/arrayHelpers";
import { MedicalConsultation } from "@/validation/healthRecordSchema";

type MedicalConsultationProps = {
  consultation: MedicalConsultation;
  index: number;
  localValue: MedicalConsultation[];
  setLocalValue: (value: MedicalConsultation[]) => void;
};

const MedicalConsultation = ({ consultation, index, localValue, setLocalValue }: MedicalConsultationProps) => {
  const handleDateChange = (index: number, dateString: Date) =>
    setLocalValue(updateItemProperty(localValue, index, "date", dateString));

  const getConsultationDate = (consultation: MedicalConsultation) =>
    consultation.date ? new Date(consultation.date) : new Date();

  const { isOpen, selectedItemIndex, openDatePicker, closeDatePicker, handleConfirmDate, getCurrentDate } =
    useDatePicker({
      onDateChange: handleDateChange,
      getItemDate: getConsultationDate,
    });

  return (
    <View style={styles.innerContainer}>
      <TextInput
        placeholder="Enter consultant name"
        style={commonStyles.textInput}
        value={consultation.consultant}
        onChangeText={(text) => setLocalValue(updateItemProperty(localValue, index, "consultant", text))}
      />
      <DatePicker
        isOpen={isOpen && selectedItemIndex === index}
        onDismiss={closeDatePicker}
        onConfirm={({ date }) => handleConfirmDate(date)}
        date={getCurrentDate(localValue)}
        value={consultation.date}
        onPress={() => openDatePicker(index)}
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
