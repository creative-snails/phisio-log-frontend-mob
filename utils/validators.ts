import { MedicalConsultation, Progression, Severity, Stage, Description, Symptom, Z_SymptomsArray } from "@/types/healthRecordTypes";

export const validators = {
  description: (description: Description) => ({
    valid: description.description,
    message: "Description must be at least 10 characters long!",
  }),

  symptoms: (symptoms: Symptom[]) => {
    const normalized = symptoms.map((s) => ({
      ...s,
      startDate:
        typeof s.startDate === "string" ? new Date(s.startDate) : s.startDate,
    }));

    const result = Z_SymptomsArray.safeParse(normalized);

    return {
      valid: result.success,
      message: result.success
        ? ""
        : result.error.errors.map((e) => e.message).join(", "),
    };
  },

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

  medicalConsultations: (medicalConsultations: MedicalConsultation[]) => ({
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
