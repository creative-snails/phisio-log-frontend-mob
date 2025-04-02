import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import { router } from "expo-router";

import useAppStore from "@/store/useAppStore";

const EditConsultations = () => {
  const { setHealthRecord, healthRecord, setLoading, loading } = useAppStore();
  const [localConsultations, setLocalConsultations] = useState(healthRecord.medicalConsultations);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showActions, setShowActions] = useState(false);

  const updateConsultation = (index: number, field: string, text: string) => {};

  const handleSave = () => {};

  const datePicker = (index: number) => {
    setSelectedIndex(index);
    setOpenDatePicker(true);
  };

  const getDate = () =>
    selectedIndex !== null && localConsultations && localConsultations[selectedIndex]?.date
      ? new Date(localConsultations[selectedIndex].date)
      : new Date();

  const handleConfirmDate = (date: CalendarDate) => {
    if (selectedIndex !== null && date) {
      updateConsultation(selectedIndex, "date", date.toISOString().split("T")[0]);
    }
    setOpenDatePicker(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "position"}>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="always"
      >
        <Text style={styles.title}>Edit Medical Consultations</Text>
        {localConsultations?.map((consultation, index) => (
          <ScrollView key={index} style={styles.container}>
            <TextInput
              style={styles.textInput}
              value={consultation.consultant}
              onChangeText={(text) => updateConsultation(index, "consultant", text)}
            />
            <Button onPress={() => datePicker(index)} mode="outlined">
              {consultation.date ? consultation.date.toString() : ""}
            </Button>
            <TextInput
              style={styles.textInput}
              value={consultation.diagnosis}
              onChangeText={(text) => updateConsultation(index, "diagnosis", text)}
            />
            <View style={styles.followUps}>
              <Pressable style={styles.followUpsBtn} onPress={() => setShowActions(!showActions)}>
                <Text style={styles.followUpsText}>
                  {!showActions ? "Show Follow-Up Actions" : "Hide Follow-Up Actions"}
                </Text>
              </Pressable>
              {showActions &&
                consultation.followUpActions?.map((action, actionIndex) => (
                  <TextInput
                    key={actionIndex}
                    style={styles.textInput}
                    value={action}
                    onChangeText={(text) => updateConsultation(index, "followUpActions", text)}
                  />
                ))}
            </View>
          </ScrollView>
        ))}
        <Pressable style={styles.saveBtn} onPress={handleSave}>
          <Text>Save</Text>
        </Pressable>
        <Pressable style={styles.saveBtn} onPress={router.back}>
          <Text>Cancel</Text>
        </Pressable>
        <DatePickerModal
          locale="en-GB"
          mode="single"
          label="Select date"
          saveLabel="   SAVE"
          visible={openDatePicker}
          onDismiss={() => setOpenDatePicker(false)}
          date={getDate()}
          onConfirm={({ date }) => handleConfirmDate(date)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9eff5",
    borderRadius: 8,
    margin: 8,
    padding: 8,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
  },
  followUps: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  followUpsBtn: {
    backgroundColor: "#a0c6db",
    borderRadius: 10,
    marginHorizontal: "auto",
    padding: 5,
    width: 200,
  },
  followUpsText: {
    fontSize: 16,
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 20,
    marginTop: 10,
  },
  saveBtn: {
    alignItems: "center",
    backgroundColor: "#FBDABB",
    borderRadius: 10,
    justifyContent: "center",
    marginHorizontal: "auto",
    marginTop: 10,
    paddingVertical: 5,
    width: 100,
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    margin: 8,
    marginHorizontal: "auto",
    padding: 8,
    width: "50%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: "auto",
    padding: 16,
  },
});

export default EditConsultations;
