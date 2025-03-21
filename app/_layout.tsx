import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="BodyMap" options={{ title: "Body Map", headerShown: true }} />
      <Stack.Screen name="HealthRecordForm" options={{ title: "Health Record Form", headerShown: true }} />
      <Stack.Screen
        name="EditDescription"
        options={{ title: "Edit Description", headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name="EditSymptoms"
        options={{ title: "Edit Symptoms", headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name="EditStatus"
        options={{ title: "Edit Status", headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name="EditSeverity"
        options={{ title: "Edit Severity", headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name="EditImprovementStatus"
        options={{ title: "Edit Improvement Status", headerShown: true, presentation: "formSheet" }}
      />
    </Stack>
  );
};

export default RootLayout;
