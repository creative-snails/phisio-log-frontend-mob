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
  View,
} from "react-native";
import { router } from "expo-router";

import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import useAppStore from "@/store/useAppStore";

const EditTreatments = () => {
  const { setHealthRecord, healthRecord, setLoading, loading } = useAppStore();
  const [localTreatments, setLocalTreatments] = useState(healthRecord.treatmentsTried);

  const handleTreatmentChange = (text: string, index: number) => {
    const updatedTreatments = localTreatments?.map((treatment, i) => (i === index ? text : treatment));
    setLocalTreatments(updatedTreatments);
  };

  const handleSave = () => {
    if (localTreatments?.some((treatment) => treatment.trim().length < 3)) {
      if (Platform.OS === "web") {
        window.alert("Treatment name must be at least 3 characters long!");
      } else {
        Alert.alert("Error", "Treatment name must be at least 3 characters long!");
      }
      return;
    }
    try {
      setLoading(true);
      setHealthRecord({ ...healthRecord, treatmentsTried: localTreatments });
      console.log("Saved treatments: ", localTreatments);
      router.back();
    } catch (error) {
      console.error("Error saving treatments:", error);
      Alert.alert("Error", "Failed to save treatments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FBDABB" />
        <Text style={styles.loadingText}>Saving changes...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "position"}>
      <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Edit Treatments</Text>
        {localTreatments?.map((treatment, index) => (
          <View key={index}>
            <TextInput
              value={treatment}
              onChangeText={(text) => handleTreatmentChange(text, index)}
              placeholder="Enter treatment"
              style={styles.textInput}
              multiline={true}
            />
          </View>
        ))}
        <SaveCancelButtons onSave={handleSave} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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

export default EditTreatments;
