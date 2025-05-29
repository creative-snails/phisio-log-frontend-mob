import { View } from "react-native";
import { router } from "expo-router";

import CustomButton from "@/components/Button";
import { commonStyles } from "@/styles/commonStyles";

export const SaveCancelButtons = ({ onSave }: { onSave: () => void }) => {
  return (
    <View style={commonStyles.btnContainer}>
      {/* <Pressable style={commonStyles.btn} onPress={onSave}>
        <Text style={commonStyles.btnText}>Save</Text>
      </Pressable> */}
      <CustomButton title="Save" onPress={onSave} />
      {/* <Pressable style={commonStyles.btn} onPress={router.back}>
        <Text style={commonStyles.btnText}>Cancel</Text>
      </Pressable> */}
      <CustomButton title="Cancel" variant="secondary" onPress={router.back} />
    </View>
  );
};
