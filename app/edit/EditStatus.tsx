import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useFormEdit } from "@/hooks/useFormEdit";
import { StatusOptionsType } from "@/types/healthRecordTypes";
import { statusOptions } from "@/utils/constants";
import { validators } from "@/utils/validators";

const EditStatus = () => {
  const { localValue, setLocalValue, handleSave } = useFormEdit("status", validators.status);
  const [openDropdown, setOpenDropdown] = useState<keyof StatusOptionsType | null>(null);

  const updateStatus = (field: string, value: keyof StatusOptionsType) => {
    const updatedStatus = { ...localValue, [field]: value };
    setLocalValue(updatedStatus);
  };

  const handleDropdowns = (dropdown: keyof StatusOptionsType) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <View style={styles.statusContainer}>
      <Text style={styles.title}>Edit Status</Text>
      <DropDownPicker
        open={openDropdown === "stage"}
        setOpen={() => handleDropdowns("stage")}
        value={localValue.stage || null}
        items={statusOptions.stage}
        setValue={(val) => updateStatus("stage", val(localValue.stage))}
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
        setValue={(val) => updateStatus("severity", val(localValue.severity))}
        zIndex={2000}
        zIndexInverse={2000}
        containerStyle={styles.dropdown}
        textStyle={styles.items}
        labelStyle={styles.selectedItem}
      />
      <Text style={styles.title}>Edit Improvement Status</Text>
      <DropDownPicker
        open={openDropdown === "progression"}
        setOpen={() => handleDropdowns("progression")}
        value={localValue.progression || null}
        items={statusOptions.progression}
        setValue={(val) => updateStatus("progression", val(localValue.progression))}
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
  statusContainer: {
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: "auto",
    padding: 16,
  },
});

export default EditStatus;
