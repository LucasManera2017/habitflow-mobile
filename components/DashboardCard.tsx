import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CircularProgress } from "./CircularProgress";

interface HabitsProps {
  title: string;
  message: string;
  streak: boolean;
}

export function DashboardCard({ title, message, streak }: HabitsProps) {
  return (
    <View className="rounded-3xl overflow-hidden mb-10 w-[92%] mx-auto shadow-xl">
      <LinearGradient
        colors={["#F0FAFF", "#CFF0FB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-5"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-[1.7rem] text-[#013B46] font-outfit-semibold mb-2">
              {title}
            </Text>

            <Text className="font-outfit text-lg text-[#355F6B]">
              {message}
            </Text>
          </View>

          <View>
            {streak ? (
              <CircularProgress completed={4} total={5} />
            ) : (
              <Icon
                name="close-circle-outline"
                size={100}
                color="#FBBF24"
              />
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
