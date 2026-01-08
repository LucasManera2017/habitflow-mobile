import { api } from "./api";

export async function getHabitById(habitId: string) {
  const response = await api.get(`/api/habits/${habitId}`);
  return response.data; 
}

export async function markHabitAsCompleted(habitId: string) {
  const response = await api.post(`/api/logs/${habitId}`);
  return response.data; 
}

export async function getHabitStreak(habitId: string) {
  const response = await api.get(`/api/logs/${habitId}/streak`);
  return response.data; 
}
