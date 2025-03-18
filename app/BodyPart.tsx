import React, { useState } from "react";
import { Path } from "react-native-svg";

import { bodyPartData } from "@/services/bodyParts";

interface BodyPartProps {
  data: bodyPartData;
  interact: boolean;
}

const BodyPart = ({ interact, data }: BodyPartProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(data.isSelected);

  const statusColors = {
    1: "#F44336",
    2: "#FF9800",
    3: "#4CAF50",
  };

  const handleOnPress = () => {
    if (interact) setIsSelected((prev) => !prev);
  };

  return (
    <Path
      id={data.id}
      d={data.d}
      onPressIn={handleOnPress}
      onPress={handleOnPress}
      stroke="#ff0000"
      strokeWidth={6}
      strokeOpacity={1}
      fill={isSelected ? statusColors[data.status] : "#aaaaaa"}
    />
  );
};

export default BodyPart;
