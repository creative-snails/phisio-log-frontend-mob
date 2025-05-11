import { useState } from "react";

import useAppStore from "@/store/useAppStore";
import { HealthRecordType } from "@/types/healthRecordTypes";

type Validator<T> = (value: T) => { valid: boolean; message: string };

export function useFormEdit<T>(fieldName: keyof HealthRecordType, initialValue: T, validator: Validator<T>) {
  const { setHealthRecord, healthRecord, setLoading, loading } = useAppStore();
  const [localValue, setLocalValue] = useState<T>(initialValue);
}
