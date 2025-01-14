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

  const mazePath = [
    { x: -2, y: -306 },
    { x: -3, y: -27 },
    { x: -2, y: 243 },
    { x: -3, y: -27 },
    { x: 190, y: -27 },
    { x: -3, y: -27 },
    { x: -190, y: -27 },
    { x: -3, y: -27 },
    { x: 40, y: -85 },
    { x: 100, y: -143 },
    { x: 150, y: -173 },
    { x: 180, y: -185 },
    { x: 150, y: -173 },
    { x: 100, y: -143 },
    { x: 40, y: -85 },
    { x: -3, y: -27 },
    { x: -45, y: 25 },
    { x: -90, y: 70 },
    { x: -130, y: 100 },
    { x: -180, y: 125 },
    { x: -130, y: 100 },
    { x: -90, y: 70 },
    { x: -45, y: 25 },
    { x: -3, y: -27 },
    { x: -46, y: -90 },
    { x: -90, y: -130 },
    { x: -130, y: -155 },
    { x: -180, y: -180 },
    { x: -130, y: -155 },
    { x: -90, y: -130 },
    { x: -46, y: -90 },
    { x: -3, y: -27 },
    { x: 40, y: 25 },
    { x: 100, y: 85 },
    { x: 150, y: 115 },
    { x: 180, y: 125 },
    { x: 150, y: 115 },
    { x: 100, y: 85 },
    { x: 40, y: 25 },
    { x: -3, y: -27 },
  ];

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
