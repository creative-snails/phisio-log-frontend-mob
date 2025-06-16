import { create } from "zustand";

import { HealthRecordType, Symptom } from "@/validation/healthRecordSchema";

interface AppStore {
  loading: boolean;
  healthRecords: HealthRecordType[];
  healthRecord: HealthRecordType;
  setHealthRecords: (healthRecords: HealthRecordType[]) => void;
  setHealthRecord: (healthRecord: HealthRecordType) => void;
  setLoading: (loading: boolean) => void;

  currentRecordIndex: number | null;
  setCurrentRecordIndex: (index: number | null) => void;
  currentSymptomIndex: number | null;
  setCurrentSymptomIndex: (index: number | null) => void;
  updateCurrentSymptom: (updates: Symptom) => void;
}

const useAppStore = create<AppStore>((set, get) => ({
  loading: false,
  healthRecords: [],
  healthRecord: {
    description: "",
    symptoms: [],
    status: {
      stage: "open",
      severity: "mild",
      progression: "stable",
    },
    treatmentsTried: [],
    medicalConsultations: [],
    updates: [],
  },
  setHealthRecords: (healthRecords: HealthRecordType[]) => set({ healthRecords }),
  setHealthRecord: (healthRecord: HealthRecordType) => set({ healthRecord }),
  setLoading: (loading: boolean) => set({ loading }),

  currentRecordIndex: 1,
  setCurrentRecordIndex: (index) => set({ currentRecordIndex: index }),
  currentSymptomIndex: null,
  setCurrentSymptomIndex: (index) => set({ currentSymptomIndex: index }),

  updateCurrentSymptom: (updates) => {
    const { healthRecord, currentSymptomIndex } = get();
    if (currentSymptomIndex === null) return;

    const updatedSymptoms = [...healthRecord.symptoms];
    const oldSymptom = updatedSymptoms[currentSymptomIndex];

    updatedSymptoms[currentSymptomIndex] = { ...oldSymptom, ...updates };

    set({
      healthRecord: { ...healthRecord, symptoms: updatedSymptoms },
    });
  },
}));

export default useAppStore;
