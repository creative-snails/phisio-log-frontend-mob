import { ReactNode } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

import { colors, commonStyles } from "@/styles/commonStyles";

export const EditScreenLayout = (title: string, children: ReactNode, loading: boolean = false) => {
  if (loading) {
    return (
      <View style={commonStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secondary} />
        <Text style={commonStyles.loadingText}>Saving changes...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"}>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="always"
      >
        <Text style={commonStyles.title}>{title}</Text>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
