import { useState } from "react";
import { Text, View } from "react-native";

interface PartialRecord {
  description: string;
  status: string;
  improvementStatus: string;
  severity: string;
}

interface Symptoms {
  name: string;
  startDate: string;
}

interface MedicalConsultation {
  consultant: string;
  date: string;
  diagnosis: string;
  followUpAction: string[];
}

const HealthRecordForm = () => {
  const [symptoms, setSymptoms] = useState<Symptoms[]>([]);
  const [treatmentsTried, setTreatmentsTried] = useState<string[]>([]);
  const [medicalConsultations, setMedicalConsultations] = useState<MedicalConsultation[]>([]);

  const addSymptom = () => setSymptoms([...symptoms, { name: "", startDate: "" }]);

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
      <View>
        <Text>User</Text>
      </View>

      <View>
        <Text>Description</Text>
      </View>

      <View>
        <Text>Symptoms</Text>
      </View>

      <View>
        <Text>Status</Text>
      </View>

      <View>
        <Text>Severity</Text>
      </View>

      <View>
        <Text>Treatments Tried</Text>
      </View>

      <View>
        <Text>Improvements Status</Text>
      </View>

      <View>
        <Text>Medical Consultations</Text>
      </View>

      <View>
        <Text>Created At & Updated At</Text>
      </View>
    </View>
  );
};

export default HealthRecordForm;
