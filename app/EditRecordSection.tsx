import React from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import EditDescription from "./EditDescription";
import EditSymptoms from "./EditSymptoms";

const EditRecordSection = () => {
  const { section, data } = useLocalSearchParams<{ section: string; data: string }>();

  return (
    <View>
      {section === "Description" && <EditDescription data={data} />}
      {section === "Symptoms" && <EditSymptoms data={data} />}
    </View>
  );
};

export default EditRecordSection;
