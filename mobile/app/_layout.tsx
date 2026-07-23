import { Stack, useRouter, useSegments } from "expo-router";
import { useVerifyToken } from "@/features/auth/hooks/useAuth";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";



export default function RootLayout() {
  console.log("RootLayout rendered");
  const { user, loading } = useVerifyToken();
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  console.log(user)
  console.log(loading)
  

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
  if (!isReady || loading) return;

  const inAuth = segments[0] === "(auth)";

  if (!user && !inAuth) {
    router.replace("/(auth)/login");
  }

  if (user && inAuth) {
    router.replace("/(tabs)");
  }
}, [isReady, loading, user, segments, router]);


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
        {/* AUTH FLOW */}
        <Stack.Screen name="(auth)" />

        {/* MAIN APP */}
        <Stack.Screen name="(tabs)" />

        {/* DETAILS */}
        <Stack.Screen
          name="appliances/[applianceId]"
          options={{
            headerShown: true,
            title: "Appliance Details",
          }}
        />
      </Stack>
    </>
  );
}