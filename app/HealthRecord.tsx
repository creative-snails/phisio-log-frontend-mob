import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { getHealthRecord } from "./api";

import CustomButton from "@/components/Button";
import useAppStore from "@/store/useAppStore";
import { ROUTES } from "@/utils/constants";

const HealthRecord = () => {
  const { setHealthRecord, healthRecord } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    const fetchHealthRecord = async () => {
      try {
        const healthRecord = await getHealthRecord(1);
        setHealthRecord(healthRecord);
      } catch (error) {
        console.error("Error fetching health record:", error);
      }
    };
    fetchHealthRecord();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Record</Text>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Description</Text>
        <Text style={styles.item}> {healthRecord.description}</Text>
        <CustomButton title="Edit" size="small" onPress={() => router.navigate(`/${ROUTES.EDIT.DESCRIPTION}`)} />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Symptoms</Text>
        {healthRecord.symptoms.map((symptom, index) => (
          <View key={index} style={styles.item}>
            <Text>Name: {symptom.name}</Text>
            <Text>
              Start Date:
              {symptom.startDate ? new Date(symptom.startDate).toISOString().split("T")[0] : ""}
            </Text>
          </View>
        ))}
        <CustomButton title="Edit" size="small" onPress={() => router.navigate(`/${ROUTES.EDIT.SYMPTOMS}`)} />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Status</Text>
        <View style={styles.item}>
          <Text style={styles.capitalizedText}>Stage: {healthRecord.status?.stage}</Text>
          <Text style={styles.capitalizedText}>Severity: {healthRecord.status?.severity}</Text>
          <Text style={styles.capitalizedText}>Progression: {healthRecord.status?.progression}</Text>
        </View>
        <CustomButton title="Edit" size="small" onPress={() => router.navigate(`/${ROUTES.EDIT.STATUS}`)} />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Treatments Tried</Text>
        <View style={styles.item}>
          {healthRecord.treatmentsTried?.map((treatment, index) => <Text key={index}>{treatment}</Text>)}
        </View>
        <CustomButton title="Edit" size="small" onPress={() => router.navigate(`/${ROUTES.EDIT.TREATMENTS}`)} />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.section}>Medical Consultations</Text>
        {healthRecord.medicalConsultations?.map((consultation, index) => (
          <View key={index} style={styles.item}>
            <Text>Consultant: {consultation.consultant}</Text>
            <Text>Date: {consultation.date ? new Date(consultation.date).toISOString().split("T")[0] : ""}</Text>
            <Text>Diagnosis: {consultation.diagnosis}</Text>
            <Text>Follow Up Actions:</Text>
            {consultation.followUpActions?.map((action, actionIndex) => <Text key={actionIndex}> - {action}</Text>)}
          </View>
        ))}
        <CustomButton title="Edit" size="small" onPress={() => router.navigate(`/${ROUTES.EDIT.CONSULTATIONS}`)} />
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
  item: {
    boxShadow: "2px 2px 12px rgba(0, 0, 0, 0.4)",
    marginVertical: 10,
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  section: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HealthRecord;
