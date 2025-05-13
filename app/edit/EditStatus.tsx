import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useFormEdit } from "@/hooks/useFormEdit";
import { statusOptionsType } from "@/types/healthRecordTypes";
import { validators } from "@/utils/validators";

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
  const { localValue, setLocalValue, handleSave, loading } = useFormEdit("status", validators.status);
  const [openDropdown, setOpenDropdown] = useState<"stage" | "severity" | "progression" | null>(null);

  const updateStatus = (field: string, value: string) => {
    const updatedStatus = { ...localValue, [field]: value };
    setLocalValue(updatedStatus);
  };

  const handleDropdowns = (dropdown: "stage" | "severity" | "progression") => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <EditScreenLayout loading={loading}>
      <Text style={styles.title}>Edit Stage</Text>
      <DropDownPicker
        open={openDropdown === "stage"}
        setOpen={() => handleDropdowns("stage")}
        value={localValue.stage || null}
        items={statusOptions.stage}
        setValue={(value) => updateStatus("stage", value(localValue.stage))}
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
        value={localValue.severity || null}
        items={statusOptions.severity}
        setValue={(value) => updateStatus("severity", value(localValue.severity))}
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
        value={localValue.progression || null}
        items={statusOptions.progression}
        setValue={(value) => updateStatus("progression", value(localValue.progression))}
        zIndex={1000}
        zIndexInverse={3000}
        containerStyle={styles.dropdown}
        textStyle={styles.items}
        labelStyle={styles.selectedItem}
      />
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};
const styles = StyleSheet.create({
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
