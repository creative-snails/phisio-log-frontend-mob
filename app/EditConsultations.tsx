import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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

  const updateConsultation = (index: number, field: string, text: string, followUpsIndex?: number) => {
    const updatedConsultations = localConsultations?.map((consultation, i) => {
      if (i !== index) return consultation;
      if (field === "followUpActions" && followUpsIndex !== undefined) {
        const updatedFollowUps = consultation.followUpActions?.map((followUps, idx) =>
          idx === followUpsIndex ? text : followUps
        );
        return { ...consultation, followUpActions: updatedFollowUps };
      }
      return { ...consultation, [field]: text };
    });
    setLocalConsultations(updatedConsultations);
  };

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

  const handleSave = () => {
    if (localConsultations?.some((consultation) => consultation === null)) {
      if (Platform.OS === "web") {
        window.alert("Please fill all fields!");
      } else {
        Alert.alert("Error", "Please fill all fields!");
      }
      return;
    }
    try {
      setLoading(true);
      setHealthRecord({ ...healthRecord, medicalConsultations: localConsultations });
      console.log("Saved consultations:", localConsultations);
      router.back();
    } catch (error) {
      console.error("Error saving consultations:", error);
      Alert.alert("Error", "Failed to save changes to Medical Consultations");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d6abb6" />
        <Text style={styles.loadingText}>Saving changes...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "position"}>
      <ScrollView
        style={styles.container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="always"
      >
        <Text style={styles.title}>Edit Medical Consultations</Text>
        {localConsultations?.map((consultation, index) => (
          <ScrollView key={index} style={styles.innerContainer}>
            <TextInput
              style={styles.textInput}
              value={consultation.consultant}
              onChangeText={(text) => updateConsultation(index, "consultant", text)}
            />
            <TouchableOpacity style={styles.dateBtn} onPress={() => datePicker(index)}>
              <Text style={styles.dateText}>{consultation.date ? consultation.date.toString() : ""}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              value={consultation.diagnosis}
              onChangeText={(text) => updateConsultation(index, "diagnosis", text)}
            />
            <View style={styles.followUps}>
              <TouchableOpacity style={styles.followUpsBtn} onPress={() => setShowActions(!showActions)}>
                <Text style={styles.followUpsText}>
                  {!showActions ? "Show Follow-Up Actions" : "Hide Follow-Up Actions"}
                </Text>
              </TouchableOpacity>
              {showActions &&
                consultation.followUpActions?.map((action, followUpIndex) => (
                  <TextInput
                    key={followUpIndex}
                    style={styles.textInput}
                    value={action}
                    onChangeText={(text) => updateConsultation(index, "followUpActions", text, followUpIndex)}
                  />
                ))}
            </View>
          </ScrollView>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={router.back}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
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
  button: {
    alignItems: "center",
    backgroundColor: "#d6abb6",
    borderColor: "#000",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "2px 2px 0px #000",
    justifyContent: "center",
    marginHorizontal: "auto",
    marginTop: 10,
    paddingVertical: 5,
    width: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  container: {
    height: "100%",
  },
  dateBtn: {
    backgroundColor: "#afd0e3",
    borderRadius: 10,
    boxShadow: "2px 2px 0px #000",
    marginHorizontal: "auto",
    marginVertical: 15,
    padding: 5,
    width: "50%",
  },
  dateText: {
    fontSize: 16,
    textAlign: "center",
  },
  followUps: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  followUpsBtn: {
    backgroundColor: "#afd0e3",
    borderRadius: 10,
    boxShadow: "2px 2px 0px #000",
    marginBottom: 10,
    marginHorizontal: "auto",
    padding: 5,
    width: "50%",
  },
  followUpsText: {
    fontSize: 16,
    textAlign: "center",
  },
  innerContainer: {
    borderRadius: 8,
    boxShadow: "1px 1px 10px #000",
    margin: 8,
    padding: 8,
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
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    margin: 8,
    marginHorizontal: "auto",
    padding: 8,
    width: "70%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: "auto",
    padding: 16,
  },
});

export default EditConsultations;
