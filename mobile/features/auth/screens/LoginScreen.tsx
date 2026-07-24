import { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useAuth } from "../hooks/authContext";
import { THEME } from "@/constants/theme";

const LoginScreen = () => {
    const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Missing Fields", "Please fill all fields");
    }

    try {
      setLoading(true);
        await login(email, password)
        Alert.alert("Login Successful", "Welcome back to Smart EMS");
        router.replace("/(tabs)");
    } catch (error) {
      setLoading(false);
      console.error("error login in",error)
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <SafeAreaProvider
      style={{ flex: 1, backgroundColor: THEME.colors.background }}
    >
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={[
          THEME.colors.background,
          "#0f172a",
          "#111827",
        ]}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: THEME.spacing.lg,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={{ marginBottom: THEME.spacing.xxl }}>
            <Text
              style={{
                color: THEME.colors.textPrimary,
                fontSize: THEME.fontSize.sm,
                fontWeight: THEME.fontWeight.semibold,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              SmartHome EMS
            </Text>

            <Text
              style={{
                color: THEME.colors.textPrimary,
                fontSize: THEME.fontSize.display,
                fontWeight: THEME.fontWeight.heavy,
                marginTop: THEME.spacing.sm,
              }}
            >
              Welcome Back
            </Text>

            <Text
              style={{
                color: THEME.colors.textMuted,
                fontSize: THEME.fontSize.md,
                marginTop: THEME.spacing.sm,
                lineHeight: 22,
              }}
            >
              Sign in to monitor your smart home energy analytics dashboard.
            </Text>
          </View>

          {/* FORM CARD */}
          <View
            style={{
              backgroundColor: THEME.colors.background,
              padding: THEME.layout.cardPadding,
              borderRadius: THEME.radius.xl,
              borderWidth: 1,
              borderColor: "#1e293b",
            }}
          >
            {/* EMAIL */}
            <View style={{ marginBottom: THEME.spacing.md }}>
              <Text
                style={{
                  color: THEME.colors.textSecondary,
                  marginBottom: THEME.spacing.sm,
                  fontSize: THEME.fontSize.sm,
                }}
              >
                Email Address
              </Text>

              <TextInput
                placeholder="example@email.com"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={{
                  backgroundColor: "#0f172a",
                  color: THEME.colors.textPrimary,
                  height: 56,
                  borderRadius: THEME.radius.lg,
                  paddingHorizontal: THEME.spacing.md,
                  borderWidth: 1,
                  borderColor: "#1e293b",
                }}
              />
            </View>

            {/* PASSWORD */}
            <View style={{ marginBottom: THEME.spacing.sm }}>
              <Text
                style={{
                  color: THEME.colors.textSecondary,
                  marginBottom: THEME.spacing.sm,
                  fontSize: THEME.fontSize.sm,
                }}
              >
                Password
              </Text>

              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#64748b"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{
                  backgroundColor: "#0f172a",
                  color: THEME.colors.textPrimary,
                  height: 56,
                  borderRadius: THEME.radius.lg,
                  paddingHorizontal: THEME.spacing.md,
                  borderWidth: 1,
                  borderColor: "#1e293b",
                }}
              />
            </View>

            {/* FORGOT PASSWORD */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot-password")}
              style={{
                alignSelf: "flex-end",
                marginTop: THEME.spacing.sm,
              }}
            >
              <Text
                style={{
                  color: THEME.colors.textPrimary,
                  fontSize: THEME.fontSize.sm,
                  fontWeight: THEME.fontWeight.semibold,
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* LOGIN BUTTON */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.9}
              style={{
                marginTop: THEME.spacing.lg,
                borderRadius: THEME.radius.xl,
                overflow: "hidden",
              }}
            >
              <LinearGradient
                colors={["#3D57FB", "#6D5EF9"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: 56,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: THEME.fontSize.md,
                    fontWeight: THEME.fontWeight.bold,
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* FOOTER */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: THEME.spacing.xl,
              flexWrap: "wrap",
            }}
          >
            <Text style={{ color: THEME.colors.textMuted }}>
              Don’t have an account?
            </Text>

            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text
                style={{
                  color: THEME.colors.textPrimary,
                  marginLeft: 6,
                  fontWeight: THEME.fontWeight.semibold,
                }}
              >
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

export { LoginScreen }