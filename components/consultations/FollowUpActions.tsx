import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { commonStyles } from "@/styles/commonStyles";
import { MedicalConsultation } from "@/types/healthRecordTypes";
import { addNestedItem, removeNestedItem, updateNestedItem } from "@/utils/arrayHelpers";

type FollowUpActionsProps = {
  consultationIndex: number;
  followUpActions: string[];
  localValue: MedicalConsultation[];
  setLocalValue: (value: MedicalConsultation[]) => void;
};

const FollowUpActions = ({ consultationIndex, followUpActions, localValue, setLocalValue }: FollowUpActionsProps) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <View style={styles.followUpsContainer}>
      <TouchableOpacity style={styles.followUpsToggle} onPress={() => setShowActions((prev) => !prev)}>
        <Text style={styles.followUpsToggleText}>
          {showActions ? "Hide Follow-Up Actions" : "Show Follow-Up Actions"}
        </Text>
      </TouchableOpacity>
      <View style={styles.followUps}>
        {showActions &&
          followUpActions.map((action, actionIndex) => (
            <View key={actionIndex} style={styles.followUpsEntry}>
              <TextInput
                placeholder="Enter follow-up action"
                multiline={true}
                style={commonStyles.textInput}
                value={action}
                onChangeText={(text) =>
                  setLocalValue(updateNestedItem(localValue, consultationIndex, "followUpActions", actionIndex, text))
                }
              />
              <TouchableOpacity
                style={commonStyles.btn}
                onPress={() =>
                  setLocalValue(removeNestedItem(localValue, consultationIndex, "followUpActions", actionIndex))
                }
              >
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
      {showActions && (
        <TouchableOpacity
          style={commonStyles.btn}
          onPress={() => setLocalValue(addNestedItem(localValue, consultationIndex, "followUpActions", ""))}
        >
          <Text>Add Follow-Up Action</Text>
        </TouchableOpacity>
      )}
    </View>
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
});

export default FollowUpActions;
