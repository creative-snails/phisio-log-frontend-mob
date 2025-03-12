import React from "react";
import { Text, TextInput, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const EditRecordSection = () => {
  const { section, data } = useLocalSearchParams<{ section: string; data: string }>();
  return (
    <View>
      <Text>Section: {section} </Text>
      <TextInput value={data} onChangeText={(value) => console.log("Update description", value)} />
    </View>
  );
};

export default EditRecordSection;
