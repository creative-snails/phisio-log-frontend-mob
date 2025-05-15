import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors } from "@/styles/commonStyles";

type LoadingIndicatorProps = {
  message?: string;
  size?: "small" | "large";
  color?: string;
};

export const LoadingIndicator = ({
  message = "Saving...",
  size = "large",
  color = `${colors.secondary}`,
}: LoadingIndicatorProps) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size={size} color={color} />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 20,
    marginTop: 10,
  },
});
