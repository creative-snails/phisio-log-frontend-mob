import { Button, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

const App = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Button title="Body Map" onPress={() => router.push("/BodyMap")} />
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
