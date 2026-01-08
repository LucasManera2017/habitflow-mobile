import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface HabitCardProps {
  name: string;
  frequency: string;
  streak: number;
  onPress: () => void;
}

export function HabitCard({ name, frequency, streak, onPress }: HabitCardProps) {
  return (
    <Pressable onPress={onPress} className="mb-6">
      <View className="rounded-3xl overflow-hidden shadow-xl">
        <LinearGradient
          colors={["#2E96AB", "#2EC6CB", "#2E76AB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-6"
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white text-2xl font-outfit-semibold mb-1">
                {name}
              </Text>

              <Text className="text-white/80 font-outfit text-base">
                {frequency}
              </Text>
            </View>

            <View className="items-center">
              <Icon name="flame-outline" size={28} color="#fff" />
              <Text className="text-white font-outfit-semibold mt-1">
                {streak} days
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  );
}
