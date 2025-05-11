import { ScrollView, Text, View } from "react-native";

import { commonStyles } from "@/styles/commonStyles";

interface EditScreenLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const EditScreenLayout = ({ title, children }: EditScreenLayoutProps) => (
  <ScrollView>
    <Text style={commonStyles.title}>{title}</Text>
    <View>{children}</View>
  </ScrollView>
);
