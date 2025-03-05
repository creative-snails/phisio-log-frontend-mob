import { StyleSheet, View } from "react-native";
import Svg from "react-native-svg";
import BodyPart from "./BodyPart";

import { frontSide } from "@/services/bodyParts";

const BodyMap = () => {
  return (
    <View style={styles.container}>
      <Svg
        width="90%"
        height="800"
        viewBox="870 500 3000 5000"
        preserveAspectRatio="xMidYMid meet"
        transform="scale(1, -1)"
      >
        {frontSide.map((part) => (
          <BodyPart key={part.id} data={part} />
        ))}
      </Svg>
    </View>
  );
};

export default BodyMap;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
