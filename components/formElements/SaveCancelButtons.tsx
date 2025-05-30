import { View } from "react-native";
import { router } from "expo-router";

import CustomButton from "@/components/CustomButton";
import { commonStyles } from "@/styles/commonStyles";

export const SaveCancelButtons = ({ onSave }: { onSave: () => void }) => {
  return (
    <View style={commonStyles.btnContainer}>
      <CustomButton title="Save" onPress={onSave} />
      <CustomButton title="Cancel" variant="secondary" onPress={router.back} />
    </View>
  );
};
