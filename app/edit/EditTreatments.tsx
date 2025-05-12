import { StyleSheet, TextInput, View } from "react-native";

import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useFormEdit } from "@/hooks/useFormEdit";
import { validators } from "@/utils/validators";

const EditTreatments = () => {
  const { localValue, setLocalValue, handleSave, loading } = useFormEdit("treatmentsTried", validators.treatmentsTried);

  const handleTreatmentChange = (text: string, index: number) => {
    const updatedTreatments = localValue?.map((treatment, i) => (i === index ? text : treatment));
    setLocalValue(updatedTreatments);
  };

  return (
    <EditScreenLayout title="Edit Treatments" loading={loading}>
      {localValue?.map((treatment, index) => (
        <View key={index}>
          <TextInput
            value={treatment}
            onChangeText={(text) => handleTreatmentChange(text, index)}
            placeholder="Enter treatment"
            style={styles.textInput}
            multiline={true}
          />
        </View>
      ))}
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    margin: 8,
    marginHorizontal: "auto",
    padding: 8,
    width: "50%",
  },
});

export default EditTreatments;
