import { useState } from "react";
import { Text, View } from "react-native";

interface RecordUpdates {
  description: string;
  symptoms: { name: string; startDate: string; duration: string }[];
  status: string;
  treatmentsTried: string;
  improvementStatus: string;
  medicalConsultations: string[];
}

interface PartialRecord {
  description: string;
  status: string;
  improvementStatus: string;
  severtiy: string;
  createdAt: string;
  updatedAt: string;
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

  // Handlers for updating state
  const handleDescriptionChange = (text: string) => setDescription(text);
  const handleStatusChange = (text: string) => setStatus(text);
  const handleImprovementChange = (text: string) => setImprovementStatus(text);
  const handleSeverityChange = (text: string) => setSeverity(text);
  const handleCreatedAtChange = (text: string) => setCreatedAt(text);
  const handleUpdatedAtChange = (text: string) => setUpdatedAt(text);

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
    </View>
  );
};

export default HealthRecordForm;
