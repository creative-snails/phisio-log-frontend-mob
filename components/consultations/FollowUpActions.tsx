import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { commonStyles } from "@/styles/commonStyles";
import { addNestedItem, removeNestedItem, updateNestedItem } from "@/utils/arrayHelpers";
import { MedicalConsultation } from "@/validation/healthRecordSchema";

type FollowUpActionsProps = {
  consultationIndex: number;
  followUpActions?: string[];
  localValue: MedicalConsultation[];
  setLocalValue: (value: MedicalConsultation[]) => void;
};

const FollowUpActions = ({
  consultationIndex,
  followUpActions = [],
  localValue,
  setLocalValue,
}: FollowUpActionsProps) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <View style={styles.followUpsContainer}>
      <CustomButton
        title={showActions ? "Hide Follow-Up Actions" : "Show Follow-Up Actions"}
        variant="secondary"
        onPress={() => setShowActions((prev) => !prev)}
      />
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
              <CustomButton
                title="Remove"
                variant="tertiary"
                onPress={() =>
                  setLocalValue(removeNestedItem(localValue, consultationIndex, "followUpActions", actionIndex))
                }
              />
            </View>
          ))}
      </View>
      {showActions && (
        <CustomButton
          title="Add Follow-Up Action"
          onPress={() => setLocalValue(addNestedItem(localValue, consultationIndex, "followUpActions", ""))}
        />
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
});

export default FollowUpActions;
