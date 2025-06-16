import { HealthRecordType, Symptom } from "@/validation/healthRecordSchema";

interface SaveSymptomParams {
  healthRecord: HealthRecordType;
  currentSymptom: Symptom;
  currentSymptomIndex: number | null;
  currentRecordIndex: number | null;
  updateHealthRecord: (index: number, record: HealthRecordType) => Promise<void>;
  updateCurrentSymptom: (symptom: Symptom) => void;
  setSelectedPartId: (id: string | null) => void;
}

export const handleSaveSymptom = async ({
  healthRecord,
  currentSymptom,
  currentSymptomIndex,
  currentRecordIndex,
  updateHealthRecord,
  updateCurrentSymptom,
  setSelectedPartId,
}: SaveSymptomParams) => {
  if (currentRecordIndex === null || currentSymptomIndex === null) {
    console.warn("Cannot save: missing record or symptom index.");

    return;
  }

  const updatedRecord: HealthRecordType = { ...healthRecord };
  const updatedSymptoms = [...updatedRecord.symptoms];
  updatedSymptoms[currentSymptomIndex] = currentSymptom;
  updatedRecord.symptoms = updatedSymptoms;

  updateCurrentSymptom(currentSymptom);
  try {
    await updateHealthRecord(currentRecordIndex, updatedRecord);
    setSelectedPartId(null);
    console.log("Record saved.");
  } catch (error) {
    console.error("Failed to save record: ", error);
  }
};
