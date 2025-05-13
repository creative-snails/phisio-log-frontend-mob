import { statusOptionsType } from "./healthRecordTypes";

export const ROUTES = {
  EDIT: {
    DESCRIPTION: "edit/EditDescription" as const,
    SYMPTOMS: "edit/EditSymptoms" as const,
    STATUS: "edit/EditStatus" as const,
    TREATMENTS: "edit/EditTreatments" as const,
    CONSULTATIONS: "edit/EditConsultations" as const,
  },
  HEALTH_RECORD: "HealthRecordForm" as const,
  BODY_MAP: "BodyMap" as const,
  BODY_PART: "BodyPart" as const,
  HOME: "" as const,
};

export const statusOptions: statusOptionsType = {
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
