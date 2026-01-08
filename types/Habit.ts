export interface Habit {
  _id: string;
  name: string;
  description?: string;
  frequency: "daily" | "weekly";
  hourFrequency?: number;
  streak: number;
}
