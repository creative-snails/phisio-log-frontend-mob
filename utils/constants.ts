import { StatusOptionsType } from "../types/healthRecordTypes";

export const ROUTES = {
  EDIT: {
    DESCRIPTION: "edit/EditDescription" as const,
    SYMPTOMS: "edit/EditSymptoms" as const,
    STATUS: "edit/EditStatus" as const,
    TREATMENTS: "edit/EditTreatments" as const,
    CONSULTATIONS: "edit/EditConsultations" as const,
  },
  HEALTH_RECORD: "HealthRecord" as const,
  BODY_MAP: "BodyMap" as const,
  BODY_PART: "BodyPart" as const,
  HOME: "" as const,
};

export const SCREEN_LABELS = {
  BODY_MAP: "Body Map",
  HEALTH_RECORD: "Health Record",
  EDIT: {
    DESCRIPTION: "Edit Description",
    SYMPTOMS: "Edit Symptoms",
    STATUS: "Edit Status",
    TREATMENTS: "Edit Treatments",
    CONSULTATIONS: "Edit Medical Consultations",
  },
};

export const statusOptions: StatusOptionsType = {
  stage: [
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
    { label: "In Progress", value: "in-progress" },
  ],
  severity: [
    { label: "Mild", value: "mild" },
    { label: "Moderate", value: "moderate" },
    { label: "Severe", value: "severe" },
    { label: "Variable", value: "variable" },
  ],
  progression: [
    { label: "Improving", value: "improving" },
    { label: "Stable", value: "stable" },
    { label: "Worsening", value: "worsening" },
    { label: "Variable", value: "variable" },
  ],
};

export const statusConfigs = [
  { field: "stage", title: "Stage", zIndex: 3000, zIndexInverse: 1000 },
  { field: "severity", title: "Severity", zIndex: 2000, zIndexInverse: 2000 },
  { field: "progression", title: "Progression", zIndex: 1000, zIndexInverse: 3000 },
] as const;
