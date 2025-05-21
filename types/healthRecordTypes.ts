import { z } from "zod";
import {
  MAX_CHAR_SHORT,
  MAX_CHAR_MEDIUM,
  MAX_CHAR_LONG,
  minValidationMessage,
  maxValidationMessage,
  STATUS_TYPES,
  IMPROVEMENT_STATUS,
  SEVERITY_TYPES
} from "@/utils/constants";

export type Stage = "open" | "closed" | "in-progress";
export type Severity = "mild" | "moderate" | "severe" | "variable";
export type Progression = "improving" | "stable" | "worsening" | "variable";

export type StatusOptionsType = {
  stage: { label: string; value: Stage }[];
  severity: { label: string; value: Severity }[];
  progression: { label: string; value: Progression }[];
};

const Z_Symptoms = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Symptom name is required")
    .max(MAX_CHAR_MEDIUM, maxValidationMessage("Symptom", MAX_CHAR_MEDIUM)),
  startDate: z.date().optional(),
  // TODO: This is causing some strange behaviour, will address it in the future
  // startDate: z.date().max(new Date(), "Start date cannot be in the future").optional(),
});

export type Symptom = z.infer<typeof Z_Symptoms>;

// export interface Symptom {
//   name: string;
//   startDate: string;
// }

export interface MedicalConsultation {
  consultant: string;
  date: string;
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
