import { LinearGradient } from "expo-linear-gradient";
import { Modal, Pressable, Text, View } from "react-native";

interface FeedbackModalProps {
  visible: boolean;
  message: string | null;
  onClose: () => void;
}

export function FeedbackModal({
  visible,
  message,
  onClose,
}: FeedbackModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/70 items-center justify-center px-6">
        <View className="w-full rounded-3xl overflow-hidden">
          <LinearGradient
            colors={["#2E76AB", "#2EC6CB"]}
            className="p-8 items-center"
          >
            <Text className="text-white text-2xl font-outfit-bold text-center">
              {message}
            </Text>

            <Pressable
              onPress={onClose}
              className="mt-6 px-8 py-3 bg-white rounded-full"
            >
              <Text className="text-[#2E76AB] font-outfit-semibold text-lg">
                OK
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}
