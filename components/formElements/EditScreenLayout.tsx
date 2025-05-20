import { KeyboardAvoidingView, ScrollView, Text } from "react-native";
import { LoadingIndicator } from "../LoadingIndicator";

import { commonStyles } from "@/styles/commonStyles";

type EditScreenLayoutProps = {
  title?: string;
  loading?: boolean;
  children: React.ReactNode;
};

export const EditScreenLayout = ({ title, loading, children }: EditScreenLayoutProps) => {
  return loading ? (
    <LoadingIndicator />
  ) : (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={commonStyles.container}>
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
