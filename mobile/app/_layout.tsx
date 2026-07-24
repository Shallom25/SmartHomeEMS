import { Stack, Redirect, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth  } from "@/features/auth/hooks/authContext";

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();

  // don't decide anything until we know if there's a logged-in user
  if (loading) {
    return null; // or a splash/loading screen component
  }

  const inAuth = segments[0] === "(auth)";

  if (!user && !inAuth) {
    return <Redirect href="/(auth)/login" />;
  }

  if (user && inAuth) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "#050816" },
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="appliances/[applianceId]"
          options={{ headerShown: true, title: "Appliance Details" }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}