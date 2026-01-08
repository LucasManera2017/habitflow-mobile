import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Props = {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
};

export function CircularProgress({
  completed,
  total,
  size = 100,
  strokeWidth = 10,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = completed / total;
  const strokeDashoffset =
    circumference - circumference * progress;

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          stroke="#D5D7D7"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <Circle
          stroke="#00719F"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>

      {/* Texto central */}
      <View className="absolute items-center">
        <Text className="text-xl font-outfit-semibold">
          {completed}/{total}
        </Text>
        <Text className="text-xs text-black">
          habits
        </Text>
      </View>
    </View>
  );
}
