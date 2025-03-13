type Status = "open" | "closed" | "in-progress";
type ImprovementStatus = "improving" | "stable" | "worsening" | "variable";
type Severity = "mild" | "moderate" | "severe" | "variable";

export interface Symptom {
  name: string;
  startDate?: Date;
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
  status?: Status;
  treatmentsTried?: string[];
  improvementStatus?: ImprovementStatus;
  medicalConsultations?: MedicalConsultation[];
  severity?: Severity;
}

export interface PartialRecord {
  description: string;
  status: string;
  improvementStatus: string;
  severity: string;
}

export interface HealthRecordType {
  user: string;
  description: string;
  symptoms: Symptom[];
  status?: Status;
  treatmentsTried?: string[];
  improvementStatus?: ImprovementStatus;
  medicalConsultations?: MedicalConsultation[];
  severity?: Severity;
  updates?: HealthRecordUpdateType[];
}
