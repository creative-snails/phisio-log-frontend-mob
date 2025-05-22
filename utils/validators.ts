import { MedicalConsultationType, Progression, Severity, Stage, SymptomType } from "@/types/healthRecordTypes";

export const validators = {
  description: (value: string) => ({
    valid: value.trim().length >= 10,
    message: "Description must be at least 10 characters long!",
  }),

  symptoms: (symptoms: SymptomType[]) => ({
    valid: symptoms.every((symptom) => symptom.startDate && symptom.name.trim().length > 0),
    message: "All fields are required!",
  }),

  treatmentsTried: (treatments: string[]) => ({
    valid: treatments && treatments.every((treatment) => treatment.trim().length >= 3),
    message: "Each treatment must be at least 3 characters long!",
  }),

  status: (status: { stage: Stage; severity: Severity; progression: Progression }) => ({
    valid:
      status.stage &&
      status.severity &&
      status.progression &&
      ["open", "closed", "in-progress"].includes(status.stage) &&
      ["mild", "moderate", "severe", "variable"].includes(status.severity) &&
      ["improving", "stable", "worsening", "variable"].includes(status.progression),
    message: "Invalid status value(s)!",
  }),

  medicalConsultations: (medicalConsultations: MedicalConsultationType[]) => ({
    valid:
      medicalConsultations &&
      medicalConsultations.every(
        (consultation) =>
          consultation.consultant.trim().length > 0 &&
          consultation.date &&
          consultation.diagnosis.trim().length > 0 &&
          consultation.followUpActions?.every((action) => action.trim().length > 0)
      ),
    message: "All fields are required!",
  }),
};
