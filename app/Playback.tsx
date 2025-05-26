// app/playback.tsx
import React, { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function PlaybackScreen() {
  const { recordingURI } = useLocalSearchParams<{ recordingURI?: string }>();
  const router = useRouter();

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
        if ("isPlaying" in status && !status.isPlaying) {
          setIsPlaying(false);
          newSound.unloadAsync();
          setSound(null);
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
        /* eslint-disable jsx-a11y/media-has-caption */
        <audio controls src={recordingURI} />
      ) : (
        <Button title={isPlaying ? "Stop Playback" : "Play Recording"} onPress={isPlaying ? stopSound : playSound} />
      )}
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
});
