import "dotenv/config";

export default {
  expo: {
    name: "HabitFlow",
    slug: "habitflow",
    version: "1.0.0",

    icon: "./assets/images/icon.png",
    scheme: "habitflow",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
    },

    android: {
      package: "com.lucasmanera.habitflow",
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      adaptiveIcon: {
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundColor: "#E6F4FE",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
    },

    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],

    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,

      eas: {
        projectId: "17b262fc-9bf3-48ac-83d9-6ca7b160e3ab",
      },
    },
  },
};
