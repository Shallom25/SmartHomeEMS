import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import { THEME } from "@/constants/theme";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      return Alert.alert("Missing Fields", "Please fill all fields");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }

    try {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "Account created successfully");
        router.replace("/(tabs)");
      }, 1200);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView
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
              Create Account
            </Text>

            <Text
              style={{
                color: THEME.colors.textMuted,
                marginTop: THEME.spacing.sm,
                lineHeight: 22,
              }}
            >
              Track energy usage, analytics, and smart home insights in real time.
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
            {/* FULL NAME */}
            <InputField
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="John Doe"
            />

            {/* EMAIL */}
            <InputField
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              keyboardType="email-address"
            />

            {/* PASSWORD */}
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
            />

            {/* CONFIRM PASSWORD */}
            <InputField
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
              secureTextEntry
            />

            {/* BUTTON */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
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
                    fontWeight: THEME.fontWeight.bold,
                  }}
                >
                  {loading ? "Creating Account..." : "Create Account"}
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
            }}
          >
            <Text style={{ color: THEME.colors.textMuted }}>
              Already have an account?
            </Text>

            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text
                style={{
                  color: THEME.colors.textPrimary,
                  marginLeft: 6,
                  fontWeight: THEME.fontWeight.semibold,
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

/* 🔥 Reusable Input Component */
function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
}: any) {
  return (
    <View style={{ marginBottom: THEME.spacing.md }}>
      <Text
        style={{
          color: THEME.colors.textSecondary,
          marginBottom: THEME.spacing.sm,
          fontSize: THEME.fontSize.sm,
        }}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
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
  );
}