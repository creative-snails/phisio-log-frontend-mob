import { StyleSheet, TextInput } from "react-native";

import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useEditForm } from "@/hooks/useEditForm";
import { SCREEN_LABELS } from "@/utils/constants";
import { validators } from "@/utils/validators";

const EditDescription = () => {
  const { localValue, setLocalValue, handleSave, loading } = useEditForm("description", validators.description);

  return (
    <EditScreenLayout title={SCREEN_LABELS.EDIT.DESCRIPTION} loading={loading}>
      <TextInput style={styles.inputDescription} multiline={true} value={localValue} onChangeText={setLocalValue} />
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};

const styles = StyleSheet.create({
  inputDescription: {
    borderRadius: 8,
    borderWidth: 1,
    height: 100,
    margin: 8,
    padding: 8,
  },
});

export default EditDescription;
