import { useState } from "react";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

type UseDatePickerProps<T> = {
  onDateChange: (index: number, date: string) => void;
  getItemDate: (item: T) => Date;
};

export function useDatePicker<T>({ onDateChange, getItemDate }: UseDatePickerProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const openDatePicker = (index: number) => {
    setSelectedItemIndex(index);
    setIsOpen(true);
  };

  const closeDatePicker = () => setIsOpen(false);

  const handleConfirmDate = (date: CalendarDate) => {
    if (selectedItemIndex !== null && date) {
      onDateChange(selectedItemIndex, date.toISOString().split("T")[0]);
    }
    closeDatePicker();
  };

  const getCurrentDate = (items?: T[]) => {
    if (selectedItemIndex === null || !items) {
      return new Date();
    }
    const item = items[selectedItemIndex];
    return getItemDate(item);
  };

  return {
    isOpen,
    selectedItemIndex,
    openDatePicker,
    closeDatePicker,
    handleConfirmDate,
    getCurrentDate,
  };
}
