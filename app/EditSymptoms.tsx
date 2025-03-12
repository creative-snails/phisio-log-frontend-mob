import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

interface Symptom {
  name: string;
  startDate: string;
}

const EditSymptoms = ({ data }: { data: string }) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);

  useEffect(() => {
    try {
      const parsedData = JSON.parse(data);
      setSymptoms(parsedData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [data]);

  const updateSymptom = (index: number, key: string, value: string) => {
    const updatedSymptoms = symptoms.map((symptom, i) => {
      if (i === index) {
        return { ...symptom, [key]: value };
      }
      return symptom;
    });
    setSymptoms(updatedSymptoms);
  };

  return (
    <View>
      <Text>Edit Symptoms</Text>
      {symptoms.map((symptom, index) => (
        <View key={index}>
          <TextInput value={symptom.name} onChangeText={(text) => updateSymptom(index, "name", text)} />
          <TextInput value={symptom.startDate} onChangeText={(text) => updateSymptom(index, "startDate", text)} />
        </View>
      ))}
    </View>
  );
};

export default EditSymptoms;
