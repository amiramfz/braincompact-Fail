import React, { useState, useEffect, useContext, useRef } from "react";
import { LanguageContext } from "../language/language";
import { View, StyleSheet, Animated, Easing, Text, Dimensions } from "react-native";

import BoxGame from "./BoxGame";

const StableLine = ({ navigation }) => {
  const { lan } = useContext(LanguageContext);
  const ballPosition = useRef(new Animated.Value(0)).current;
  const [speed, setSpeed] = useState(20000); // Default speed

  // اندازه فضای بازی
  const { width: W, height: H } = Dimensions.get("window");
  const h = H * 0.78; 
  const w = W * 0.94; 
  const ballSize = 20; 

  useEffect(() => {
    const animateBall = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(ballPosition, {
            toValue: h - ballSize, // حرکت توپ تا انتهای مسیر
            duration: speed,
            useNativeDriver: false,
            easing: Easing.linear,
          }),
          Animated.timing(ballPosition, {
            toValue: 0, // بازگشت توپ به ابتدا
            duration: speed,
            useNativeDriver: false,
            easing: Easing.linear,
          }),
        ])
      ).start();
    };

    animateBall();

    return () => ballPosition.stopAnimation();
  }, [speed, h]);

  return (
    <BoxGame navigation={navigation}>
      <View style={[styles.container, { height: h, width: w }]}>
        <View
          style={[styles.decreaseButton , {borderColor:'red' , shadowColor: "red",}]}
          onTouchEnd={() => setSpeed((prev) => Math.max(500, prev - 500))}
        >
          <Text style={styles.increaseText}>
            {lan === false ? "زیاد کردن" : "Increase"}
          </Text>
        </View>
        <View style={[styles.path, { height: h }]}>
          <View style={styles.line} />
          <Animated.View
            style={[
              styles.ball,
              {
                transform: [{ translateY: ballPosition }],
              },
            ]}
          />
        </View>
        <View
          style={[styles.decreaseButton , { shadowColor: "#03FCEC",}]}
          onTouchEnd={() => setSpeed((prev) => prev + 500)}
        >
          <Text style={styles.decreaseText}>
            {lan === false ? "کم کردن" : "Decrease"}
          </Text>
        </View>
      </View>
    </BoxGame>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
  path: {
    width: 25,
    backgroundColor: "#02c9bc",
    alignItems: "center",
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
    marginHorizontal: "5%",
  },
  line: {
    position: "absolute",
    width: 5,
    height: "100%",
    backgroundColor: "#02c9bc", // رنگ خط
    left: 10, // مرکز کردن خط
  },
  ball: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: "red",
    position: "absolute",
    top: 0,
  },
  increaseButton: {
    backgroundColor: "#6fec77",
    borderRadius: 25,
    padding: "4%",
  },
  decreaseButton: {
    backgroundColor: "rgb(255, 255, 255)",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    height: 70,
    width: "40%",
    borderWidth: 1,
    borderColor: "#03FCEC",
    // Shadow for iOS
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 8,
  },
  decreaseText: {
    fontSize: 25,
    color: "#444444",
    borderRadius: 50,
    fontWeight: "bold",
  },
  increaseText: {
    fontSize: 25,
    color: "#444444",
    borderRadius: 50,
    fontWeight: "bold",
  },
});

export default StableLine;
