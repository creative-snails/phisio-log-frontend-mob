import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

import { commonStyles } from "@/styles/commonStyles";

export const SaveCancelButtons = ({ onSave }: { onSave: () => void }) => {
  <View>
    <Pressable style={commonStyles.btn} onPress={onSave}>
      <Text style={commonStyles.btnText}>Save</Text>
    </Pressable>
    <Pressable style={commonStyles.btn} onPress={router.back}>
      <Text style={commonStyles.btnText}>Cancel</Text>
    </Pressable>
  </View>;
};
