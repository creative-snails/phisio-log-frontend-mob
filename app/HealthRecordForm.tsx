import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { getHealthRecord } from "./api";

import { MedicalConsultation, PartialRecord, Symptom } from "@/types/healthRecordTypes";

const HealthRecordForm = () => {
  const [partialRecord, setPartialRecord] = useState<PartialRecord>({
    description: "",
    status: "",
    improvementStatus: "",
    severity: "",
  });
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [treatmentsTried, setTreatmentsTried] = useState<string[]>([]);
  const [medicalConsultations, setMedicalConsultations] = useState<MedicalConsultation[]>([]);

  // const addSymptom = () => setSymptoms([...symptoms, { name: "", startDate: "" }]);

  useEffect(() => {
    const fetchHealthRecord = async () => {
      try {
        const healthRecord = await getHealthRecord(1);

        setPartialRecord({
          description: healthRecord.description,
          status: healthRecord.status,
          improvementStatus: healthRecord.improvementStatus,
          severity: healthRecord.severity,
        });
        setTreatmentsTried(healthRecord.treatmentsTried);
        setMedicalConsultations(healthRecord.medicalConsultations);
        setSymptoms(healthRecord.symptoms);
      } catch (error) {
        console.error("Error fetching health record:", error);
      }
    };
    fetchHealthRecord();
  }, []);

  const editRecord = (editSection: string, editData: string | Symptom[] | MedicalConsultation[] | string[]) => {
    router.push({
      pathname: "/EditRecordSection",
      params: { section: editSection, data: JSON.stringify(editData) },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Record</Text>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Description</Text>
        <Text> {partialRecord.description}</Text>
        <Pressable style={styles.editButton} onPress={() => editRecord("Description", partialRecord.description)}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Symptoms</Text>
        {symptoms.map((symptom, index) => (
          <View key={index}>
            <Text>Name: {symptom.name}</Text>
            <Text>Start Date: {symptom.startDate ? symptom.startDate.toString() : ""}</Text>
          </View>
        ))}
        <Pressable style={styles.editButton} onPress={() => editRecord("Symptoms", symptoms)}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Status</Text>
        <Text>{partialRecord.status}</Text>
        <Pressable style={styles.editButton} onPress={() => console.log("Edit Status")}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Severity</Text>
        <Text>{partialRecord.severity}</Text>
        <Pressable style={styles.editButton} onPress={() => console.log("Edit Severity")}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Treatments Tried</Text>
        {treatmentsTried.map((treatment, index) => (
          <Text key={index}>{treatment}</Text>
        ))}
        <Pressable style={styles.editButton} onPress={() => console.log("Edit Treatments Tried")}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Improvement Status</Text>
        <Text>{partialRecord.improvementStatus}</Text>
        <Pressable style={styles.editButton} onPress={() => console.log("Edit Improvement Status")}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Medical Consultation</Text>
        {medicalConsultations.map((consultation, index) => (
          <View key={index}>
            <Text>Consultant: {consultation.consultant}</Text>
            <Text>Date: {consultation.date ? consultation.date.toString() : ""}</Text>
            <Text>Diagnosis: {consultation.diagnosis}</Text>
            <Text>Follow-up action: {consultation.followUpActions?.join(", ")}</Text>
          </View>
        ))}
        <Pressable style={styles.editButton} onPress={() => console.log("Edit Medical Consultation")}>
          <Text>Edit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  editButton: {
    alignItems: "center",
    backgroundColor: "#FBDABB",
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 5,
    width: 100,
  },
  innerContainer: {
    alignItems: "center",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
  section: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HealthRecordForm;
