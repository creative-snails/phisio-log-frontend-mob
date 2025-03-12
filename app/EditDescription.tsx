import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

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

  return (
    <View>
      <Text>Edit Description</Text>
      <TextInput value={description} onChangeText={setDescription} />
    </View>
  );
};

export default EditDescription;
