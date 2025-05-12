import { MedicalConsultation, statusOptionsType, Symptom } from "@/types/healthRecordTypes";

export const validators = {
  description: (value: string) => ({
    valid: value.trim().length >= 10,
    message: "Description must be at least 10 characters long!",
  }),

  symptoms: (symptoms: Symptom[]) => ({
    valid: symptoms.every((symptom) => symptom.startDate && symptom.name.trim().length > 0),
    message: "All fields are required!",
  }),

  treatmentsTried: (treatments: string[] | undefined) => ({
    valid: treatments && treatments.every((treatment) => treatment.trim().length >= 3),
    message: "Each treatment must be at least 3 characters long!",
  }),

  status: (status: statusOptionsType) => ({
    valid: status.stage && status.severity && status.progression,
    message: "Invalid value selected!",
  }),

  medicalConsultations: (medicalConsultations: MedicalConsultation[] | undefined) => ({
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
