import { Modal, Pressable, Text, View } from "react-native";

interface ConfirmDeleteModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteModal({
  visible,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/70 items-center justify-center px-6">
        <View className="bg-white rounded-3xl p-6 w-full">
          <Text className="text-xl font-outfit-bold text-center mb-4">
            Delete habit?
          </Text>

          <Text className="text-center text-gray-600 mb-6">
            Are you sure you want to delete this habit?
            This action cannot be undone.
          </Text>

          <View className="flex-row justify-between">
            <Pressable
              onPress={onCancel}
              className="px-6 py-3 rounded-full bg-gray-200"
            >
              <Text>Cancel</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="px-6 py-3 rounded-full bg-red-500"
            >
              <Text className="text-white">Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
