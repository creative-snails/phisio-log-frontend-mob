import { StyleSheet, TextInput, View } from "react-native";

import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useFormEdit } from "@/hooks/useFormEdit";
import { validators } from "@/utils/validators";

const EditDescription = () => {
  const { localValue, setLocalValue, handleSave, loading } = useFormEdit("description", validators.description);
  return (
    <View>
      <EditScreenLayout title="Edit Description" loading={loading}>
        <TextInput style={styles.inputDescription} multiline={true} value={localValue} onChangeText={setLocalValue} />
        <SaveCancelButtons onSave={handleSave} />
      </EditScreenLayout>
    </View>
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
