import { View } from "react-native";

import CustomButton from "@/components/Button";
import Consultation from "@/components/consultations/Consultation";
import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useEditForm } from "@/hooks/useEditForm";
import { commonStyles } from "@/styles/commonStyles";
import { addItem } from "@/utils/arrayHelpers";
import { SCREEN_LABELS } from "@/utils/constants";
import { validators } from "@/validation/validators";

const EditConsultations = () => {
  const { localValue, setLocalValue, handleSave, loading } = useEditForm(
    "medicalConsultations",
    validators.medicalConsultations
  );

  return (
    <EditScreenLayout title={SCREEN_LABELS.EDIT.CONSULTATIONS} loading={loading}>
      {localValue?.map((consultation, index) => (
        <Consultation
          key={index}
          consultation={consultation}
          index={index}
          localValue={localValue}
          setLocalValue={setLocalValue}
        />
      ))}
      <View style={commonStyles.btnContainer}>
        <CustomButton
          title="Add Consultation"
          variant="secondary"
          onPress={() =>
            setLocalValue(
              addItem(localValue, {
                consultant: "",
                date: new Date(),
                diagnosis: "",
                followUpActions: [],
              })
            )
          }
        />
      </View>
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};

export default EditConsultations;
