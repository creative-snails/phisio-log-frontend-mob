import { Text, TouchableOpacity, View } from "react-native";

import MedicalConsultation from "@/components/consultations/MedicalConsultation";
import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useDatePicker } from "@/hooks/useDatePicker";
import { useEditForm } from "@/hooks/useEditForm";
import { commonStyles } from "@/styles/commonStyles";
import { MedicalConsultationType } from "@/types/healthRecordTypes";
import { addItem, updateItemProperty } from "@/utils/arrayHelpers";
import { SCREEN_LABELS } from "@/utils/constants";
import { validators } from "@/utils/validators";

const EditConsultations = () => {
  const { localValue, setLocalValue, handleSave, loading } = useEditForm(
    "medicalConsultations",
    validators.medicalConsultations
  );

  const handleDateChange = (index: number, dateString: string) =>
    setLocalValue(updateItemProperty(localValue, index, "date", dateString));

  const getConsultationDate = (consultation: MedicalConsultationType) =>
    consultation.date ? new Date(consultation.date) : new Date();

  const { isOpen, selectedItemIndex, openDatePicker, closeDatePicker, handleConfirmDate, getCurrentDate } =
    useDatePicker({
      onDateChange: handleDateChange,
      getItemDate: getConsultationDate,
    });

  return (
    <EditScreenLayout title={SCREEN_LABELS.EDIT.CONSULTATIONS} loading={loading}>
      {localValue?.map((consultation, index) => (
        <MedicalConsultation
          key={index}
          consultation={consultation}
          index={index}
          localValue={localValue}
          setLocalValue={setLocalValue}
          datePickerProps={{
            isOpen: isOpen && selectedItemIndex === index,
            onDismiss: closeDatePicker,
            onConfirm: ({ date }) => handleConfirmDate(date),
            date: getCurrentDate(localValue),
            value: consultation.date,
            onPress: () => openDatePicker(index),
          }}
        />
      ))}
      <View style={commonStyles.btnContainer}>
        <TouchableOpacity
          style={commonStyles.btn}
          onPress={() =>
            setLocalValue(
              addItem(localValue, {
                consultant: "",
                date: new Date().toISOString().split("T")[0],
                diagnosis: "",
                followUpActions: [],
              })
            )
          }
        >
          <Text>Add Consultation</Text>
        </TouchableOpacity>
      </View>
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};

export default EditConsultations;
