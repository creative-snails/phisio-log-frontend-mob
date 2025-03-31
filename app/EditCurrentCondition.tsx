import { useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";

import useAppStore from "@/store/useAppStore";

const EditCurrentCondition = () => {
  const { setHealthRecord, healthRecord } = useAppStore();
  const [localStatus, setLocalStatus] = useState(healthRecord.currentCondition.status);
  const [localSeverity, setLocalSeverity] = useState(healthRecord.currentCondition.severity);
  const [localImprovementStatus, setLocalImprovementStatus] = useState(healthRecord.currentCondition.improvementStatus);
  const [openDropdown, setOpenDropdown] = useState<"status" | "severity" | "improvementStatus" | null>(null);
  const [severityOptions, setSeverityOptions] = useState<
    { label: string; value: "mild" | "moderate" | "severe" | "variable" }[]
  >([
    { label: "Mild", value: "mild" },
    { label: "Moderate", value: "moderate" },
    { label: "Severe", value: "severe" },
    { label: "Variable", value: "variable" },
  ]);
  const [statusOptions, setStatusOptions] = useState<{ label: string; value: "open" | "closed" | "in-progress" }[]>([
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
    { label: "In Progress", value: "in-progress" },
  ]);
  const [improvementStatusOptions, setImprovementStatusOptions] = useState<
    { label: string; value: "stable" | "improving" | "worsening" | "variable" }[]
  >([
    { label: "Improving", value: "improving" },
    { label: "Stable", value: "stable" },
    { label: "Worsening", value: "worsening" },
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
      currentCondition: {
        ...healthRecord.currentCondition,
        severity: localSeverity,
        status: localStatus,
        improvementStatus: localImprovementStatus,
      },
    });
    console.log(
      `Saved --> Status: ${localStatus} | Severity: ${localSeverity} | Improvement Status: ${localImprovementStatus}`
    );
    router.back();
  };

  const handleDropdowns = (dropdown: "status" | "severity" | "improvementStatus") => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Status</Text>
      <DropDownPicker
        open={openDropdown === "status"}
        setOpen={() => handleDropdowns("status")}
        value={localStatus || null}
        items={statusOptions}
        setValue={setLocalStatus}
        setItems={setStatusOptions}
        onChangeValue={(value) => {
          if (value) setLocalStatus(value);
        }}
        zIndex={3000}
        zIndexInverse={1000}
        containerStyle={styles.dropdown}
        textStyle={styles.items}
        labelStyle={styles.selectedItem}
      />
      <Text style={styles.title}>Edit Severity</Text>
      <DropDownPicker
        open={openDropdown === "severity"}
        setOpen={() => handleDropdowns("severity")}
        value={localSeverity || null}
        items={severityOptions}
        setValue={setLocalSeverity}
        setItems={setSeverityOptions}
        onChangeValue={(value) => {
          if (value) setLocalSeverity(value);
        }}
        zIndex={2000}
        zIndexInverse={2000}
        containerStyle={styles.dropdown}
        textStyle={styles.items}
        labelStyle={styles.selectedItem}
      />
      <Text style={styles.title}>Edit Improvement Status</Text>
      <DropDownPicker
        open={openDropdown === "improvementStatus"}
        setOpen={() => handleDropdowns("improvementStatus")}
        value={localImprovementStatus || null}
        items={improvementStatusOptions}
        setValue={setLocalImprovementStatus}
        setItems={setImprovementStatusOptions}
        onChangeValue={(value) => {
          if (value) setLocalImprovementStatus(value);
        }}
        zIndex={1000}
        zIndexInverse={3000}
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
    width: 200,
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

export default EditCurrentCondition;
