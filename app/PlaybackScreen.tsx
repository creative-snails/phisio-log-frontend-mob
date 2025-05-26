import React, { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { Audio } from "expo-av";

type RootStackParamList = {
  Recorder: undefined;
  Playback: { recordingURI: string };
};

type Props = StackScreenProps<RootStackParamList, "Playback">;

export default function PlaybackScreen({ route, navigation }: Props) {
  const { recordingURI } = route.params;
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSound = async () => {
    if (!recordingURI) return;

    try {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: recordingURI }, { shouldPlay: true });
      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if ("isPlaying" in status) {
          if (!status.isPlaying) {
            setIsPlaying(false);
            newSound.unloadAsync();
            setSound(null);
          }
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playback Screen</Text>
      {Platform.OS === "web" ? (
        /* eslint-disable-next-line jsx-a11y/media-has-caption */
        <audio controls src={recordingURI} />
      ) : (
        <Button title={isPlaying ? "Stop Playback" : "Play Recording"} onPress={isPlaying ? stopSound : playSound} />
      )}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
});
