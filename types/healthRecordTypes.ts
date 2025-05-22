import { z } from "zod";
import {
  MAX_CHAR_SHORT,
  MAX_CHAR_MEDIUM,
  MAX_CHAR_LONG,
  minValidationMessage,
  maxValidationMessage,
} from "@/utils/constants";

export const Z_Stage = z.enum(["open", "closed", "in-progress"]);
export const Z_Severity = z.enum(["mild", "moderate", "severe", "variable"]);
export const Z_Progression = z.enum(["improving", "stable", "worsening", "variable"]);

// export type Stage = "open" | "closed" | "in-progress";
// export type Severity = "mild" | "moderate" | "severe" | "variable";
// export type Progression = "improving" | "stable" | "worsening" | "variable";

export type StatusOptionsType = {
  stage: { label: string; value: Stage }[];
  severity: { label: string; value: Severity }[];
  progression: { label: string; value: Progression }[];
};

export const Z_Description = z.object({
  description: z
    .string()
    .min(10, "Longer description is required")
    .max(MAX_CHAR_MEDIUM, "Maximum length for description reached"),
});


export const Z_Symptom = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Symptom name is required")
    .max(MAX_CHAR_MEDIUM, maxValidationMessage("Symptom", MAX_CHAR_MEDIUM)),
  startDate: z.date().optional(),
  // TODO: This is causing some strange behaviour, will address it in the future
  // startDate: z.date().max(new Date(), "Start date cannot be in the future").optional(),
});

// export interface Symptom {
//   name: string;
//   startDate: string;
// }

export const Z_MedicalConsultation = z.object({
  consultant: z
    .string()
    .trim()
    .min(2, minValidationMessage("Consultant", 2))
    .max(MAX_CHAR_SHORT, maxValidationMessage("Consultant", MAX_CHAR_SHORT)),
  date: z.date().max(new Date(), "Consultation date cannot be in the future"),
  diagnosis: z
    .string()
    .trim()
    .min(1, "Diagnosis is required")
    .max(MAX_CHAR_LONG, maxValidationMessage("Diagnosis", MAX_CHAR_LONG)),
  followUpActions: z
    .array(
      z
        .string()
        .trim()
        .min(2, minValidationMessage("Follow-up actions", 2))
        .max(MAX_CHAR_LONG, maxValidationMessage("Follow-up actions", MAX_CHAR_LONG))
    )
    .optional()
    .default([]),
});

// export interface MedicalConsultation {
//   consultant: string;
//   date: string;
//   diagnosis: string;
//   followUpActions?: string[];
// }

export const Z_HealthRecordUpdate = z.object({
  description: z.string().optional(),
  symptoms: z.array(Z_Symptom).optional(),
  status: z.object({
    stage: Z_Stage.optional(),
    severity: Z_Severity.optional(),
    progression: Z_Progression.optional(),
  }).optional(),
  treatmentsTried: z.array(z.string()).optional(),
  medicalConsultations: z.array(Z_MedicalConsultation).optional(),
});

// export interface HealthRecordUpdateType {
//   description?: string;
//   symptoms?: Symptom[];
//   status?: {
//     stage?: Stage;
//     severity?: Severity;
//     progression?: Progression;
//   };
//   treatmentsTried?: string[];
//   medicalConsultations?: MedicalConsultation[];
// }

export const Z_HealthRecord = z.object({
  description: z.string(),
  symptoms: z.array(Z_Symptom),
  status: z.object({
    stage: Z_Stage,
    severity: Z_Severity,
    progression: Z_Progression,
  }),
  treatmentsTried: z.array(z.string()).optional(),
  medicalConsultations: z.array(Z_MedicalConsultation).optional(),
  updates: z.array(Z_HealthRecordUpdate).optional(),
});

// export interface HealthRecordType {
//   description: string;
//   symptoms: Symptom[];
//   status: {
//     stage: Stage;
//     severity: Severity;
//     progression: Progression;
//   };
//   treatmentsTried?: string[];
//   medicalConsultations?: MedicalConsultation[];
//   updates?: HealthRecordUpdateType[];
// }

export const Z_SymptomsArray = z.array(Z_Symptom);

export type Stage = z.infer<typeof Z_Stage>;
export type Severity = z.infer<typeof Z_Severity>;
export type Progression = z.infer<typeof Z_Progression>;
export type Description = z.infer<typeof Z_Description>;
export type Symptom = z.infer<typeof Z_Symptom>;
export type MedicalConsultation = z.infer<typeof Z_MedicalConsultation>;
export type HealthRecordUpdateType = z.infer<typeof Z_HealthRecordUpdate>;
export type HealthRecordType = z.infer<typeof Z_HealthRecord>;
