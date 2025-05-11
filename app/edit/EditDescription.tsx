import { useState } from "react";
import { Alert, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import useAppStore from "@/store/useAppStore";

const EditDescription = () => {
  const { setHealthRecord, healthRecord } = useAppStore();
  const [localDescription, setLocalDescription] = useState(healthRecord.description);

  const handleSave = () => {
    if (localDescription.trim().length < 10) {
      if (Platform.OS === "web") {
        window.alert("Description must be at least 10 characters long!");
      } else {
        Alert.alert("Description must be at least 10 characters long");
      }
      return;
    }
    setHealthRecord({ ...healthRecord, description: localDescription });
    console.log("Saved description:", localDescription);
    router.back();
  };

  return (
    <View>
      <Text style={styles.title}>Edit Description</Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        value={localDescription}
        onChangeText={setLocalDescription}
      />
      <SaveCancelButtons onSave={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    height: 100,
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: "auto",
    padding: 16,
  },
});

export default EditDescription;
