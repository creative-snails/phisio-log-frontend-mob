import { useEffect, useRef, useState } from "react";
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

import CustomButton from "@/components/CustomButton";
import { backSide, frontSide } from "@/services/bodyParts";
import useAppStore from "@/store/useAppStore";

const BodyMap: React.FC = () => {
  // State for front/back view toggle
  const [flip, setFlip] = useState(true);
  // States from zoom and pan transformations
  // const [size, setSize] = useState(initialSize);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  // States to disable interaction during gestures
  const [isZooming, setIsZooming] = useState(false);
  const [isPanning, setIsPanning] = useState(false);

  // Refs for gesture handlers
  const pinchRef = useRef(null);
  const panRef = useRef(null);
  // Refs to remember previous gesture states
  const lastScale = useRef(1);
  const lastOffset = useRef({ x: 0, y: 0 });

  //Placeholder for if symptom is empty
  const symptomPlaceholder = { name: "unknown", startDate: new Date(), affectedParts: { key: "head", state: 2 } };

  //For importing symptom state
  const { healthRecord, currentSymptomIndex, updateCurrentSymptom } = useAppStore();
  const currentSymptom = currentSymptomIndex !== null ? healthRecord.symptoms[currentSymptomIndex] : symptomPlaceholder;

  // Reset all transformations when flipping the body
  useEffect(() => {
    lastScale.current = 1;
    lastOffset.current = { x: 0, y: 0 };
    setTranslateX(0);
    setTranslateY(0);
    setScale(1);
  }, [flip]);

  const handlePinchEvent = (event: GestureEvent<PinchGestureHandlerEventPayload>) => {
    setScale(lastScale.current * event.nativeEvent.scale);
  };

  // Track pinch gesture states and store final scale
  const handlePinchStateChange = (event: GestureEvent<PinchGestureHandlerEventPayload>) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsZooming(true);
    } else if (event.nativeEvent.state === State.END) {
      setIsZooming(false);
      lastScale.current = scale;
    }
  };

  const handlePanEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    setTranslateX(lastOffset.current.x + event.nativeEvent.translationX);
    setTranslateY(lastOffset.current.y + event.nativeEvent.translationY);
  };

  // Track pan gesture states and store final position
  const handlePanStateChange = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsPanning(true);
    } else if (event.nativeEvent.state === State.END) {
      setIsPanning(false);
      lastOffset.current = { x: translateX, y: translateY };
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.symptomTitle}>{currentSymptom.name}</Text>
          <Text>Edit affected area</Text>
          <CustomButton
            title="Save"
            onPress={() => {
              //This needs to update the currentSymptom in the store
              updateCurrentSymptom(currentSymptom);
            }}
          />
        </View>

        <PinchGestureHandler
          ref={pinchRef}
          onGestureEvent={handlePinchEvent}
          onHandlerStateChange={handlePinchStateChange}
          simultaneousHandlers={panRef}
        >
          <PanGestureHandler
            ref={panRef}
            onGestureEvent={handlePanEvent}
            onHandlerStateChange={handlePanStateChange}
            simultaneousHandlers={pinchRef}
          >
            <Svg
              width="90%"
              height="720"
              viewBox="870 500 3000 5000"
              preserveAspectRatio="xMidYMid meet"
              style={{
                transform: [
                  { scale: 1 },
                  { scaleX: 1 },
                  { scaleY: -1 },
                  { translateX: translateX / scale }, // reduce pan speed as scale grows
                  { translateY: -translateY / scale }, // reduce pan speed as scale grows
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
  root: {
    flex: 1,
  },
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
  symptomTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center", // Vertically align items
    justifyContent: "space-between", // Space out the name and button
    width: "90%", // Give it some width to space things nicely
    marginTop: 12, // Optional: adds space below the header
    paddingHorizontal: 8,
  },
});
