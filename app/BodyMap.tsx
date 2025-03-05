import { StyleSheet, Text, View } from "react-native";

const BodyMap = () => {
  return (
    <View style={styles.container}>
      <Text>BodyMap</Text>
    </View>
  );
};

export default BodyMap;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
