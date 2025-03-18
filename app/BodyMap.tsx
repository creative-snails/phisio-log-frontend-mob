import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  GestureEvent,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";
import Svg from "react-native-svg";
import BodyPart from "./BodyPart";

import { backSide, frontSide } from "@/services/bodyParts";

const BodyMap = () => {
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const pinchRef = useRef(null);
  const panRef = useRef(null);
  const lastScale = useRef(1);

  const onPinchEvent = (event: GestureEvent<PinchGestureHandlerEventPayload>) => {
    setScale(lastScale.current * event.nativeEvent.scale);
  };

  const onPinchStateChange = (event: GestureEvent<PinchGestureHandlerEventPayload>) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsZooming(true);
    } else if (event.nativeEvent.state === State.END) {
      setIsZooming(false);
      // setScale(event.nativeEvent.scale);
      lastScale.current = scale;
    }
  };

  const onPanEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    setTranslateX(event.nativeEvent.translationX);
    setTranslateY(event.nativeEvent.translationY);
  };

  const onPanStateChange = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsPanning(true);
    } else if (event.nativeEvent.state === State.END) {
      setIsPanning(false);
      setTranslateX(event.nativeEvent.translationX);
      setTranslateY(event.nativeEvent.translationY);
    }
  };

  const [flip, setFlip] = useState(true);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <PinchGestureHandler
          ref={pinchRef}
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
          simultaneousHandlers={panRef}
        >
          <PanGestureHandler
            ref={panRef}
            onGestureEvent={onPanEvent}
            onHandlerStateChange={onPanStateChange}
            simultaneousHandlers={pinchRef}
          >
            <Svg
              width="90%"
              height="720"
              viewBox="870 500 3000 5000"
              preserveAspectRatio="xMidYMid meet"
              style={{
                transform: [
                  { scale },
                  { scaleX: 1 },
                  { scaleY: -1 },
                  { translateX: translateX * 0.7 },
                  { translateY: -translateY * 0.7 },
                ],
              }}
            >
              {flip
                ? frontSide.map((part) => <BodyPart interact={!isZooming && !isPanning} key={part.id} data={part} />)
                : backSide.map((part) => <BodyPart interact={!isZooming && !isPanning} key={part.id} data={part} />)}
            </Svg>
          </PanGestureHandler>
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
