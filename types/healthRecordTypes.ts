export type Stage = "open" | "closed" | "in-progress";
export type Severity = "mild" | "moderate" | "severe" | "variable";
export type Progression = "improving" | "stable" | "worsening" | "variable";

export type StatusOptionsType = {
  stage: { label: string; value: Stage }[];
  severity: { label: string; value: Severity }[];
  progression: { label: string; value: Progression }[];
};

export interface Symptom {
  name: string;
  startDate: string;
}

export interface MedicalConsultation {
  consultant: string;
  date: Date;
  diagnosis: string;
  followUpActions?: string[];
}

export interface HealthRecordUpdateType {
  description?: string;
  symptoms?: Symptom[];
  status?: {
    stage?: Stage;
    severity?: Severity;
    progression?: Progression;
  };
  treatmentsTried?: string[];
  medicalConsultations?: MedicalConsultation[];
}

export interface HealthRecordType {
  description: string;
  symptoms: Symptom[];
  status: {
    stage: Stage;
    severity: Severity;
    progression: Progression;
  };
  treatmentsTried?: string[];
  medicalConsultations?: MedicalConsultation[];
  updates?: HealthRecordUpdateType[];
}
