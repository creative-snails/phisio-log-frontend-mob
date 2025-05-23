import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { DatePicker } from "@/components/formElements/DatePicker";
import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { useDatePicker } from "@/hooks/useDatePicker";
import { useEditForm } from "@/hooks/useEditForm";
import { commonStyles } from "@/styles/commonStyles";
import { MedicalConsultation } from "@/validation/healthRecordSchema";
import {
  addItem,
  addNestedItem,
  removeItem,
  removeNestedItem,
  updateItemProperty,
  updateNestedItem,
} from "@/utils/arrayHelpers";
import { SCREEN_LABELS } from "@/utils/constants";
import { validators } from "@/validation/validators";

const EditConsultations = () => {
  const { localValue, setLocalValue, handleSave, loading } = useEditForm(
    "medicalConsultations",
    validators.medicalConsultations
  );
  const [showActionsMap, setShowActionsMap] = useState<Record<number, boolean>>({});

  const toggleShowActions = (index: number) => {
    setShowActionsMap((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleDateChange = (index: number, date: Date) =>
    setLocalValue(updateItemProperty(localValue, index, "date", new Date(date)));

  const getConsultationDate = (consultation: MedicalConsultation) =>
    consultation.date ? new Date(consultation.date) : new Date();

  const { isOpen, selectedItemIndex, openDatePicker, closeDatePicker, handleConfirmDate, getCurrentDate } =
    useDatePicker({
      onDateChange: handleDateChange,
      getItemDate: getConsultationDate,
    });

  return (
    <EditScreenLayout title={SCREEN_LABELS.EDIT.CONSULTATIONS} loading={loading}>
      {localValue?.map((consultation, index) => (
        <View key={index} style={styles.innerContainer}>
          <TextInput
            placeholder="Enter consultant name"
            style={commonStyles.textInput}
            value={consultation.consultant}
            onChangeText={(text) => setLocalValue(updateItemProperty(localValue, index, "consultant", text))}
          />

          <DatePicker
            isOpen={isOpen && selectedItemIndex === index}
            onDismiss={closeDatePicker}
            onConfirm={({ date }) => handleConfirmDate(date)}
            date={getCurrentDate(localValue)}
            value={new Date(consultation.date).toISOString().split("T")[0]}
            onPress={() => openDatePicker(index)}
          />
          <TextInput
            placeholder="Enter diagnosis"
            style={commonStyles.textInput}
            value={consultation.diagnosis}
            onChangeText={(text) => setLocalValue(updateItemProperty(localValue, index, "diagnosis", text))}
          />
          <View style={styles.followUpsContainer}>
            <TouchableOpacity style={styles.followUpsToggle} onPress={() => toggleShowActions(index)}>
              <Text style={styles.followUpsToggleText}>
                {showActionsMap[index] ? "Hide Follow Up Actions" : "Show Follow Up Actions"}
              </Text>
            </TouchableOpacity>
            <View style={styles.followUps}>
              {showActionsMap[index] &&
                consultation.followUpActions?.map((action: string, followUpIndex: number) => (
                  <View key={followUpIndex} style={styles.followUpsEntry}>
                    <TextInput
                      placeholder="Enter follow-up"
                      multiline={true}
                      style={commonStyles.textInput}
                      value={action}
                      onChangeText={(text) =>
                        setLocalValue(updateNestedItem(localValue, index, "followUpActions", followUpIndex, text))
                      }
                    />
                    <TouchableOpacity
                      style={commonStyles.btn}
                      onPress={() =>
                        setLocalValue(removeNestedItem(localValue, index, "followUpActions", followUpIndex))
                      }
                    >
                      <Text>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
            {showActionsMap[index] && (
              <TouchableOpacity
                style={commonStyles.btn}
                onPress={() => setLocalValue(addNestedItem(localValue, index, "followUpActions", ""))}
              >
                <Text>Add Follow-Up Action</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={commonStyles.btn} onPress={() => setLocalValue(removeItem(localValue, index))}>
            <Text>Remove Consultation</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={commonStyles.btnContainer}>
        <TouchableOpacity
          style={commonStyles.btn}
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
        >
          <Text>Add Consultation</Text>
        </TouchableOpacity>
      </View>
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};

const styles = StyleSheet.create({
  followUps: {
    marginBottom: 10,
  },
  followUpsContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  followUpsEntry: {
    alignItems: "center",
    flexDirection: "row",
    verticalAlign: "middle",
  },
  followUpsToggle: {
    backgroundColor: "#afd0e3",
    borderRadius: 10,
    boxShadow: "2px 2px 0px #000",
    marginBottom: 10,
    marginHorizontal: "auto",
    padding: 5,
    width: "auto",
  },
  followUpsToggleText: {
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  innerContainer: {
    alignItems: "center",
    borderRadius: 8,
    boxShadow: "1px 1px 10px #000",
    marginHorizontal: 8,
    marginVertical: 20,
    padding: 8,
  },
});

export default EditConsultations;
