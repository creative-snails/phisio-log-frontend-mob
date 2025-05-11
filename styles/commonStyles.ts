import { StyleSheet } from "react-native";

export const colors = {
  primary: "#FBDABB",
  secondary: "#d6abb6",
  tertiary: "#afd0e3",
  background: "#f5f5f5",
  black: "#000000",
  white: "#ffffff",
};

export const commonStyles = StyleSheet.create({
  btn: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderColor: colors.black,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "2px 2px 0px #000",
    justifyContent: "center",
    marginHorizontal: "auto",
    marginTop: 10,
    paddingVertical: 5,
    width: 100,
  },
  btnText: {
    color: colors.white,
    fontSize: 18,
  },
  container: {
    flex: 1,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: "auto",
    padding: 16,
    textAlign: "center",
  },
});
