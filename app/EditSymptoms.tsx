import React, { useEffect, useState } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

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

  const handleSave = () => {
    for (const symptom of symptoms) {
      if (symptom.name.trim().length < 3) {
        if (Platform.OS === "web") {
          window.alert("Symptom name must be at least 3 characters long!");
        } else {
          Alert.alert("Symptom name must be at least 3 characters long!");
        }
        return;
      }
    }
    // Save
    console.log("Saved symptoms:", symptoms);
  };

  return (
    <View>
      <Text style={styles.title}>Edit Symptoms</Text>
      {symptoms.map((symptom, index) => (
        <ScrollView key={index} style={styles.container}>
          <TextInput
            style={styles.textInput}
            value={symptom.name}
            onChangeText={(text) => updateSymptom(index, "name", text)}
          />
          <TextInput value={symptom.startDate} onChangeText={(text) => updateSymptom(index, "startDate", text)} />
          <Pressable style={styles.saveBtn} onPress={handleSave}>
            <Text>Save</Text>
          </Pressable>
        </ScrollView>
      ))}
      <Pressable style={styles.saveBtn} onPress={router.back}>
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    margin: 8,
    padding: 8,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
  },
  saveBtn: {
    alignItems: "center",
    backgroundColor: "#FBDABB",
    borderRadius: 10,
    justifyContent: "center",
    marginHorizontal: "auto",
    marginTop: 10,
    paddingVertical: 5,

    width: 100,
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: "auto",
    padding: 16,
  },
});

export default EditSymptoms;
