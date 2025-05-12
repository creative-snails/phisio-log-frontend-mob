import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useFormEdit } from "@/hooks/useFormEdit";
import { validators } from "@/utils/validators";

registerTranslation("en-GB", enGB);

const EditSymptoms = () => {
  const { localValue, setLocalValue, handleSave, loading } = useFormEdit("symptoms", validators.symptoms);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedSymptomIndex, setSelectedSymptomIndex] = useState<number | null>(null);

  const updateSymptom = (index: number, key: string, value: string) => {
    const updatedSymptoms = localValue.map((symptom, i) => (i === index ? { ...symptom, [key]: value } : symptom));
    setLocalValue(updatedSymptoms);
  };

  const datePicker = (index: number) => {
    setSelectedSymptomIndex(index);
    setOpenDatePicker(true);
  };

  const handleConfirmDate = (date: CalendarDate) => {
    if (selectedSymptomIndex !== null && date) {
      updateSymptom(selectedSymptomIndex, "startDate", date.toISOString().split("T")[0]);
    }
    setOpenDatePicker(false);
  };

  const getDate = (selectedIndex: number | null) =>
    selectedIndex !== null && localValue[selectedIndex].startDate
      ? new Date(localValue[selectedIndex].startDate)
      : new Date();

  return (
    <EditScreenLayout title="Edit Symptoms" loading={loading}>
      {localValue.map((symptom, index) => (
        <View key={index} style={styles.container}>
          <TextInput
            style={styles.textInput}
            value={symptom.name}
            onChangeText={(text) => updateSymptom(index, "name", text)}
          />
          <Button onPress={() => datePicker(index)} mode="outlined">
            {symptom.startDate ? symptom.startDate.toString() : ""}
          </Button>
        </View>
      ))}
      <SaveCancelButtons onSave={handleSave} />
      <DatePickerModal
        locale="en-GB"
        mode="single"
        label="Select date"
        saveLabel="   SAVE"
        visible={openDatePicker}
        onDismiss={() => setOpenDatePicker(false)}
        date={getDate(selectedSymptomIndex)}
        onConfirm={({ date }) => handleConfirmDate(date)}
      />
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
