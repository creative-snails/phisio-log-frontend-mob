import { Stack } from "expo-router";

import { ROUTES, SCREEN_LABELS } from "@/utils/constants";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name={`${ROUTES.BODY_MAP}`} options={{ title: SCREEN_LABELS.BODY_MAP, headerShown: true }} />
      <Stack.Screen
        name={`${ROUTES.HEALTH_RECORD}`}
        options={{ title: SCREEN_LABELS.HEALTH_RECORD, headerShown: true }}
      />
      <Stack.Screen
        name={`${ROUTES.EDIT.DESCRIPTION}`}
        options={{ title: SCREEN_LABELS.EDIT.DESCRIPTION, headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name={`${ROUTES.EDIT.SYMPTOMS}`}
        options={{ title: SCREEN_LABELS.EDIT.SYMPTOMS, headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name={`${ROUTES.EDIT.STATUS}`}
        options={{ title: SCREEN_LABELS.EDIT.STATUS, headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name={`${ROUTES.EDIT.TREATMENTS}`}
        options={{ title: SCREEN_LABELS.EDIT.TREATMENTS, headerShown: true, presentation: "formSheet" }}
      />
      <Stack.Screen
        name={`${ROUTES.EDIT.CONSULTATIONS}`}
        options={{ title: SCREEN_LABELS.EDIT.CONSULTATIONS, headerShown: true, presentation: "formSheet" }}
      />
    </Stack>
  );
};

export default RootLayout;
