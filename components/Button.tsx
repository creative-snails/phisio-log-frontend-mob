import React from "react";
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "large" | "default";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle; // allows passing custom button styles
  textStyle?: TextStyle; // allows passing custom text styles
}

export const AppButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "default",
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const combinedStyles = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style, // custom styles passed in
  ];

  const getTextColor = (v: string) => {
    if (v === "tertiary") {
      return "#000";
    } else {
      return "#fff";
    }
  };
  const textColor = getTextColor(variant);

  return (
    <TouchableOpacity
      style={combinedStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: "#007bff",
  },
  secondary: {
    backgroundColor: "#6c757d",
  },
  tertiary: {
    backgroundColor: "transparent",
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  default: {},
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
