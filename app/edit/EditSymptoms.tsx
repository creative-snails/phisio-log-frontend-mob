import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { DatePicker } from "@/components/formElements/DatePicker";
import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useDatePicker } from "@/hooks/useDatePicker";
import { useEditForm } from "@/hooks/useEditForm";
import { commonStyles } from "@/styles/commonStyles";
import { addItem, removeItem, updateItemProperty } from "@/utils/arrayHelpers";
import { SCREEN_LABELS } from "@/utils/constants";
import { Symptom } from "@/validation/healthRecordSchema";
import { validators } from "@/validation/validators";

const EditSymptoms = () => {
  const { localValue, setLocalValue, handleSave, loading } = useEditForm("symptoms", validators.symptoms);

  const handleDateChange = (index: number, date: Date) => {
    setLocalValue(updateItemProperty(localValue, index, "startDate", date));
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
            onChangeText={(text) => setLocalValue(updateItemProperty(localValue, index, "name", text))}
          />
          <DatePicker
            isOpen={isOpen && selectedItemIndex === index}
            onDismiss={closeDatePicker}
            onConfirm={({ date }) => handleConfirmDate(date)}
            date={getCurrentDate(localValue)}
            value={symptom.startDate ? new Date(symptom.startDate) : null}
            onPress={() => openDatePicker(index)}
          />
          <TouchableOpacity
            style={commonStyles.btn}
            onPress={() => {
              closeDatePicker();
              setLocalValue(removeItem(localValue, index));
            }}
          >
            <Text>Remove Symptom</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={commonStyles.btn}
          onPress={() => setLocalValue(addItem(localValue, { name: "", startDate: new Date() }))}
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
