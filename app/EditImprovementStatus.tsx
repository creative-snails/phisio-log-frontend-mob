import { useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

import useAppStore from "@/store/useAppStore";

const EditImprovementStatus = () => {
  const { setHealthRecord, healthRecord } = useAppStore();
  const [localImprovementStatus, setLocalImprovementStatus] = useState(healthRecord.improvementStatus);

  const handleSave = () => {
    if (!localImprovementStatus) {
      if (Platform.OS === "web") {
        window.alert("Invalid value selected");
      } else {
        Alert.alert("Invalid value selected");
      }
      return;
    }
    setHealthRecord({ ...healthRecord, improvementStatus: localImprovementStatus });
    console.log("Saved improvement status:", localImprovementStatus);
    router.back();
  };

  return (
    <View>
      <Text style={styles.title}>Edit Improvement Status</Text>
      <Picker
        selectedValue={localImprovementStatus}
        onValueChange={(itemValue) => setLocalImprovementStatus(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Improving" value="improving" />
        <Picker.Item label="Stable" value="stable" />
        <Picker.Item label="Worsening" value="worsening" />
        <Picker.Item label="Variable" value="variable" />
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

export default EditImprovementStatus;
