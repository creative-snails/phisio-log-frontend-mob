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
import { Picker } from "@react-native-picker/picker";
import { updateHealthRecord } from "./api";
import BodyPart from "./BodyPart";

import CustomButton from "@/components/CustomButton";
import { backSide, bodyPartData, frontSide } from "@/services/bodyParts";
import useAppStore from "@/store/useAppStore";
import { handleDeselect } from "@/utils/bodyMapDeselect";
import { handleSaveSymptom } from "@/utils/bodyMapSave";
import { Symptom } from "@/validation/healthRecordSchema";

type AffectedStatus = 1 | 2 | 3;

const BodyMap: React.FC = () => {
  // State for front/back view toggle
  const [flip, setFlip] = useState(true);
  // States from zoom and pan transformations
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  // States to disable interaction during gestures
  const [isZooming, setIsZooming] = useState(false);
  const [isPanning, setIsPanning] = useState(false);

  const [mappedFrontSide, setMappedFrontSide] = useState<bodyPartData[]>([]);
  const [mappedBackSide, setMappedBackSide] = useState<bodyPartData[]>([]);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<1 | 2 | 3>(1);

  //For importing symptom state
  const { healthRecord, currentSymptomIndex, updateCurrentSymptom, currentRecordIndex } = useAppStore();

  // Refs for gesture handlers
  const pinchRef = useRef(null);
  const panRef = useRef(null);
  // Refs to remember previous gesture states
  const lastScale = useRef(1);
  const lastOffset = useRef({ x: 0, y: 0 });

  //Placeholder for if symptom is empty
  const symptomPlaceholder: Symptom = {
    name: "unknown",
    startDate: new Date(),
    affectedParts: [{ id: "head", status: 2 }],
  };

  let currentSymptom = symptomPlaceholder;
  if (currentSymptomIndex !== null) {
    currentSymptom = healthRecord.symptoms[currentSymptomIndex];
  }

  // Reset all transformations when flipping the body
  useEffect(() => {
    lastScale.current = 1;
    lastOffset.current = { x: 0, y: 0 };
    setTranslateX(0);
    setTranslateY(0);
    setScale(1);
  }, [flip]);

  useEffect(() => {
    const mapBodyParts = (base: bodyPartData[]) =>
      base.map((part) => {
        const match = currentSymptom.affectedParts.find((p) => p.id === part.id);

        return {
          ...part,
          isSelected: !!match,
          status: match ? match.status : part.status,
        };
      });

    setMappedFrontSide(mapBodyParts(frontSide));
    setMappedBackSide(mapBodyParts(backSide));
  }, [currentSymptom]);

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

  const onDeselect = () =>
    handleDeselect({
      selectedPartId,
      currentSymptom,
      updateCurrentSymptom,
      setSelectedPartId,
      healthRecord,
      updateHealthRecord,
      currentRecordIndex,
      currentSymptomIndex,
    });

  const handleSelectBodyPart = (id: string) => {
    setSelectedPartId(id);
    const updatedParts = [...currentSymptom.affectedParts];
    const index = updatedParts.findIndex((p) => p.id === id);

    if (index >= 0) {
      setSelectedStatus(updatedParts[index].status);
    } else {
      const newPart = { id, status: 1 as AffectedStatus };
      updatedParts.push(newPart);
      setSelectedStatus(1);
    }
    updateCurrentSymptom({ ...currentSymptom, affectedParts: updatedParts });
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.symptomTitle}>{currentSymptom.name}</Text>
          <Text>Edit affected area</Text>
          <CustomButton
            title="Save"
            onPress={async () => {
              await handleSaveSymptom({
                healthRecord,
                currentSymptom,
                currentSymptomIndex,
                currentRecordIndex,
                updateHealthRecord,
                updateCurrentSymptom,
                setSelectedPartId,
              });
            }}
          />
        </View>
        {selectedPartId && (
          <View style={styles.topRow}>
            <Text style={styles.topRowText}>Set status for {selectedPartId}:</Text>
            <Picker
              style={styles.dropdown}
              selectedValue={selectedStatus}
              onValueChange={(itemValue: 1 | 2 | 3) => {
                setSelectedStatus(itemValue);
                const updatedParts = [...currentSymptom.affectedParts];
                const index = updatedParts.findIndex((p) => p.id === selectedPartId);
                if (index >= 0) {
                  updatedParts[index].status = itemValue;
                }
                updateCurrentSymptom({ ...currentSymptom, affectedParts: updatedParts });
              }}
            >
              <Picker.Item label="Worsening" value={1} />
              <Picker.Item label="Improving" value={2} />
              <Picker.Item label="Healed" value={3} />
            </Picker>

            <CustomButton
              title="Deselect area"
              variant="tertiary"
              onPress={() => {
                onDeselect();
              }}
            />
          </View>
        )}

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
                ? mappedFrontSide.map((part) => (
                    <BodyPart
                      interact={!isZooming && !isPanning}
                      key={part.id}
                      data={part}
                      onSelect={handleSelectBodyPart}
                    />
                  ))
                : mappedBackSide.map((part) => (
                    <BodyPart
                      interact={!isZooming && !isPanning}
                      key={part.id}
                      data={part}
                      onSelect={handleSelectBodyPart}
                    />
                  ))}
            </Svg>
          </PanGestureHandler>
        </PinchGestureHandler>
        <TouchableOpacity style={styles.button} onPress={() => setFlip((prev) => !prev)}>
          <Text style={styles.flipText}>Flip</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 12,
    paddingHorizontal: 8,
  },
  topRow: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
  },
  topRowText: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  dropdown: {
    margin: "auto",
  },
  flipText: {
    color: "#fff",
  },
});
