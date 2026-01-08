import { api } from "@/services/api";
import { Habit } from "@/types/Habit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, BackHandler, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Icon from 'react-native-vector-icons/Ionicons';


export default function Dashboard() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function handleLogout() {
        await AsyncStorage.removeItem("@token");

        // Remove o token do axios
        delete api.defaults.headers.common.Authorization;

        // Reseta navegação
        router.replace("/login");
    }


    useFocusEffect(
        useCallback(() => {
            const subscription = BackHandler.addEventListener(
                "hardwareBackPress",
                () => true // bloqueia o botão voltar
            );

            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                // 1. Busca todos os hábitos
                const habitsRes = await api.get("/api/habits");
                const habitsList: Habit[] = habitsRes.data.data;
                setHabits(habitsList);

                // 2. Busca logs de cada hábito para o gráfico (Top 5 streaks)
                const chartPromises = habitsList.slice(0, 5).map(async (habit) => {
                    const logRes = await api.get(`/api/logs/${habit._id}`);
                    return {
                        value: logRes.data.streak || 0,
                        label: habit.name.substring(0, 6), // Abrevia nome
                        frontColor: '#67e8f9',
                    };
                });

                const results = await Promise.all(chartPromises);
                setChartData(results);
            } catch (error) {
                console.error("Dashboard error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    const habitLength = habits.length; // Aqui você pode filtrar por completados se tiver o campo

    return (
        <ImageBackground
            source={require("../assets/images/background.png")}
            className="flex-1"
            resizeMode="cover"
        >
            <ScrollView className="flex-1 bg-black/40" contentContainerStyle={{ paddingBottom: 40 }}>
                <View className="px-8 mt-16">
                    <View className="flex-row justify-end mt-4">
                        <Pressable
                            onPress={handleLogout}
                            className="w-10 h-10 rounded-full items-center justify-center bg-white/10"
                        >
                            <Icon name="log-out-outline" size={22} color="#FFFFFF" />
                        </Pressable>
                    </View>

                    <MaskedView
                        maskElement={<Text className="text-6xl font-outfit-bold mt-10">HabitFlow</Text>}
                    >
                        <LinearGradient
                            colors={["#fff", "#67e8f9"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text className="text-6xl font-outfit-bold mt-10 opacity-0">HabitFlow</Text>
                        </LinearGradient>
                    </MaskedView>

                    {loading ? (
                        <ActivityIndicator size="large" color="#67e8f9" className="mt-20" />
                    ) : (
                        <>
                            <View className="flex flex-row items-center mt-6 mb-10">
                                <Text className="text-white text-2xl font-outfit mr-3">
                                    <Text className="text-[#67e8f9]">{habitLength} habits</Text> tracked
                                </Text>
                                <Icon name="stats-chart-outline" size={24} color="#67e8f9" />
                            </View>

                            {/* GRÁFICO DE STREAKS */}
                            <View className="bg-white/10 p-4 rounded-3xl mb-8 mt-10 border border-white/20">
                                <Text className="text-white font-outfit-bold mb-4 ml-2">Current Streaks (Top 5)</Text>

                                {chartData.length > 0 ? (
                                    <BarChart
                                        key={`chart-${chartData.length}`}
                                        data={chartData}
                                        barWidth={35}
                                        noOfSections={3}
                                        barBorderRadius={6}
                                        height={150}
                                        initialSpacing={20}

                                        // --- REMOVEMOS showGradient PARA EVITAR O ERRO NATIVO ---
                                        // Em vez disso, usamos cores que combinam com o seu tema
                                        frontColor={'#67e8f9'}

                                        // Animação
                                        isAnimated
                                        animationDuration={800}

                                        // Eixos e Regras
                                        yAxisThickness={0}
                                        xAxisThickness={1}
                                        xAxisColor={'rgba(255, 255, 255, 0.2)'}
                                        rulesType="solid"
                                        rulesColor="rgba(255, 255, 255, 0.1)"

                                        showValuesAsTopLabel
                                        topLabelTextStyle={{ color: '#fff', fontSize: 12, fontFamily: 'outfit-bold' }}
                                        yAxisTextStyle={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}
                                        xAxisLabelTextStyle={{ color: '#fff', fontSize: 10, marginTop: 4 }}
                                    />
                                ) : (
                                    <View className="h-[150px] items-center justify-center">
                                        <ActivityIndicator color="#67e8f9" />
                                    </View>
                                )}
                            </View>


                            <Pressable
                                onPress={() => router.push("/habits")}
                                className="w-full mt-16 rounded-2xl overflow-hidden shadow-lg"
                            >
                                <LinearGradient
                                    colors={["#2EC6CB", "#2E76AB"]}
                                    className="flex-row items-center justify-center py-5"
                                >
                                    <Icon name="flame-outline" size={24} color="#F0FAFF" />
                                    <Text className="text-xl font-outfit-semibold ml-3 mt- text-[#F0FAFF]">
                                        Manage habits
                                    </Text>
                                </LinearGradient>
                            </Pressable>
                        </>
                    )}
                </View>
            </ScrollView>
        </ImageBackground>
    );
}