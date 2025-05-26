import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Importing the AudioRecorder + PlaybackScreen component from the same directory.
import AudioRecorder from "./Audio-Recorder";
import PlaybackScreen from "./PlaybackScreen";

type RootStackParamList = {
  Recorder: undefined;
  Playback: { recordingURI: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Audio() {
  // Simply renders the AudioRecorder component.
  return (
    <Stack.Navigator initialRouteName="Recorder">
      <Stack.Screen name="Recorder" component={AudioRecorder} />
      <Stack.Screen name="Playback" component={PlaybackScreen} />
    </Stack.Navigator>
  );
}
