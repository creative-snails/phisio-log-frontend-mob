import React, { useState } from "react";
import { Path } from "react-native-svg";

import { bodyPartData } from "@/services/bodyParts";

const BodyPart = ({ data }: { data: bodyPartData }) => {
  const [partData, setPartData] = useState({ isSelected: data.isSelected, status: data.status });
  return (
    <Path
      id={data.id}
      d={data.d}
      onPressIn={() => setPartData((prev) => ({ ...prev, isSelected: !prev.isSelected }))}
      stroke="#ff0000"
      strokeWidth={6}
      strokeOpacity={1}
      fill={partData.isSelected ? "#ff0000" : "#aaaaaa"}
    />
  );
};

export default BodyPart;
