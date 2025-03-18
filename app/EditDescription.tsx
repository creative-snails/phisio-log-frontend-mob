import { useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

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
    // Save
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
      <Pressable style={styles.saveBtn} onPress={handleSave}>
        <Text>Save</Text>
      </Pressable>
      <Pressable style={styles.saveBtn} onPress={router.back}>
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
