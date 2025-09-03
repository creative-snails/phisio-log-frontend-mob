import { StyleSheet, View } from "react-native";
import Svg from "react-native-svg";

import BodyPart from "@/app/BodyPart";
import { backSide, frontSide } from "@/services/bodyParts";
import { Symptom } from "@/validation/healthRecordSchema";

type Props = {
  affectedParts: Symptom["affectedParts"];
  flip?: boolean; // optional, in case you want front/back toggle
};

const BodyMapPreview: React.FC<Props> = ({ affectedParts, flip = true }) => {
  const mapBodyParts = (base: typeof frontSide) =>
    base.map((part) => {
      const match = affectedParts.find((p) => p.id === part.id);

      return {
        ...part,
        isSelected: !!match,
        status: match ? match.status : part.status,
      };
    });

  const mappedFrontSide = mapBodyParts(frontSide);
  const mappedBackSide = mapBodyParts(backSide);

  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height="100%"
        viewBox="800 0 3200 6300"
        preserveAspectRatio="xMidYMid meet"
        style={{ transform: [{ scaleY: -1 }] }}
      >
        {(flip ? mappedFrontSide : mappedBackSide).map((part) => (
          <BodyPart
            key={part.id}
            data={part}
            interact={false}
            onSelect={() => {
              console.log("Placeholder for now");
            }}
          />
          // 👆 interact=false ensures no touch logic
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 200,
    paddingVertical: 8,
  },
});

export default BodyMapPreview;
