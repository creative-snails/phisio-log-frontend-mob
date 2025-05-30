import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { CustomButton } from "@/components/CustomButton";
import { ROUTES } from "@/utils/constants";

const App = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <CustomButton title="Body Map" onPress={() => router.push(`/${ROUTES.BODY_MAP}`)} />
      <CustomButton title="Health Record" onPress={() => router.push(`/${ROUTES.HEALTH_RECORD}`)} />
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
