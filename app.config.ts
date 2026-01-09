import "dotenv/config";

export default {
  expo: {
    name: "HabitFlow",
    slug: "habitflow",
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
    },
  },
};
