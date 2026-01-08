import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface NewHabitCardProps {
    visible: boolean;
    onClose: () => void;
    onCreate: (data: {
        name: string;
        description: string;
        frequency: "daily" | "weekly";
    }) => void;
}

export function NewHabitCard({
    visible,
    onClose,
    onCreate,
}: NewHabitCardProps) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [freq, setFreq] = useState<"daily" | "weekly">("daily");

    function handleCreate() {
        if (!name.trim()) return;

        onCreate({
            name: name.trim(),
            description: desc.trim(),
            frequency: freq,
        });

        // reset after create
        setName("");
        setDesc("");
        setFreq("daily");
    }

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 bg-black/80 items-center justify-center px-6">
                <View className="w-full rounded-3xl overflow-hidden">
                    <LinearGradient colors={["#C1ECFF", "#FBFDFE"]} className="p-6">

                        {/* HEADER */}
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-[#133c44] text-3xl font-outfit-bold">
                                New Habit
                            </Text>

                            <Pressable onPress={onClose}>
                                <Icon name="close" size={26} color="#216a79" />
                            </Pressable>
                        </View>

                        {/* HABIT NAME */}
                        <View className="mb-5">
                            <Text className="text-[#26798a] text-base font-outfit-bold">
                                Habit Name
                            </Text>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                multiline
                                placeholder="Drink 4 liters of water per day."
                                className="text-[#26798a] bg-white/40 p-3 rounded-xl mt-2 font-outfit min-h-[30px]"
                            />
                        </View>


                        {/* DESCRIPTION */}
                        <View className="mb-5">
                            <Text className="text-[#26798a] text-base font-outfit-bold">
                                Description
                            </Text>

                            <TextInput
                                value={desc}
                                onChangeText={setDesc}
                                multiline
                                placeholder="Try to consume the 4 liters..."
                                className="text-[#26798a] bg-white/40 p-3 rounded-xl mt-2 font-outfit min-h-[60px]"
                            />
                        </View>

                        {/* FREQUENCY */}
                        <View className="mb-6">
                            <Text className="text-[#26798a] text-base font-outfit-bold mb-2">
                                Frequency
                            </Text>

                            <View className="flex-row gap-2">
                                {(["daily", "weekly"] as const).map((option) => (
                                    <Pressable
                                        key={option}
                                        onPress={() => setFreq(option)}
                                        className={`flex-1 py-3 rounded-xl border items-center ${freq === option
                                                ? "bg-[#2E76AB] border-[#2E76AB]"
                                                : "bg-white border-gray-200"
                                            }`}
                                    >
                                        <Text
                                            className={`text-sm font-outfit-bold capitalize ${freq === option ? "text-white" : "text-[#2E76AB]"
                                                }`}
                                        >
                                            {option}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* CREATE BUTTON */}
                        <Pressable
                            onPress={handleCreate}
                            className="rounded-xl overflow-hidden shadow-sm"
                        >
                            <LinearGradient
                                colors={["#2E76AB", "#2EC6CB"]}
                                className="py-4 items-center"
                            >
                                <Text className="text-white text-xl font-outfit-semibold">
                                    Create habit
                                </Text>
                            </LinearGradient>
                        </Pressable>

                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
}
