import { useState } from "react";
import { Alert, Platform } from "react-native";
import { router } from "expo-router";

import useAppStore from "@/store/useAppStore";
import { HealthRecordType } from "@/types/healthRecordTypes";

type Validator<T> = (value: T) => { valid: boolean; message: string };

export function useFormEdit<T>(fieldName: keyof HealthRecordType, initialValue: T, validator: Validator<T>) {
  const { setHealthRecord, healthRecord, setLoading, loading } = useAppStore();
  const [localValue, setLocalValue] = useState<T>(initialValue);

  const handleSave = () => {
    const validation = validator(localValue);
    if (!validation.valid) {
      if (Platform.OS === "web") {
        window.alert(validation.message);
      } else {
        Alert.alert("Error", validation.message);
      }
      return;
    }

    setHealthRecord({ ...healthRecord, [fieldName]: localValue });
    console.log(`Saved ${fieldName}:`, localValue);
    router.back();
  };

  return { localValue, setLocalValue, handleSave };
}
