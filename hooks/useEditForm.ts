import { useState } from "react";
import { Alert, Platform } from "react-native";
import { router } from "expo-router";

import useAppStore from "@/store/useAppStore";
import { HealthRecordType } from "@/validation/healthRecordSchema";

type Validator<T> = (value: T) => { valid: boolean; message: string };

export function useEditForm<T>(fieldName: keyof HealthRecordType, validator: Validator<T>) {
  const { setHealthRecord, healthRecord, setLoading, loading } = useAppStore();
  const [localValue, setLocalValue] = useState<T>(healthRecord[fieldName] as T);

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

    try {
      setLoading(true);
      setHealthRecord({ ...healthRecord, [fieldName]: localValue });
      console.log(`Saved ${fieldName}:`, localValue);
      router.back();
    } catch (error) {
      console.error(`Error saving ${fieldName}:`, error);
      Alert.alert("Error", `Failed to save ${fieldName}`);
    } finally {
      setLoading(false);
    }
  };

  return { localValue, setLocalValue, handleSave, loading };
}
