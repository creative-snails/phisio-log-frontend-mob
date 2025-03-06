import { useState } from "react";

const HealthRecordForm = () => {
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState<{ name: string; startDate: string; duration: string }[]>([]);
  const [status, setStatus] = useState("open");

  const handleDescriptionChange = (text: string) => setDescription(text);
  const addSympton = () => setSymptoms([...symptoms, { name: "", startDate: "", duration: "" }]);
  const handleStatusChange = (text: string) => setStatus(text);

  const updateSymptom = (index: number, key: string, value: string) => {
    const updatedSymptoms = symptoms.map((symptom, i) => {
      if (i === index) {
        return { ...symptom, [key]: value };
      }
      return symptom;
    });
    setSymptoms(updatedSymptoms);
  };
};

export default HealthRecordForm;
