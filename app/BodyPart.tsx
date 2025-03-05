import React, { useState } from "react";
import { Path } from "react-native-svg";

import { bodyPartData } from "@/services/bodyParts";

const BodyPart = ({ data }: { data: bodyPartData }) => {
  const [isSelected, setIsSelected] = useState<boolean>(data.isSelected);

  const statusColors = {
    1: "#F44336",
    2: "#FF9800",
    3: "#4CAF50",
  };
  return (
    <Path
      id={data.id}
      d={data.d}
      onPressIn={() => setIsSelected((prev) => !prev)}
      onPress={() => setIsSelected((prev) => !prev)}
      stroke="#ff0000"
      strokeWidth={6}
      strokeOpacity={1}
      fill={isSelected ? statusColors[data.status] : "#aaaaaa"}
    />
  );
};

export default BodyPart;
