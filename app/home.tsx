import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text
} from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    async function decideFlow() {
      try {
        const token = await AsyncStorage.getItem("token");
        const hasSeenOnboarding = await AsyncStorage.getItem(
          "hasSeenOnboarding"
        );

        // 🔐 Já está logado → dashboard
        if (token) {
          router.replace("/dashboard");
          return;
        }

        // 👀 Já viu onboarding → login
        if (hasSeenOnboarding === "true") {
          router.replace("/login");
          return;
        }

        // 🚀 Primeira vez → onboarding
        setShowOnboarding(true);
      } catch (error) {
        console.log("Erro ao decidir fluxo:", error);
        setShowOnboarding(true);
      } finally {
        setLoading(false);
      }
    }

    decideFlow();
  }, []);

  // ⏳ Loader inicial
  if (loading) {
    return (
      <LinearGradient
        colors={["#C1ECFF", "#FBFDFE"]}
        className="flex-1 items-center justify-center"
      >
        <ActivityIndicator size="large" color="#00879F" />
      </LinearGradient>
    );
  }

  // ⚠️ Segurança: nunca renderizar null
  if (!showOnboarding) {
    return (
      <LinearGradient
        colors={["#C1ECFF", "#FBFDFE"]}
        className="flex-1 items-center justify-center"
      >
        <ActivityIndicator size="large" color="#00879F" />
      </LinearGradient>
    );
  }

  // 🎉 Onboarding (Get Started)
  return (
    <LinearGradient
      colors={["#C1ECFF", "#FBFDFE"]}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      className="flex-1 items-center"
    >
      <Image
        source={require("../assets/images/habitFirstPage.png")}
        className="w-90 h-70 mt-32"
        resizeMode="contain"
      />

      <Text className="w-full text-left text-6xl text-[#005160] font-outfit-semibold leading-[56px] mt-20 px-10 mb-6">
        Manage your{"\n"}habits
      </Text>

      <Text className="text-2xl px-10 font-outfit text-[#005160]">
        Organize your habits, stay focused, and achieve your goals every day
      </Text>

      <Pressable
        onPress={async () => {
          await AsyncStorage.setItem("hasSeenOnboarding", "true");
          router.replace("/register");
        }}
        className="bg-[#00879F] px-6 py-4 mt-10 rounded-xl"
      >
        <Text className="text-white font-outfit-semibold text-center text-2xl">
          Get Started
        </Text>
      </Pressable>
    </LinearGradient>
  );
}
