import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import { LoadingIndicator } from "../LoadingIndicator";

import { commonStyles } from "@/styles/commonStyles";

type EditScreenLayoutProps = {
  title?: string;
  loading?: boolean;
  children: React.ReactNode;
};

export const EditScreenLayout = ({ title, loading, children }: EditScreenLayoutProps) => {
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"}>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="always"
      >
        {title && <Text style={commonStyles.title}>{title}</Text>}
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
