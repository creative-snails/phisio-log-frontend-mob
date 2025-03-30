import { useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";

import useAppStore from "@/store/useAppStore";

const EditSeverity = () => {
  const { setHealthRecord, healthRecord } = useAppStore();
  const [localSeverity, setLocalSeverity] = useState(healthRecord.currentCondition.severity);
  const [isExpanded, setIsExpanded] = useState(false);
  const [severityOptions, setSeverityOptions] = useState<
    { label: string; value: "mild" | "moderate" | "severe" | "variable" }[]
  >([
    { label: "Mild", value: "mild" },
    { label: "Moderate", value: "moderate" },
    { label: "Severe", value: "severe" },
    { label: "Variable", value: "variable" },
  ]);

  const handleSave = () => {
    if (!localSeverity) {
      if (Platform.OS === "web") {
        window.alert("Invalid value selected");
      } else {
        Alert.alert("Invalid value selected");
      }
      return;
    }
    setHealthRecord({
      ...healthRecord,
      currentCondition: { ...healthRecord.currentCondition, severity: localSeverity },
    });
    console.log("Saved severity:", localSeverity);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Severity</Text>
      <DropDownPicker
        open={isExpanded}
        setOpen={setIsExpanded}
        value={localSeverity || null}
        items={severityOptions}
        setValue={setLocalSeverity}
        setItems={setSeverityOptions}
        onChangeValue={(value) => {
          if (value) {
            setLocalSeverity(value);
          }
        }}
        containerStyle={styles.dropdown}
        textStyle={styles.items}
        labelStyle={styles.selectedItem}
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
  container: {
    height: "100%",
  },
  dropdown: {
    marginBottom: 20,
    marginHorizontal: "auto",
    width: 150,
  },
  items: {
    fontSize: 18,
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
  selectedItem: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: "auto",
    padding: 16,
  },
});

export default EditSeverity;
