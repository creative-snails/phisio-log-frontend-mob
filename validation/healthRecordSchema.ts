import { z } from "zod";

import { MAX_CHAR_LONG, MAX_CHAR_MEDIUM, MAX_CHAR_SHORT } from "@/utils/constants";
import { maxValidationMessage, minValidationMessage } from "@/validation/helpers";

export const Z_Stage = z.enum(["open", "closed", "in-progress"]);
export const Z_Severity = z.enum(["mild", "moderate", "severe", "variable"]);
export const Z_Progression = z.enum(["improving", "stable", "worsening", "variable"]);

const Z_LabeledEnumOption = <T extends z.ZodTypeAny>(enumSchema: T) =>
  z.object({
    label: z.string(),
    value: enumSchema,
  });

export const Z_StatusOptions = z.object({
  stage: z.array(Z_LabeledEnumOption(Z_Stage)),
  severity: z.array(Z_LabeledEnumOption(Z_Severity)),
  progression: z.array(Z_LabeledEnumOption(Z_Progression)),
});

export const Z_Status = z.object({
  stage: Z_Stage,
  severity: Z_Severity,
  progression: Z_Progression,
});

export const Z_Description = z
  .string()
  .min(10, minValidationMessage("Description", 10))
  .max(MAX_CHAR_MEDIUM, maxValidationMessage("Description", MAX_CHAR_MEDIUM));

export const Z_Symptom = z.object({
  name: z
    .string()
    .trim()
    .min(2, minValidationMessage("Symptom", 2))
    .max(MAX_CHAR_MEDIUM, maxValidationMessage("Symptom", MAX_CHAR_MEDIUM)),
  startDate: z.date().optional(),
  // TODO: This is causing some strange behaviour, will address it in the future
  // startDate: z.date().max(new Date(), "Start date cannot be in the future").optional(),
});

export const Z_MedicalConsultation = z.object({
  consultant: z
    .string()
    .trim()
    .min(2, minValidationMessage("Consultant", 2))
    .max(MAX_CHAR_SHORT, maxValidationMessage("Consultant", MAX_CHAR_SHORT)),
  date: z.date().refine((date) => date <= new Date(), "Consultation date cannot be in the future"),
  diagnosis: z
    .string()
    .trim()
    .min(10, minValidationMessage("Diagnosis", 10))
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

export const Z_HealthRecordUpdate = z.object({
  description: z.string().optional(),
  symptoms: z.array(Z_Symptom).optional(),
  status: z
    .object({
      stage: Z_Stage.optional(),
      severity: Z_Severity.optional(),
      progression: Z_Progression.optional(),
    })
    .optional(),
  treatmentsTried: z
    .array(
      z
        .string()
        .trim()
        .min(2, minValidationMessage("Treatments tried", 2))
        .max(MAX_CHAR_LONG, maxValidationMessage("Treatments tried", MAX_CHAR_LONG))
    )
    .optional()
    .default([]),
  medicalConsultations: z.array(Z_MedicalConsultation).optional(),
});

export const Z_HealthRecord = z.object({
  description: z.string(),
  symptoms: z.array(Z_Symptom).min(1, "At least one symptom is required"),
  status: z.object({
    stage: Z_Stage,
    severity: Z_Severity,
    progression: Z_Progression,
  }),
  treatmentsTried: z
    .array(
      z
        .string()
        .trim()
        .min(2, minValidationMessage("Treatments tried", 2))
        .max(MAX_CHAR_LONG, maxValidationMessage("Treatments tried", MAX_CHAR_LONG))
    )
    .optional()
    .default([]),
  medicalConsultations: z.array(Z_MedicalConsultation).optional(),
  updates: z.array(Z_HealthRecordUpdate).optional(),
});

export const Z_SymptomsArray = z.array(Z_Symptom);
export const Z_MedicalConsultationArray = z.array(Z_MedicalConsultation);

export type Stage = z.infer<typeof Z_Stage>;
export type Severity = z.infer<typeof Z_Severity>;
export type Progression = z.infer<typeof Z_Progression>;
export type StatusOptionsType = z.infer<typeof Z_StatusOptions>;
export type Status = z.infer<typeof Z_Status>;
export type Description = z.infer<typeof Z_Description>;
export type Symptom = z.infer<typeof Z_Symptom>;
export type MedicalConsultation = z.infer<typeof Z_MedicalConsultation>;
export type HealthRecordUpdateType = z.infer<typeof Z_HealthRecordUpdate>;
export type HealthRecordType = z.infer<typeof Z_HealthRecord>;
