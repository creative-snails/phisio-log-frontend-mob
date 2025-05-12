import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { getHealthRecord } from "./api";

import useAppStore from "@/store/useAppStore";
import { ROUTES } from "@/types/constants";

const HealthRecordForm = () => {
  const { setHealthRecord, healthRecord } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    const fetchHealthRecord = async () => {
      try {
        const healthRecord = await getHealthRecord(1);
        console.log("Fetched health record:", healthRecord);
        setHealthRecord(healthRecord);
      } catch (error) {
        console.error("Error fetching health record:", error);
      }
    };
    fetchHealthRecord();
    // eslint-disable-next-line
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Record</Text>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Description</Text>
        <Text> {healthRecord.description}</Text>
        <Pressable style={styles.editButton} onPress={() => router.navigate(`/${ROUTES.EDIT.DESCRIPTION}`)}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Symptoms</Text>
        {healthRecord.symptoms.map((symptom, index) => (
          <View key={index}>
            <Text>Name: {symptom.name}</Text>
            <Text>Start Date: {symptom.startDate ? symptom.startDate.toString() : ""}</Text>
          </View>
        ))}
        <Pressable style={styles.editButton} onPress={() => router.navigate(`/${ROUTES.EDIT.SYMPTOMS}`)}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Status</Text>
        <View>
          <Text style={styles.capitalizedText}>Stage: {healthRecord.status?.stage}</Text>
          <Text style={styles.capitalizedText}>Severity: {healthRecord.status?.severity}</Text>
          <Text style={styles.capitalizedText}>Progression: {healthRecord.status?.progression}</Text>
        </View>
        <Pressable style={styles.editButton} onPress={() => router.navigate(`/${ROUTES.EDIT.STATUS}`)}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Treatments Tried</Text>
        {healthRecord.treatmentsTried?.map((treatment, index) => <Text key={index}>{treatment}</Text>)}
        <Pressable style={styles.editButton} onPress={() => router.navigate(`/${ROUTES.EDIT.TREATMENTS}`)}>
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Medical Consultation</Text>
        {healthRecord.medicalConsultations?.map((consultation, index) => (
          <View key={index}>
            <Text>Consultant: {consultation.consultant}</Text>
            <Text>Date: {consultation.date ? consultation.date.toString() : ""}</Text>
            <Text>Diagnosis: {consultation.diagnosis}</Text>
            <Text>Follow-up action: {consultation.followUpActions?.join(", ")}</Text>
          </View>
        ))}
        <Pressable style={styles.editButton} onPress={() => router.navigate(`/${ROUTES.EDIT.CONSULTATIONS}`)}>
          <Text>Edit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  capitalizedText: {
    textTransform: "capitalize",
  },
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
