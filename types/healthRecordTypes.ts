type Status = "open" | "closed" | "in-progress";
type ImprovementStatus = "improving" | "stable" | "worsening" | "variable";
type Severity = "mild" | "moderate" | "severe" | "variable";

export type currentConditionOptionsType = {
  status: { label: string; value: Status }[];
  severity: { label: string; value: Severity }[];
  improvementStatus: { label: string; value: ImprovementStatus }[];
};

export interface Symptom {
  name: string;
  startDate: Date;
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
  currentCondition?: {
    status?: Status;
    severity?: Severity;
    improvementStatus?: ImprovementStatus;
  };
  treatmentsTried?: string[];
  medicalConsultations?: MedicalConsultation[];
}

export interface HealthRecordType {
  description: string;
  symptoms: Symptom[];
  currentCondition: {
    status: Status;
    severity: Severity;
    improvementStatus: ImprovementStatus;
  };
  treatmentsTried?: string[];
  medicalConsultations?: MedicalConsultation[];
  updates?: HealthRecordUpdateType[];
}
