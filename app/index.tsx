import { Button, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { CustomButton } from "@/components/Button";
import { ROUTES } from "@/utils/constants";

const App = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Button title="Body Map" onPress={() => router.push(`/${ROUTES.BODY_MAP}`)} />
      <Button title="Health Record" onPress={() => router.push(`/${ROUTES.HEALTH_RECORD}`)} />
      <CustomButton
        title="Test"
        onPress={() => {
          console.log("Working");
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: 40,
    justifyContent: "center",
  },
});
