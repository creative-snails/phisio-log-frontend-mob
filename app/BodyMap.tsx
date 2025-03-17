import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  GestureEvent,
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";
import Svg from "react-native-svg";
import BodyPart from "./BodyPart";

import { backSide, frontSide } from "@/services/bodyParts";

const BodyMap = () => {
  const [scale, setScale] = useState(1);

  const onPinchEvent = (event: GestureEvent<PinchGestureHandlerEventPayload>) => {
    setScale(event.nativeEvent.scale);
  };

  const onPinchStateChange = (event: GestureEvent<PinchGestureHandlerEventPayload>) => {
    if (event.nativeEvent.state === State.END) setScale(event.nativeEvent.scale);
  };
  const [flip, setFlip] = useState(true);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <PinchGestureHandler onGestureEvent={onPinchEvent} onHandlerStateChange={onPinchStateChange}>
          <Svg
            width="90%"
            height="720"
            viewBox="870 500 3000 5000"
            preserveAspectRatio="xMidYMid meet"
            style={{ transform: [{ scale }, { scaleX: 1 }, { scaleY: -1 }] }}
          >
            {flip
              ? frontSide.map((part) => <BodyPart key={part.id} data={part} />)
              : backSide.map((part) => <BodyPart key={part.id} data={part} />)}
          </Svg>
        </PinchGestureHandler>
        <TouchableOpacity style={styles.button} onPress={() => setFlip((prev) => !prev)}>
          <Text style={{ color: "#fff" }}>Flip</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
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
