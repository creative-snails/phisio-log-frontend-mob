import { useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

import useAppStore from "@/store/useAppStore";

const EditStatus = () => {
  const { setHealthRecord, healthRecord } = useAppStore();
  const [localStatus, setLocalStatus] = useState(healthRecord.status);

  const handleSave = () => {
    if (!localStatus) {
      if (Platform.OS === "web") {
        window.alert("Invalid value selected");
      } else {
        Alert.alert("Invalid value selected");
      }
      return;
    }
    setHealthRecord({ ...healthRecord, status: localStatus });
    console.log("Saved status:", localStatus);
    router.back();
  };

  return (
    <View>
      <Text style={styles.title}>Edit Status</Text>
      <Picker
        selectedValue={localStatus}
        onValueChange={(itemValue) => setLocalStatus(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Open" value="open" />
        <Picker.Item label="Closed" value="closed" />
        <Picker.Item label="In Progress" value="in-progress" />
      </Picker>
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
  dropdown: {
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: "auto",
    padding: 5,
    textAlign: "center",
    width: 150,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: "auto",
    padding: 16,
  },
});

export default EditStatus;
