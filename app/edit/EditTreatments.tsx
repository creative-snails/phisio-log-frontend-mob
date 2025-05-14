import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useFormEdit } from "@/hooks/useFormEdit";
import { commonStyles } from "@/styles/commonStyles";
import { addField, removeField } from "@/utils/helpers";
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
        <View key={index} style={styles.container}>
          <TextInput
            value={treatment}
            onChangeText={(text) => handleTreatmentChange(text, index)}
            placeholder="Enter treatment"
            style={commonStyles.textInput}
            multiline={true}
          />
          <TouchableOpacity style={commonStyles.btn} onPress={() => setLocalValue(removeField(localValue, index))}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.container}>
        <TouchableOpacity style={commonStyles.btn} onPress={() => setLocalValue(addField(localValue, ""))}>
          <Text>Add</Text>
        </TouchableOpacity>
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
