import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="BodyMap" options={{ headerShown: true }} />
      <Stack.Screen name="HealthRecordForm" options={{ headerShown: true }} />
      <Stack.Screen
        name="EditDescription"
        options={{ title: "Edit Description", headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name="EditSymptoms"
        options={{ title: "Edit Symptoms", headerShown: true, presentation: "formSheet" }}
      />
    </Stack>
  );
};

export default RootLayout;
