import { Stack } from "expo-router";

import { ROUTES } from "@/types/constants";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name={`${ROUTES.BODY_MAP}`} options={{ title: "Body Map", headerShown: true }} />
      <Stack.Screen name={`${ROUTES.HEALTH_RECORD}`} options={{ title: "Health Record Form", headerShown: true }} />
      <Stack.Screen
        name={`${ROUTES.EDIT.DESCRIPTION}`}
        options={{ title: "Edit Description", headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name={`${ROUTES.EDIT.SYMPTOMS}`}
        options={{ title: "Edit Symptoms", headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name={`${ROUTES.EDIT.STATUS}`}
        options={{ title: "Edit Status", headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name={`${ROUTES.EDIT.TREATMENTS}`}
        options={{ title: "Edit Treatments", headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name={`${ROUTES.EDIT.CONSULTATIONS}`}
        options={{ title: "Edit Medical Consultations", headerShown: true, presentation: "formSheet" }}
      />
    </Stack>
  );
};

export default RootLayout;
