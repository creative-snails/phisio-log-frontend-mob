import { StyleSheet, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { StatusOptionsType } from "@/types/healthRecordTypes";

type StatusDropdownProps = {
  title: string;
  field: keyof StatusOptionsType;
  value: string | null;
  items: { label: string; value: string }[];
  openDropdown: keyof StatusOptionsType | null;
  handleDropdowns: (dropdown: keyof StatusOptionsType) => void;
  updateStatus: (field: string, value: keyof StatusOptionsType) => void;
  zIndex: number;
  zIndexInverse: number;
};

export const StatusDropdown = ({
  title,
  field,
  value,
  items,
  openDropdown,
  handleDropdowns,
  updateStatus,
  zIndex,
  zIndexInverse,
}: StatusDropdownProps) => {
  return (
    <>
      <Text style={styles.title}>Edit {title}</Text>
      <DropDownPicker
        open={openDropdown === field}
        setOpen={() => handleDropdowns(field)}
        value={value || null}
        items={items}
        setValue={(val) => updateStatus(field, val(value))}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        containerStyle={styles.dropdown}
        textStyle={styles.items}
        labelStyle={styles.selectedItem}
      />
    </>
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
