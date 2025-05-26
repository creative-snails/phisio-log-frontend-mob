import React, { useEffect, useState } from "react";
import { Alert, Animated, Button, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";

//type NavigationProp = StackNavigationProp<RootStackParamList, "Recorder">;

/*type RootStackParamList = {
  Recorder: undefined;
  Playback: { recordingURI: string };
};*/

export default function AudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null); // Keep track of the audio recording instance
  const [isRecording, setIsRecording] = useState(false); //Boolean value to track whether recording is in progress
  const [recordedURI, setRecordedURI] = useState<string | null>(null); //Stores URI of the recorded audio file
  const [hasPermission, setHasPermission] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  //const navigation = useNavigation<NavigationProp>();
  const router = useRouter();

  // Request microphone permissions.
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        Alert.alert("Permission Required", "Microphone access is needed to record audio.");
      } else {
        setHasPermission(true);
      }
    };
    getPermission();
  }, []);

  // Starts a new audio recording sessions.
  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start a high-quality recording session
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);

      setRecording(recording);
      setIsRecording(true);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  // Stop the recording session and saves the file URI.
  const stopRecording = async () => {
    console.log("Stopping recording..");
    if (!recording) return;

    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync(); // Finalize the recording.
      const uri = recording.getURI(); // Get the URI where the recording is saved.
      console.log("Recording stopped and stored at", uri);
      setRecordedURI(uri);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
    // Clear the recording instance.
    setRecording(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const playSound = async () => {
    if (!recordedURI) {
      console.log("No recording URI");
      return;
    }

    try {
      // If there's an existing sound playing, unload it first
      if (sound) {
        console.log("Unloading previous sound");
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      }

      console.log("Creating sound from URI:", recordedURI);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: recordedURI },
        { shouldPlay: false } // Start paused
      );

      setSound(newSound);
      setIsPlaying(true);

      console.log("Starting playback");
      await newSound.playAsync(); // Explicitly start playing

      newSound.setOnPlaybackStatusUpdate((status) => {
        if ("isPlaying" in status && !status.isPlaying) {
          console.log("Playback finished");
          setIsPlaying(false);
          newSound.unloadAsync();
          setSound(null);
        }
      });
    } catch (error) {
      console.error("Error playing sound: ", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  };

  const openAppSettings = () => {
    if (Platform.OS === "web") {
      Alert.alert("This feature is not supported on web.");
    } else {
      Linking.openSettings().catch(() => {
        Alert.alert("Unable to open settings.");
      });
    }
  };

  const blinkAnim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (isRecording) {
      const blink = Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false, //was true (remove warning sign in the console log - browser)
          }),
          Animated.timing(blinkAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false, //was true and was causing an issue to animation on moblie
          }),
        ])
      );
      blink.start();
      return () => {
        blink.stop();
      };
    } else {
      blinkAnim.setValue(0);
    }
  }, [isRecording]);

  return (
    // Visual button, text, colours.
    <View style={styles.container}>
      <Text style={styles.title}>Audio Recorder</Text>

      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.stopButton]}
        onPress={isRecording ? stopRecording : startRecording}
        disabled={!hasPermission}
      >
        <Text style={styles.buttonText}>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
      </TouchableOpacity>

      {isRecording && (
        <View style={styles.recordingContainer}>
          <Animated.View
            style={[
              styles.blinkingDot,
              { opacity: blinkAnim }, // animate opacity from 0 to 1
            ]}
          />
          <Text style={styles.recordingIndicator}>Recording in progress...</Text>
        </View>
      )}

      {recordedURI && (
        <TouchableOpacity
          style={styles.playButton}
          //onPress={() => navigation.navigate("Playback", { recordingURI: recordedURI })}
          onPress={() => router.push({ pathname: "/Playback", params: { recordingURI: recordedURI } })}
        >
          <Text style={styles.buttonText}>{isPlaying ? "Stop Playback" : "Play Recording"}</Text>
        </TouchableOpacity>
      )}

      {!hasPermission && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "red" }}>Microphone permissions is required. Please enable it in settings.</Text>
          <Button title="Open Settings" onPress={openAppSettings} />
        </View>
      )}

      {recordedURI && (
        <View style={{ marginTop: 20 }}>
          <Text>Recording saved at:</Text>
          <Text style={styles.uri}>{recordedURI}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  blinkingDot: {
    backgroundColor: "red",
    borderRadius: 6,
    height: 12,
    marginRight: 8,
    width: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  playButton: {
    alignItems: "center",
    backgroundColor: "#28a745",
    borderRadius: 8,
    marginTop: 10,
    padding: 12,
  },
  recordButton: {
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 8,
    marginTop: 10,
    padding: 12,
  },
  recordingContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  recordingIndicator: {
    color: "red",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  stopButton: {
    backgroundColor: "#FF3B30",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  uri: {
    color: "blue",
    fontSize: 12,
    marginTop: 4,
  },
});
