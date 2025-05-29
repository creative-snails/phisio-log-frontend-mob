import { StyleSheet, TextInput, View } from "react-native";

import CustomButton from "@/components/Button";
import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useEditForm } from "@/hooks/useEditForm";
import { commonStyles } from "@/styles/commonStyles";
import { addItem, removeItem, updateItem } from "@/utils/arrayHelpers";
import { SCREEN_LABELS } from "@/utils/constants";
import { validators } from "@/validation/validators";

const EditTreatments = () => {
  const { localValue, setLocalValue, handleSave, loading } = useEditForm("treatmentsTried", validators.treatmentsTried);

  return (
    <EditScreenLayout title={SCREEN_LABELS.EDIT.TREATMENTS} loading={loading}>
      {localValue?.map((treatment, index) => (
        <View key={index} style={styles.container}>
          <TextInput
            value={treatment}
            onChangeText={(text) => setLocalValue(updateItem(localValue, index, text))}
            placeholder="Enter treatment"
            style={commonStyles.textInput}
            multiline={true}
          />
          <CustomButton
            title="Remove"
            variant="tertiary"
            onPress={() => setLocalValue(removeItem(localValue, index))}
          />
        </View>
      ))}
      <View style={styles.container}>
        <CustomButton title="Add" variant="secondary" onPress={() => setLocalValue(addItem(localValue, ""))} />
      </View>
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default EditTreatments;
