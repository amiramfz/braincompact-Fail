import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import Svg, { Polyline } from "react-native-svg";
import BoxGame from "./BoxGame";

const { width: W, height: H } = Dimensions.get("window");
const h = H ; // ارتفاع فضای بازی
const w = W * 0.94; // عرض فضای بازی

export default function SnakePath({ route, navigation }) {
  const { hardnes } = route.params;

  const ballPosition = useRef(
    new Animated.ValueXY({ x: -176, y: -300 })
  ).current;

  // مقیاس‌دهی نقاط مسیر به فضای بازی
  const scalePath = (path) => {
    return path.map((point) => ({
      x: (point.x / W) * w,
      y: (point.y / H) * h,
    }));
  };

  const mazePath = scalePath([
    { x: -176, y: -300 },
    { x: -176, y: -170 },
    { x: -145, y: -170 },
    { x: -145, y: -280 },
    { x: -120, y: -280 },
    { x: -120, y: -240 },
    { x: -90, y: -240 },
    { x: -90, y: -280 },
    { x: -60, y: -280 },
    { x: -60, y: -230 },
    { x: -30, y: -230 },
    { x: -30, y: -280 },
    { x: 150, y: -280 },
    { x: 160, y: -265 },
    { x: 165, y: -100 },
    { x: 150, y: -85 },
    { x: 137, y: -100 },
    { x: 137, y: -180 },
    { x: 120, y: -220 },
    { x: 80, y: -250 },
    { x: 15, y: -260 },
    { x: 15, y: -235 },
    { x: 85, y: -210 },
    { x: 100, y: -190 },
    { x: 110, y: -70 },
    { x: 130, y: -60 },
    { x: 130, y: -40 },
    { x: 110, y: -30 },
    { x: 110, y: -10 },
    { x: 120, y: -10 },
    { x: 150, y: -5 },
    { x: 150, y: 20 },
    { x: 115, y: 20 },
    { x: 115, y: 45 },
    { x: 150, y: 50 },
    { x: 150, y: 75 },
    { x: 90, y: 80 },
    { x: 80, y: 65 },
    { x: 80, y: -170 },
    { x: 65, y: -190 },
    { x: 50, y: -200 },
    { x: -110, y: -200 },
    { x: -110, y: -175 },
    { x: 40, y: -175 },
    { x: 40, y: -120 },
    { x: 25, y: -130 },
    { x: 10, y: -145 },
    { x: -5, y: -130 },
    { x: -16, y: -120 },
    { x: -30, y: -130 },
    { x: -45, y: -145 },
    { x: -60, y: -130 },
    { x: -60, y: 20 },
    { x: -35, y: 25 },
    { x: -30, y: -80 },
    { x: -5, y: -85 },
    { x: 0, y: 20 },
    { x: 25, y: 20 },
    { x: 25, y: -80 },
    { x: 50, y: -80 },
    { x: 52, y: 70 },
    { x: 40, y: 85 },
    { x: 10, y: 60 },
    { x: -15, y: 85 },
    { x: -45, y: 60 },
    { x: -55, y: 110 },
    { x: 100, y: 110 },
    { x: 105, y: 140 },
    { x: -60, y: 140 },
    { x: -85, y: 110 },
    { x: -90, y: -135 },
    { x: -155, y: -140 },
    { x: -155, y: -110 },
    { x: -125, y: -110 },
    { x: -125, y: -80 },
    { x: -160, y: -80 },
    { x: -160, y: -55 },
    { x: -125, y: -55 },
    { x: -125, y: -30 },
    { x: -145, y: -15 },
    { x: -120, y: 10 },
    { x: -116, y: 110 },
    { x: -95, y: 150 },
    { x: -25, y: 170 },
    { x: -25, y: 198 },
    { x: -70, y: 198 },
    { x: -130, y: 150 },
    { x: -145, y: 30 },
    { x: -170, y: 30 },
    { x: -173, y: 190 },
    { x: -145, y: 223 },
    { x: 10, y: 223 },
    { x: 40, y: 170 },
    { x: 65, y: 223 },
    { x: 95, y: 170 },
    { x: 125, y: 223 },
    { x: 140, y: 110 },
    { x: 165, y: 110 },
    { x: 170, y: 260 },
  ]);

  const getSpeedByHardness = (hardnes) => {
    switch (hardnes) {
      case "Hard":
        return 1000;
      case "Medium":
        return 2000;
      case "Easy":
        return 3000;
      default:
        return 2000;
    }
  };

  useEffect(() => {
    moveBall(0);
  }, []);

  const moveBall = (index) => {
    if (mazePath.length === 0) return;
    const nextIndex = index % mazePath.length;
    const nextPosition = mazePath[nextIndex];

    Animated.timing(ballPosition, {
      toValue: { x: nextPosition.x, y: nextPosition.y },
      duration: getSpeedByHardness(hardnes),
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => moveBall(nextIndex + 1));
  };

  const pathData = mazePath
    .map((point) => `${point.x + W / 2},${point.y + H / 2 + 6}`)
    .join(" ");

  return (
    <BoxGame navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.mazeBackground}>
          <Svg height="110%" width="100%" style={styles.svg}>
            <Polyline
              points={pathData}
              stroke="#02c9bc"
              strokeWidth="10"
              fill="none"
            />
          </Svg>
          <Animated.View
            style={[
              styles.ball,
              {
                transform: [
                  { translateX: ballPosition.x },
                  { translateY: ballPosition.y },
                ],
              },
            ]}
          />
        </View>
      </View>
    </BoxGame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mazeBackground: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  ball: {
    width: W * 0.05,
    height: W * 0.05,
    backgroundColor: "red",
    borderRadius: (W * 0.05) / 2,
    position: "absolute",
  },
  svg: {
    position: "absolute",
    zIndex: -1,
    bottom: 70,
    left: -15,
  },
});
