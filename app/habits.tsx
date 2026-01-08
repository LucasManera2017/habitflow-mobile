import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModalProps";
import { ConfirmHabitModal } from "@/components/ConfirmHabitModal";
import { FeedbackModal } from "@/components/FeedbackModal";
import { HabitCard } from "@/components/HabitCard";
import { HabitDetailsCard } from "@/components/HabitDetailsCard";
import { NewHabitCard } from "@/components/newHabitCard";
import { api } from "@/services/api";
import {
  getHabitStreak,
  markHabitAsCompleted,
} from "@/services/habitService";
import { Habit } from "@/types/Habit";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNewHabitModal, setShowNewHabitModal] = useState(false);


  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true // bloqueia o botão voltar
      );

      return () => subscription.remove();
    }, [])
  );

  async function handleCreateHabit(data: {
    name: string;
    description: string;
    frequency: "daily" | "weekly";
  }) {
    try {
      const response = await api.post("/api/habits", data);

      const newHabit = response.data.data;

      setHabits((prev) => [...prev, newHabit]);

      setShowNewHabitModal(false);

      setFeedbackMessage("Habit created successfully! 🎉");
      setShowFeedback(true);

    } catch (error) {
      console.error("Erro ao criar hábito:", error);

      setFeedbackMessage("Failed to create habit 😢");
      setShowFeedback(true);
    }
  }

  useEffect(() => {
    async function loadHabits() {
      try {
        const response = await api.get("/api/habits");
        setHabits(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadHabits();
  }, []);

  return (
    <>
      {/* Background */}
      <LinearGradient
        colors={["#C1ECFF", "#FBFDFE"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-8 pt-20 mb-20">

          {/* Botão Voltar */}
          <Pressable
            onPress={() => router.replace("/dashboard")}
            className="w-14 h-14 rounded-full items-center justify-center bg-white/80 border border-white/40"
          >
            <Icon name="arrow-back-outline" size={24} color="#2E76AB" />
          </Pressable>

          <Text className="text-4xl font-outfit-bold text-[#2E76AB]">
            Your Habits
          </Text>

          {/* Botão Add */}
          <Pressable
            onPress={() => setShowNewHabitModal(true)}
            className="w-14 h-14 rounded-full items-center justify-center bg-[#2E76AB] shadow-xl"
          >
            <Icon name="add" size={30} color="#fff" />
          </Pressable>
        </View>


        {loading ? (
          <ActivityIndicator size="large" color="#2E76AB" />
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            {habits.map((habit) => (
              <HabitCard
                key={habit._id}
                name={habit.name}
                frequency={
                  habit.frequency === "daily"
                    ? "Daily"
                    : "Weekly"
                }
                streak={habit.streak}
                onPress={() => setSelectedHabit(habit)}
              />
            ))}
          </ScrollView>
        )}
      </LinearGradient>

      {/* Habit Details */}
      <HabitDetailsCard
        visible={!!selectedHabit}
        habitName={selectedHabit?.name}
        description={selectedHabit?.description}
        frequency={selectedHabit?.frequency}
        streak={selectedHabit?.streak}
        onClose={() => setSelectedHabit(null)}
        onComplete={() => setShowConfirm(true)}
        onDelete={() => setShowDeleteConfirm(true)}
        onUpdate={async (data) => {
          if (!selectedHabit) return;
          try {
            await api.put(`/api/habits/${selectedHabit._id}`, data);
            setHabits((prev) =>
              prev.map((habit) =>
                habit._id === selectedHabit._id ? { ...habit, ...data } : habit
              )
            );
            // Atualiza o estado do habit selecionado para refletir no card atual
            setSelectedHabit(prev => prev ? { ...prev, ...data } : null);
          } catch (e) { console.log(e) }
        }}
      />


      {/* Confirm Modal */}
      <ConfirmHabitModal
        visible={showConfirm}
        habitName={selectedHabit?.name}
        onClose={() => setShowConfirm(false)}
        onConfirm={async () => {
          if (!selectedHabit) return;

          try {
            const result = await markHabitAsCompleted(selectedHabit._id);
            setFeedbackMessage(result.message);
            setShowFeedback(true);

            const streakResponse = await getHabitStreak(selectedHabit._id);

            setHabits((prev) =>
              prev.map((habit) =>
                habit._id === selectedHabit._id
                  ? { ...habit, streak: streakResponse.streak }
                  : habit
              )
            );
          } catch {
            setFeedbackMessage("Something went wrong 😢");
            setShowFeedback(true);
          } finally {
            setShowConfirm(false);
            setSelectedHabit(null);
          }
        }}
      />

      {/* Feedback */}
      <FeedbackModal
        visible={showFeedback}
        message={feedbackMessage}
        onClose={() => setShowFeedback(false)}
      />

      <ConfirmDeleteModal
        visible={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={async () => {
          if (!selectedHabit) return;
          try {
            await api.delete(`/api/habits/${selectedHabit._id}`);

            // REMOVE da lista e FECHA tudo
            setHabits((prev) => prev.filter((h) => h._id !== selectedHabit._id));

            setShowDeleteConfirm(false);
            setSelectedHabit(null);
            setFeedbackMessage("Habit deleted successfully!");
            setShowFeedback(true);

          } catch (error) {
            console.error("Erro ao deletar hábito:", error);

            setFeedbackMessage("Failed to delete habit 😢");
            setShowFeedback(true);
          }
        }
        }
      />

      <NewHabitCard
        visible={showNewHabitModal}
        onClose={() => setShowNewHabitModal(false)}
        onCreate={handleCreateHabit}
      />

    </>
  );
}
