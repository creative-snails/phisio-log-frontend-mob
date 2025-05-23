import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useEditForm } from "@/hooks/useEditForm";
import { statusConfigs, statusOptions } from "@/utils/constants";
import { StatusOptionsType } from "@/validation/healthRecordSchema";
import { validators } from "@/validation/validators";

const EditStatus = () => {
  const { localValue, setLocalValue, handleSave, loading } = useEditForm("status", validators.status);
  const [openDropdown, setOpenDropdown] = useState<keyof StatusOptionsType | null>(null);

  const handleDropdowns = (dropdown: keyof StatusOptionsType) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return loading ? (
    <LoadingIndicator />
  ) : (
    <View style={styles.statusContainer}>
      {statusConfigs.map(({ field, title, zIndex, zIndexInverse }) => (
        <View key={field}>
          <Text style={styles.title}>Edit {title}</Text>
          <DropDownPicker
            open={openDropdown === field}
            setOpen={() => handleDropdowns(field)}
            value={localValue[field] || null}
            items={statusOptions[field]}
            setValue={(val) => setLocalValue({ ...localValue, [field]: val(localValue[field]) })}
            zIndex={zIndex}
            zIndexInverse={zIndexInverse}
            containerStyle={styles.dropdown}
            textStyle={styles.items}
            labelStyle={styles.selectedItem}
            listMode={Platform.OS === "web" ? "MODAL" : "FLATLIST"}
          />
        </View>
      ))}
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
