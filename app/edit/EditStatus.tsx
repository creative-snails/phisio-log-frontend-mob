import { useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";

import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import useAppStore from "@/store/useAppStore";
import { statusOptionsType } from "@/types/healthRecordTypes";

const statusOptions: statusOptionsType = {
  stage: [
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
  progression: [
    { label: "Improving", value: "improving" },
    { label: "Stable", value: "stable" },
    { label: "Worsening", value: "worsening" },
    { label: "Variable", value: "variable" },
  ],
};

const EditStatus = () => {
  const { setHealthRecord, healthRecord } = useAppStore();
  const [localStage, setLocalStage] = useState(healthRecord.status.stage);
  const [localSeverity, setLocalSeverity] = useState(healthRecord.status.severity);
  const [localProgression, setLocalProgression] = useState(healthRecord.status.progression);
  const [openDropdown, setOpenDropdown] = useState<"stage" | "severity" | "progression" | null>(null);

  const handleSave = () => {
    if (
      !statusOptions.stage.map((s) => s.value).includes(localStage) ||
      !statusOptions.severity.map((s) => s.value).includes(localSeverity) ||
      !statusOptions.progression.map((i) => i.value).includes(localProgression)
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
      status: {
        ...healthRecord.status,
        stage: localStage,
        severity: localSeverity,
        progression: localProgression,
      },
    });
    console.log(`Saved --> Stage: ${localStage} | Severity: ${localSeverity} | Progression: ${localProgression}`);
    router.back();
  };

  const handleDropdowns = (dropdown: "stage" | "severity" | "progression") => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Status</Text>
      <DropDownPicker
        open={openDropdown === "stage"}
        setOpen={() => handleDropdowns("stage")}
        value={localStage || null}
        items={statusOptions.stage}
        setValue={setLocalStage}
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
        items={statusOptions.severity}
        setValue={setLocalSeverity}
        zIndex={2000}
        zIndexInverse={2000}
        containerStyle={styles.dropdown}
        textStyle={styles.items}
        labelStyle={styles.selectedItem}
      />
      <Text style={styles.title}>Edit Progression</Text>
      <DropDownPicker
        open={openDropdown === "progression"}
        setOpen={() => handleDropdowns("progression")}
        value={localProgression || null}
        items={statusOptions.progression}
        setValue={setLocalProgression}
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

export default EditStatus;
