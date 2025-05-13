import { StyleSheet, TextInput, View } from "react-native";
import { enGB, registerTranslation } from "react-native-paper-dates";

import { DatePicker } from "@/components/formElements/DatePicker";
import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useDatePicker } from "@/hooks/useDatePicker";
import { useFormEdit } from "@/hooks/useFormEdit";
import { Symptom } from "@/types/healthRecordTypes";
import { validators } from "@/utils/validators";

registerTranslation("en-GB", enGB);

const EditSymptoms = () => {
  const { localValue, setLocalValue, handleSave, loading } = useFormEdit("symptoms", validators.symptoms);

  const updateSymptom = (index: number, key: string, value: string) => {
    const updatedSymptoms = localValue.map((symptom, i) => (i === index ? { ...symptom, [key]: value } : symptom));
    setLocalValue(updatedSymptoms);
  };

  const handleDateChange = (index: number, dateString: string) => {
    updateSymptom(index, "startDate", dateString);
  };

  const getSymptomDate = (symptom: Symptom) => (symptom.startDate ? new Date(symptom.startDate) : null);

  const { isOpen, selectedItemIndex, openDatePicker, closeDatePicker, handleConfirmDate, getCurrentDate } =
    useDatePicker({ onDateChange: handleDateChange, getItemDate: getSymptomDate });

  return (
    <EditScreenLayout title="Edit Symptoms" loading={loading}>
      {localValue.map((symptom, index) => (
        <View key={index} style={styles.container}>
          <TextInput
            style={styles.textInput}
            value={symptom.name}
            onChangeText={(text) => updateSymptom(index, "name", text)}
          />
          <DatePicker
            isOpen={isOpen && selectedItemIndex === index}
            onDismiss={closeDatePicker}
            onConfirm={({ date }) => handleConfirmDate(date)}
            date={getCurrentDate(localValue)}
            value={symptom.startDate}
            onPress={() => openDatePicker(index)}
          />
        </View>
      ))}
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    margin: 8,
    padding: 8,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    margin: 8,
    padding: 8,
  },
});

export default EditSymptoms;
