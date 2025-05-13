import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useFormEdit } from "@/hooks/useFormEdit";
import { validators } from "@/utils/validators";

const EditConsultations = () => {
  const { localValue, setLocalValue, handleSave, loading } = useFormEdit(
    "medicalConsultations",
    validators.medicalConsultations
  );
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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

  const datePicker = (index: number) => {
    setSelectedIndex(index);
    setOpenDatePicker(true);
  };

  const getDate = () =>
    selectedIndex !== null && localValue && localValue[selectedIndex]?.date
      ? new Date(localValue[selectedIndex].date)
      : new Date();

  const handleConfirmDate = (date: CalendarDate) => {
    if (selectedIndex !== null && date) {
      updateConsultation(selectedIndex, "date", date.toISOString().split("T")[0]);
    }
    setOpenDatePicker(false);
  };

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
          <TouchableOpacity style={styles.dateBtn} onPress={() => datePicker(index)}>
            <Text style={styles.dateText}>{consultation.date ? consultation.date.toString() : ""}</Text>
          </TouchableOpacity>
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
      <DatePickerModal
        locale="en-GB"
        mode="single"
        label="Select date"
        saveLabel="   SAVE"
        visible={openDatePicker}
        onDismiss={() => setOpenDatePicker(false)}
        date={getDate()}
        onConfirm={({ date }) => handleConfirmDate(date)}
      />
    </EditScreenLayout>
  );
};

const styles = StyleSheet.create({
  dateBtn: {
    backgroundColor: "#afd0e3",
    borderRadius: 10,
    boxShadow: "2px 2px 0px #000",
    marginHorizontal: "auto",
    marginVertical: 15,
    padding: 5,
    width: "50%",
  },
  dateText: {
    fontSize: 16,
    textAlign: "center",
  },
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
