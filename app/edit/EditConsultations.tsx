import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { DatePicker } from "@/components/formElements/DatePicker";
import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useDatePicker } from "@/hooks/useDatePicker";
import { useFormEdit } from "@/hooks/useFormEdit";
import { MedicalConsultation } from "@/types/healthRecordTypes";
import { validators } from "@/utils/validators";

const EditConsultations = () => {
  const { localValue, setLocalValue, handleSave, loading } = useFormEdit(
    "medicalConsultations",
    validators.medicalConsultations
  );
  const [showActions, setShowActions] = useState(false);

  const updateConsultation = (index: number, field: string, text: string, followUpsIndex?: number) => {
    const updatedConsultations = localValue?.map((consultation, i) => {
      if (i !== index) return consultation;
      if (field === "followUpActions" && followUpsIndex !== undefined) {
        const updatedFollowUps = consultation.followUpActions?.map((followUps, idx) =>
          idx === followUpsIndex ? text : followUps
        );
        return { ...consultation, followUpActions: updatedFollowUps };
      }
      return { ...consultation, [field]: text };
    });
    setLocalValue(updatedConsultations);
  };

  const handleDateChange = (index: number, dateString: string) => updateConsultation(index, "date", dateString);

  const getConsultationDate = (consultation: MedicalConsultation) =>
    consultation.date ? new Date(consultation.date) : null;

  const { isOpen, selectedItemIndex, openDatePicker, closeDatePicker, handleConfirmDate, getCurrentDate } =
    useDatePicker({
      onDateChange: handleDateChange,
      getItemDate: getConsultationDate,
    });

  const handleAddFollowUp = (consultationIndex: number) => {
    const updatedConsultations = localValue?.map((consultation, i) => {
      if (i !== consultationIndex) return consultation;
      const currentFollowUps = consultation.followUpActions || [];
      return { ...consultation, followUpActions: [...currentFollowUps, ""] };
    });
    setLocalValue(updatedConsultations);
  };

  const handleRemoveFollowUp = (consultationIndex: number, followUpIndex: number) => {
    const updatedConsultations = localValue?.map((consultation, i) => {
      if (i !== consultationIndex) return consultation;
      const updatedFollowUps = consultation.followUpActions?.filter((_, idx) => idx !== followUpIndex);
      return { ...consultation, followUpActions: updatedFollowUps };
    });
    setLocalValue(updatedConsultations);
  };

  return (
    <EditScreenLayout title="Edit Medical Consultations" loading={loading}>
      {localValue?.map((consultation, index) => (
        <View key={index} style={styles.innerContainer}>
          <TextInput
            style={styles.textInput}
            value={consultation.consultant}
            onChangeText={(text) => updateConsultation(index, "consultant", text)}
          />
          <DatePicker
            isOpen={isOpen && selectedItemIndex === index}
            onDismiss={closeDatePicker}
            onConfirm={({ date }) => handleConfirmDate(date)}
            date={getCurrentDate(localValue)}
            value={consultation.date}
            onPress={() => openDatePicker(index)}
          />
          <TextInput
            style={styles.textInput}
            value={consultation.diagnosis}
            onChangeText={(text) => updateConsultation(index, "diagnosis", text)}
          />
          <View style={styles.followUpsContainer}>
            <TouchableOpacity style={styles.followUpsToggle} onPress={() => setShowActions(!showActions)}>
              <Text style={styles.followUpsToggleText}>
                {!showActions ? "Show Follow-Up Actions" : "Hide Follow-Up Actions"}
              </Text>
            </TouchableOpacity>
            <View style={styles.followUps}>
              {showActions &&
                consultation.followUpActions?.map((action, followUpIndex) => (
                  <View key={followUpIndex} style={styles.followUpsEntry}>
                    <TextInput
                      multiline={true}
                      style={styles.textInput}
                      value={action}
                      onChangeText={(text) => updateConsultation(index, "followUpActions", text, followUpIndex)}
                    />
                    <TouchableOpacity
                      style={styles.followUpsBtn}
                      onPress={() => handleRemoveFollowUp(index, followUpIndex)}
                    >
                      <Text>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
            {showActions && (
              <TouchableOpacity style={styles.followUpsBtn} onPress={() => handleAddFollowUp(index)}>
                <Text>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};

const styles = StyleSheet.create({
  followUps: {
    marginBottom: 10,
  },
  followUpsBtn: {
    alignItems: "center",
    backgroundColor: "#d6abb6",
    borderColor: "#000",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "2px 2px 0px #000",
    marginLeft: 10,
    paddingVertical: 5,
    width: 100,
  },
  followUpsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  followUpsEntry: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    verticalAlign: "middle",
  },
  followUpsToggle: {
    backgroundColor: "#afd0e3",
    borderRadius: 10,
    boxShadow: "2px 2px 0px #000",
    marginBottom: 10,
    marginHorizontal: "auto",
    padding: 5,
    width: "50%",
  },
  followUpsToggleText: {
    fontSize: 16,
    textAlign: "center",
  },
  innerContainer: {
    borderRadius: 8,
    boxShadow: "1px 1px 10px #000",
    marginHorizontal: 8,
    marginVertical: 20,
    padding: 8,
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    margin: 8,
    marginHorizontal: "auto",
    padding: 8,
    width: "70%",
  },
});

export default EditConsultations;
