import { HealthRecordType, Symptom } from "@/validation/healthRecordSchema";

interface HandleDeselectParams {
  selectedPartId: string | null;
  currentSymptom: Symptom;
  updateCurrentSymptom: (symptom: Symptom) => void;
  setSelectedPartId: (id: string | null) => void;
  healthRecord: HealthRecordType;
  updateHealthRecord: (index: number, record: HealthRecordType) => Promise<void>;
  currentRecordIndex: number | null;
  currentSymptomIndex: number | null;
}

export const handleDeselect = async ({
  selectedPartId,
  currentSymptom,
  updateCurrentSymptom,
  setSelectedPartId,
  healthRecord,
  updateHealthRecord,
  currentRecordIndex,
  currentSymptomIndex,
}: HandleDeselectParams) => {
  if (!selectedPartId) return;

  const updatedParts = currentSymptom.affectedParts.filter((p) => p.id !== selectedPartId);

  const updatedSymptom = {
    ...currentSymptom,
    affectedParts: updatedParts,
  };

  updateCurrentSymptom(updatedSymptom);
  setSelectedPartId(null);

  const updatedHealthRecord: HealthRecordType = {
    ...healthRecord,
    symptoms: healthRecord.symptoms.map((symptom) => (symptom.name === updatedSymptom.name ? updatedSymptom : symptom)),
  };

  if (currentRecordIndex === null || currentSymptomIndex === null) {
    console.warn("Cannot save: missing record or symptom index.");

    return;
  }

  try {
    await updateHealthRecord(currentRecordIndex, updatedHealthRecord);
  } catch (error) {
    console.error("Failed to persist deselection:", error);
  }
};
