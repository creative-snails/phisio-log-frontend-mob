import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getHealthRecord } from "./api";

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
  const [partialRecord, setPartialRecord] = useState<PartialRecord>({
    description: "",
    status: "",
    improvementStatus: "",
    severity: "",
  });
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

  const mapPartialRecord = async () => {
    const healthRecord = await getHealthRecord(1);
    setPartialRecord({
      description: healthRecord[0].description,
      status: healthRecord[0].status,
      improvementStatus: healthRecord[0].improvementStatus,
      severity: healthRecord[0].severity,
    });
  };

  const mapSymptoms = async () => {
    const healthRecord = await getHealthRecord(1);
    setSymptoms(healthRecord[0].symptoms);
  };

  const mapTreatmentsTried = async () => {
    const healthRecord = await getHealthRecord(1);
    setTreatmentsTried(healthRecord[0].treatmentsTried);
  };

  const mapMedicalConsultations = async () => {
    const healthRecord = await getHealthRecord(1);
    setMedicalConsultations(healthRecord[0].medicalConsultations);
  };

  useEffect(() => {
    mapPartialRecord();
    mapSymptoms();
    mapTreatmentsTried();
    mapMedicalConsultations();
  }, []);

  return (
    <View>
      <View>
        <Text>Description {partialRecord.description}</Text>
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
    </View>
  );
};

export default HealthRecordForm;
