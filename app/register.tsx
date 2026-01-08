import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  BackHandler,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true // bloqueia o botão voltar
      );

      return () => subscription.remove();
    }, [])
  );

  async function handleRegisterUser() {
    if (!name || !email || !password) {
      alert("Fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/register", {
        name,
        email,
        password,
      });

      const { user, token } = response.data;

      // Salvando o token
      await AsyncStorage.setItem("@token", token);

      // Configuração do axios
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error creating account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={["#C1ECFF", "#FBFDFE"]}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      className="flex-1 items-center px-6"
    >
      {/* Logo */}
      <MaskedView
        className="mt-28 mb-16"
        maskElement={
          <Text className="text-6xl font-outfit-bold mt-40 mb-28">
            HabitFlow
          </Text>
        }
      >
        <LinearGradient
          colors={["#216a79", "#67e8f9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text className="text-6xl font-outfit-bold opacity-0 mt-40 mb-28">
            HabitFlow
          </Text>
        </LinearGradient>
      </MaskedView>

      {/* Form */}
      <View className="w-full">
        <Text className="text-xl font-outfit-semibold text-[#216a79] mb-6 text-center">
          Create account
        </Text>

        {/* Name */}
        <TextInput
          placeholder="Name"
          placeholderTextColor="#6B7280"
          value={name}
          onChangeText={setName}
          className="w-full bg-white/70 border border-white/40 rounded-2xl px-5 py-4 mb-6 text-base"
        />

        {/* Email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          className="w-full bg-white/70 border border-white/40 rounded-2xl px-5 py-4 mb-6 text-base"
        />

        {/* Password */}
        <View className="relative mb-8">
          <TextInput
            placeholder="Password"
            placeholderTextColor="#6B7280"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            className="w-full bg-white/70 border border-white/40 rounded-2xl px-5 py-4 pr-12 text-base"
          />

          {password.length > 0 && (
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#216a79"
              />
            </Pressable>
          )}
        </View>

        {/* Button */}
        <TouchableOpacity
          activeOpacity={0.9}
          className="w-full rounded-2xl overflow-hidden"
          onPress={handleRegisterUser}
          disabled={loading}
        >
          <LinearGradient
            colors={["#216a79", "#67e8f9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 16 }}
            className="py-4 items-center"
          >
            <Text className="text-white font-outfit-bold text-base">
              {loading ? "Creating account..." : "Sign up"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Login */}
      <View className="flex-row mt-8">
        <Text className="text-gray-600">Already have an account?</Text>
        <Pressable onPress={() => router.replace("/login")}>
          <Text className="text-[#216a79] font-outfit-semibold ml-1">
            Sign in
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
