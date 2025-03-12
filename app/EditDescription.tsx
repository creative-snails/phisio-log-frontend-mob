import { useEffect, useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

const EditDescription = ({ data }: { data: string }) => {
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    try {
      const parsedData = JSON.parse(data);
      setDescription(parsedData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [data]);

  const handleSave = () => {
    if (description.trim().length < 10) {
      if (Platform.OS === "web") {
        window.alert("Description must be at least 10 characters long!");
      } else {
        Alert.alert("Description must be at least 10 characters long");
      }
      return;
    }
    // Save
    console.log("Saved description:", description);
  };

  return (
    <View>
      <Text style={styles.title}>Edit Description</Text>
      <TextInput style={styles.textInput} multiline={true} value={description} onChangeText={setDescription} />
      <Pressable style={styles.saveBtn} onPress={handleSave}>
        <Text>Save</Text>
      </Pressable>
      <Pressable style={styles.saveBtn} onPress={router.back}>
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  saveBtn: {
    alignItems: "center",
    backgroundColor: "#FBDABB",
    borderRadius: 10,
    justifyContent: "center",
    marginHorizontal: "auto",
    marginTop: 10,
    paddingVertical: 5,

    width: 100,
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    height: 100,
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: "auto",
    padding: 16,
  },
});

export default EditDescription;
