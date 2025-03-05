import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg from "react-native-svg";
import BodyPart from "./BodyPart";

import { backSide, frontSide } from "@/services/bodyParts";

const BodyMap = () => {
  const [flip, setFlip] = useState(true);
  return (
    <View style={styles.container}>
      <Svg
        width="90%"
        height="720"
        viewBox="870 500 3000 5000"
        preserveAspectRatio="xMidYMid meet"
        transform="scale(1, -1)"
      >
        {flip
          ? frontSide.map((part) => <BodyPart key={part.id} data={part} />)
          : backSide.map((part) => <BodyPart key={part.id} data={part} />)}
      </Svg>
      <TouchableOpacity style={styles.button} onPress={() => setFlip((prev) => !prev)}>
        <Text style={{ color: "#fff" }}>Flip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BodyMap;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#666",
    borderColor: "#ff0000",
    borderRadius: 20,
    borderWidth: 0.8,
    color: "#fff",
    flex: 1,
    height: 50,
    justifyContent: "space-between",
    maxHeight: 50,
    padding: 14,
    width: 60,
  },
  container: {
    alignItems: "center",

    flex: 1,
    justifyContent: "center",
  },
});
