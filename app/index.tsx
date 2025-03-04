import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>index</Text>
      </View>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
