import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const EditRecordSection = () => {
  const { section, data } = useLocalSearchParams<{ section: string; data: any }>();
  const [value, setValue] = useState(data);
  return (
    <View>
      <Text>Edit {section} </Text>
      <TextInput value={value} onChangeText={setValue} />
    </View>
  );
};

export default EditRecordSection;
