import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

import { colors, commonStyles } from "@/styles/commonStyles";

type EditScreenLayoutProps = {
  title: string;
  loading?: boolean;
  children?: React.ReactNode;
};

export const EditScreenLayout = ({ title, loading, children }: EditScreenLayoutProps) => {
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
