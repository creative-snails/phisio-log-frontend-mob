import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

export const SaveCancelButtons = ({ onSave }: { onSave: () => void }) => {
  <View>
    <Pressable onPress={onSave}>
      <Text>Save</Text>
    </Pressable>
    <Pressable onPress={router.back}>
      <Text>Cancel</Text>
    </Pressable>
  </View>;
};
