import React from "react";
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "large" | "default";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CustomButton: React.FC<ButtonProps> = ({
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
    variant === "tertiary" ? styles.baseNoShadow : styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = {
    color: variant === "tertiary" ? "#000" : "#fff",
    textDecorationLine: variant === "tertiary" ? ("underline" as const) : ("none" as const),
  };

  return (
    <TouchableOpacity
      style={combinedStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color={textStyles.color} />
      ) : (
        <Text style={[styles.text, textStyles, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    margin: 4,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  baseNoShadow: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    margin: 4,
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
  default: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
