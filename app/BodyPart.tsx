import React, { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { Path } from "react-native-svg";

import { bodyPartData } from "@/services/bodyParts";

interface BodyPartProps {
  data: bodyPartData;
  interact: boolean;
  // bodyPartIsSelected: boolean;
  // toggleBodyPartIsSelected: (toggle: boolean) => void;
  onSelect: (id: string) => void;
}

const BodyPart = ({ interact, data, onSelect }: BodyPartProps) => {
  // Ref to track latest interact prop value inside event handlers
  const interactRef = useRef(interact);

  // Keep interactRef in sync with interact prop
  useEffect(() => {
    interactRef.current = interact;
  }, [interact]);

  // Color mapping for different status levels
  const statusColors = {
    1: "#F44336",
    2: "#FF9800",
    3: "#4CAF50",
  };

  // Hanlde press events with debounce to prevent double triggers
  const handlePress = () => {
    const pressTimeout = setTimeout(() => {
      if (!interactRef.current) return;
      onSelect(data.id);
    }, 250);

    return () => clearTimeout(pressTimeout);
  };

  return (
    <Path
      id={data.id}
      d={data.d}
      onPressIn={Platform.OS !== "web" ? handlePress : undefined}
      onPress={Platform.OS === "web" ? handlePress : undefined}
      stroke="#ff0000"
      strokeWidth={6}
      strokeOpacity={1}
      fill={data.isSelected ? statusColors[data.status] : "#aaaaaa"}
    />
  );
};

export default BodyPart;
