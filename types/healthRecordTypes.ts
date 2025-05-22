export type Stage = "open" | "closed" | "in-progress";
export type Severity = "mild" | "moderate" | "severe" | "variable";
export type Progression = "improving" | "stable" | "worsening" | "variable";

export type StatusOptionsType = {
  stage: { label: string; value: Stage }[];
  severity: { label: string; value: Severity }[];
  progression: { label: string; value: Progression }[];
};

export interface SymptomType {
  name: string;
  startDate: string;
}

export interface MedicalConsultationType {
  consultant: string;
  date: string;
  diagnosis: string;
  followUpActions?: string[];
}

export interface HealthRecordUpdateType {
  description?: string;
  symptoms?: SymptomType[];
  status?: {
    stage?: Stage;
    severity?: Severity;
    progression?: Progression;
  };
  treatmentsTried?: string[];
  medicalConsultations?: MedicalConsultationType[];
}

export interface HealthRecordType {
  description: string;
  symptoms: SymptomType[];
  status: {
    stage: Stage;
    severity: Severity;
    progression: Progression;
  };
  treatmentsTried?: string[];
  medicalConsultations?: MedicalConsultationType[];
  updates?: HealthRecordUpdateType[];
}
