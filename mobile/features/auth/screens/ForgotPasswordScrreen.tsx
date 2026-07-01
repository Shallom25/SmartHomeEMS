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

import { THEME } from "@/constants/theme";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      return Alert.alert("Missing Email", "Please enter your email address");
    }

    try {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          "Reset Link Sent",
          "Check your email for instructions"
        );

        router.replace("/(auth)/login");
      }, 1200);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Unable to process request");
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
          <View style={{ marginBottom: THEME.spacing.xl }}>
            <Text
              style={{
                color: THEME.colors.textPrimary,
                fontSize: THEME.fontSize.sm,
                fontWeight: THEME.fontWeight.semibold,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Smart EMS
            </Text>

            <Text
              style={{
                color: THEME.colors.textPrimary,
                fontSize: THEME.fontSize.display,
                fontWeight: THEME.fontWeight.heavy,
                marginTop: THEME.spacing.sm,
              }}
            >
              Reset Password
            </Text>

            <Text
              style={{
                color: THEME.colors.textMuted,
                marginTop: THEME.spacing.sm,
                lineHeight: 22,
              }}
            >
              Enter your email address and we’ll send a password reset link.
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

            {/* BUTTON */}
            <TouchableOpacity
              onPress={handleResetPassword}
              disabled={loading}
              style={{
                marginTop: THEME.spacing.md,
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
                    fontWeight: THEME.fontWeight.bold,
                  }}
                >
                  {loading ? "Sending Link..." : "Send Reset Link"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* FOOTER */}
          <View
            style={{
              alignItems: "center",
              marginTop: THEME.spacing.xl,
            }}
          >
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
              <Text
                style={{
                  color: THEME.colors.background,
                  fontWeight: THEME.fontWeight.semibold,
                }}
              >
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

export { ForgotPasswordScreen}