import { ScrollView, Text, View } from "react-native";

interface EditScreenLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const EditScreenLayout = ({ title, children }: EditScreenLayoutProps) => (
  <ScrollView>
    <Text>{title}</Text>
    <View>{children}</View>
  </ScrollView>
);
