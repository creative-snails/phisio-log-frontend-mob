import { StyleSheet, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

import CustomButton from "@/components/CustomButton";
import { DatePicker } from "@/components/formElements/DatePicker";
import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useDatePicker } from "@/hooks/useDatePicker";
import { useEditForm } from "@/hooks/useEditForm";
import useAppStore from "@/store/useAppStore";
import { commonStyles } from "@/styles/commonStyles";
import { addItem, removeItem, updateItemProperty } from "@/utils/arrayHelpers";
import { SCREEN_LABELS } from "@/utils/constants";
import { ROUTES } from "@/utils/constants";
import { Symptom } from "@/validation/healthRecordSchema";
import { validators } from "@/validation/validators";

const EditSymptoms = () => {
  const { localValue, setLocalValue, handleSave, loading } = useEditForm("symptoms", validators.symptoms);
  const router = useRouter();

  const handleDateChange = (index: number, date: Date) => {
    setLocalValue(updateItemProperty(localValue, index, "startDate", date));
  };

  const getSymptomDate = (symptom: Symptom) => (symptom.startDate ? new Date(symptom.startDate) : new Date());

  const { isOpen, selectedItemIndex, openDatePicker, closeDatePicker, handleConfirmDate, getCurrentDate } =
    useDatePicker({ onDateChange: handleDateChange, getItemDate: getSymptomDate });

  return (
    <EditScreenLayout title={SCREEN_LABELS.EDIT.SYMPTOMS} loading={loading}>
      {localValue.map((symptom, index) => (
        <View key={index} style={styles.container}>
          {/* Left Column: Name and Date */}

          <TextInput
            style={commonStyles.textInput}
            value={symptom.name}
            placeholder="Symptom name"
            onChangeText={(text) => setLocalValue(updateItemProperty(localValue, index, "name", text))}
          />
          <DatePicker
            isOpen={isOpen && selectedItemIndex === index}
            onDismiss={closeDatePicker}
            onConfirm={({ date }) => handleConfirmDate(date)}
            date={getCurrentDate(localValue)}
            value={symptom.startDate ? new Date(symptom.startDate) : null}
            onPress={() => openDatePicker(index)}
          />
          <CustomButton
            title="Edit Body parts affected"
            variant="secondary"
            onPress={() => {
              useAppStore.getState().setCurrentSymptomIndex(index);
              router.push(`/${ROUTES.BODY_MAP}`);
            }}
          />
          <CustomButton
            title="Remove Symptom"
            variant="tertiary"
            onPress={() => {
              closeDatePicker();
              setLocalValue(removeItem(localValue, index));
            }}
          />
        </View>
      ))}
      <View style={styles.btnContainer}>
        <CustomButton
          title="Add Symptom"
          variant="secondary"
          onPress={() =>
            setLocalValue(
              addItem(localValue, { name: "", startDate: new Date(), affectedParts: { key: "", state: 1 } })
            )
          }
        />
      </View>
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    boxShadow: "2px 2px 3.84px rgba(0, 0, 0, 0.4)",
    margin: 8,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    margin: 8,
    padding: 8,
    borderRadius: 8,
  },
});

export default EditSymptoms;
