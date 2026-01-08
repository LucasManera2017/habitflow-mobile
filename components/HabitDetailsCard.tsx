import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface HabitDetailsCardProps {
    visible: boolean;
    habitName?: string;
    description?: string;
    frequency?: "daily" | "weekly";
    streak?: number;
    onClose: () => void;
    onComplete: () => void;
    onDelete: () => void;
    onUpdate: (data: {
        name: string;
        description: string;
        frequency: "daily" | "weekly";
    }) => void;
}

export function HabitDetailsCard({
    visible,
    habitName,
    description,
    frequency,
    streak,
    onClose,
    onComplete,
    onDelete,
    onUpdate,
}: HabitDetailsCardProps) {
    const [editMode, setEditMode] = useState(false);

    const [name, setName] = useState(habitName ?? "");
    const [desc, setDesc] = useState(description ?? "");
    const [freq, setFreq] = useState<"daily" | "weekly">(
        frequency ?? "daily"
    );

    const original = useRef({
        name: habitName ?? "",
        desc: description ?? "",
        freq: frequency ?? "daily",
    });

    const descRef = useRef<TextInput>(null);

    useEffect(() => {
        setName(habitName ?? "");
        setDesc(description ?? "");
        setFreq(frequency ?? "daily");

        original.current = {
            name: habitName ?? "",
            desc: description ?? "",
            freq: frequency ?? "daily",
        };
    }, [habitName, description, frequency,]);

    function handleSave() {
        onUpdate({
            name,
            description: desc,
            frequency: freq,
        });
        setEditMode(false);
    }

    function handleCancelEdit() {
        setName(original.current.name);
        setDesc(original.current.desc);
        setFreq(original.current.freq);
        setEditMode(false);
    }

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 bg-black/80 items-center justify-center px-6">
                <View className="w-full rounded-3xl overflow-hidden">
                    <LinearGradient colors={["#C1ECFF", "#FBFDFE"]} className="p-6">

                        {/* HEADER ACTIONS */}
                        <View className="flex-row justify-between items-center">
                            <View className="flex flex-row gap-2">
                                <Pressable onPress={onDelete}>
                                    <Icon name="trash-outline" size={24} color="#c0392b" />
                                </Pressable>
                                {!editMode && (
                                    <Pressable onPress={() => setEditMode(true)} className="ml-2 p-1">
                                        <Icon name="pencil-sharp" size={20} color="#5D4037" />
                                    </Pressable>
                                )}
                            </View>
                            <Pressable onPress={onClose}>
                                <Icon name="close" size={26} color="#216a79" />
                            </Pressable>
                        </View>

                        <View className="mt-2">
                            {/* HABIT NAME */}
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                editable={editMode}
                                className="text-[#216a79] text-2xl font-outfit-bold text-center mb-4"
                            />

                            {/* DESCRIPTION SECTION */}
                            <View className="mb-5">
                                <Text className="text-[#26798a] text-base">
                                    <Text className="font-outfit-bold">Description: </Text>
                                    {!editMode && <Text className="font-outfit">{desc || "No description"}</Text>}
                                </Text>
                                {editMode && (
                                    <TextInput
                                        ref={descRef}
                                        value={desc}
                                        onChangeText={setDesc}
                                        multiline
                                        placeholder="Add a description..."
                                        className="text-[#26798a] bg-white/40 p-3 rounded-xl mt-2 font-outfit min-h-[60px]"
                                    />
                                )}
                            </View>

                            {/* FREQUENCY SECTION */}
                            <View className="mb-5">
                                <Text className="text-[#26798a] text-base">
                                    <Text className="font-outfit-bold">Frequency: </Text>
                                    {!editMode && <Text className="font-outfit capitalize">{freq}</Text>}
                                </Text>
                                {editMode && (
                                    <View className="flex-row gap-2 mt-3">
                                        {(["daily", "weekly"] as const).map((option) => (
                                            <Pressable
                                                key={option}
                                                onPress={() => setFreq(option)}
                                                className={`flex-1 py-2 rounded-xl border items-center ${freq === option ? "bg-[#2E76AB] border-[#2E76AB]" : "bg-white border-gray-200"}`}
                                            >
                                                <Text className={`text-xs font-outfit-bold capitalize ${freq === option ? "text-white" : "text-[#2E76AB]"}`}>
                                                    {option}
                                                </Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                )}
                            </View>

                            {/* STREAK SECTION */}
                            <View className="mb-5">
                                <Text className="text-[#26798a] text-base">
                                    <Text className="font-outfit-bold">Streak: </Text>
                                    <Text className="font-outfit">{streak} days</Text>
                                </Text>
                            </View>

                            {/* FOOTER ACTIONS */}
                            {editMode ? (
                                <View className="mt-2 gap-3">
                                    <Pressable onPress={handleSave} className="rounded-xl overflow-hidden shadow-sm">
                                        <LinearGradient colors={["#2E76AB", "#2EC6CB"]} className="py-4 items-center">
                                            <Text className="text-white text-lg font-outfit-semibold">Save changes</Text>
                                        </LinearGradient>
                                    </Pressable>
                                    <Pressable onPress={handleCancelEdit}>
                                        <Text className="text-center text-[#2E76AB] font-outfit py-2">Cancel editing</Text>
                                    </Pressable>
                                </View>
                            ) : (
                                <Pressable onPress={onComplete} className="mt-2 rounded-xl overflow-hidden shadow-sm">
                                    <LinearGradient colors={["#2E76AB", "#2EC6CB"]} className="py-4 items-center">
                                        <Text className="text-white text-xl font-outfit-semibold">Mark as Completed</Text>
                                    </LinearGradient>
                                </Pressable>
                            )}
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
}