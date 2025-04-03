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
        name="EditCurrentCondition"
        options={{ title: "Edit Current Condition", headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name="EditTreatments"
        options={{ title: "Edit Treatments", headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name="EditConsultations"
        options={{ title: "Edit Medical Consultations", headerShown: true, presentation: "formSheet" }}
      />
    </Stack>
  );
};

export default RootLayout;
