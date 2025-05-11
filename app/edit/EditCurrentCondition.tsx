import { useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";

import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import useAppStore from "@/store/useAppStore";
import { currentConditionOptionsType } from "@/types/healthRecordTypes";

const currentConditionOptions: currentConditionOptionsType = {
  status: [
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
    { label: "In Progress", value: "in-progress" },
  ],
  severity: [
    { label: "Mild", value: "mild" },
    { label: "Moderate", value: "moderate" },
    { label: "Severe", value: "severe" },
    { label: "Variable", value: "variable" },
  ],
  improvementStatus: [
    { label: "Improving", value: "improving" },
    { label: "Stable", value: "stable" },
    { label: "Worsening", value: "worsening" },
    { label: "Variable", value: "variable" },
  ],
};

const EditCurrentCondition = () => {
  const { setHealthRecord, healthRecord } = useAppStore();
  const [localStatus, setLocalStatus] = useState(healthRecord.currentCondition.status);
  const [localSeverity, setLocalSeverity] = useState(healthRecord.currentCondition.severity);
  const [localImprovementStatus, setLocalImprovementStatus] = useState(healthRecord.currentCondition.improvementStatus);
  const [openDropdown, setOpenDropdown] = useState<"status" | "severity" | "improvementStatus" | null>(null);

  const handleSave = () => {
    if (
      !currentConditionOptions.status.map((s) => s.value).includes(localStatus) ||
      !currentConditionOptions.severity.map((s) => s.value).includes(localSeverity) ||
      !currentConditionOptions.improvementStatus.map((i) => i.value).includes(localImprovementStatus)
    ) {
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
        items={currentConditionOptions.status}
        setValue={setLocalStatus}
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
        items={currentConditionOptions.severity}
        setValue={setLocalSeverity}
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
        items={currentConditionOptions.improvementStatus}
        setValue={setLocalImprovementStatus}
        zIndex={1000}
        zIndexInverse={3000}
        containerStyle={styles.dropdown}
        textStyle={styles.items}
        labelStyle={styles.selectedItem}
      />
      <SaveCancelButtons onSave={handleSave} />
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
