import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface ConfirmHabitModalProps {
  visible: boolean;
  habitName?: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function ConfirmHabitModal({
  visible,
  habitName,
  onClose,
  onConfirm,
}: ConfirmHabitModalProps) {
  const [loading, setLoading] = useState(false);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/40 items-center justify-center px-6">
        <View className="w-full rounded-3xl overflow-hidden">
          <LinearGradient
            colors={["#2EC6CB", "#2E76AB"]}
            className="p-6"
          >
            <Pressable
              onPress={onClose}
              className="absolute right-4 top-4 z-10"
            >
              <Icon name="close" size={26} color="#fff" />
            </Pressable>

            <View className="items-center mt-6">
              <Icon name="sparkles-outline" size={48} color="#fff" />

              <Text className="text-white text-2xl font-outfit-bold mt-4">
                Habit completed?
              </Text>

              <Text className="text-white/90 text-lg mt-3 text-center">
                Are you sure you want to confirm{"\n"}
                <Text className="font-outfit-semibold">{habitName}</Text>?
              </Text>

              <Pressable
                disabled={loading}
                onPress={async () => {
                  setLoading(true);
                  await onConfirm();
                  setLoading(false);
                }}
                className="mt-6 rounded-xl overflow-hidden"
              >
                <LinearGradient
                  colors={["#C1ECFF", "#FBFDFE"]}
                  className="py-4 px-6 items-center"
                >
                  <Text className="text-[#2E76AB] text-xl font-outfit-semibold">
                    {loading ? "Saving..." : "Yes, I did it! 🔥"}
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}
