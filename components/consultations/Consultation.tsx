import { StyleSheet, TextInput, View } from "react-native";
import FollowUpActions from "./FollowUpActions";

import CustomButton from "@/components/CustomButton";
import { DatePicker } from "@/components/formElements/DatePicker";
import { useDatePicker } from "@/hooks/useDatePicker";
import { commonStyles } from "@/styles/commonStyles";
import { removeItem, updateItemProperty } from "@/utils/arrayHelpers";
import { MedicalConsultation } from "@/validation/healthRecordSchema";

type ConsultationProps = {
  consultation: MedicalConsultation;
  index: number;
  localValue: MedicalConsultation[];
  setLocalValue: (value: MedicalConsultation[]) => void;
};

const Consultation = ({ consultation, index, localValue, setLocalValue }: ConsultationProps) => {
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
        value={consultation.date ? new Date(consultation.date) : null}
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
      <CustomButton
        title="Remove Consultation"
        variant="tertiary"
        onPress={() => setLocalValue(removeItem(localValue, index))}
      />
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

export default Consultation;
