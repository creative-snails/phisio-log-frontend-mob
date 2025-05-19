import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { DatePicker } from "@/components/formElements/DatePicker";
import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useDatePicker } from "@/hooks/useDatePicker";
import { useFormEdit } from "@/hooks/useFormEdit";
import { commonStyles } from "@/styles/commonStyles";
import { Symptom } from "@/types/healthRecordTypes";
import { addField, removeField } from "@/utils/arrayHelpers";
import { SCREEN_LABELS } from "@/utils/constants";
import { validators } from "@/utils/validators";

const EditSymptoms = () => {
  const { localValue, setLocalValue, handleSave, loading } = useFormEdit("symptoms", validators.symptoms);

  const updateSymptom = (index: number, key: string, value: string) => {
    const updatedSymptoms = localValue.map((symptom, i) => (i === index ? { ...symptom, [key]: value } : symptom));
    setLocalValue(updatedSymptoms);
  };

  const handleDateChange = (index: number, dateString: string) => {
    updateSymptom(index, "startDate", dateString);
  };

  const getSymptomDate = (symptom: Symptom) => (symptom.startDate ? new Date(symptom.startDate) : new Date());

  const { isOpen, selectedItemIndex, openDatePicker, closeDatePicker, handleConfirmDate, getCurrentDate } =
    useDatePicker({ onDateChange: handleDateChange, getItemDate: getSymptomDate });

  return (
    <EditScreenLayout title={SCREEN_LABELS.EDIT.SYMPTOMS} loading={loading}>
      {localValue.map((symptom, index) => (
        <View key={index} style={styles.container}>
          <TextInput
            style={commonStyles.textInput}
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
          <TouchableOpacity style={commonStyles.btn} onPress={() => setLocalValue(removeField(localValue, index))}>
            <Text>Remove Symptom</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={commonStyles.btn}
          onPress={() =>
            setLocalValue(addField(localValue, { name: "", startDate: new Date().toISOString().split("T")[0] }))
          }
        >
          <Text>Add Symptom</Text>
        </TouchableOpacity>
      </View>
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    boxShadow: "2px 2px 3.84px rgba(0, 0, 0, 0.4)",
    margin: 8,
    padding: 8,
  },
});

export default EditSymptoms;
