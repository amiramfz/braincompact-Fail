import React, { useContext, useRef, useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Pressable,
} from "react-native";
import { LanguageContext } from "../language/language";

const { width: W, height: H } = Dimensions.get("window");
const h = H * 0.8;
const w = W * 0.95;

export default function BoxGame({ navigation, children }) {
  const { lan } = useContext(LanguageContext);

  const [elapsedTime, setElapsedTime] = useState("00:00");
  const [isTiming, setIsTiming] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (isTiming) {
      const startTime = Date.now();

      const intervalId = setInterval(() => {
        const now = Date.now();
        const difference = Math.floor((now - startTime) / 1000);
        const minutes = Math.floor(difference / 60);
        const seconds = difference % 60;

        setElapsedTime(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      }, 1000);

      setTimer(intervalId);

      return () => clearInterval(intervalId);
    } else {
      if (timer) clearInterval(timer);
    }
  }, [isTiming]);

  const handleTimerToggle = () => {
    setIsTiming((prevIsTiming) => !prevIsTiming);
  };

  const stopButtonHandler = () => {
    if (timer) clearInterval(timer); // مطمئن شوید تایمر پاک شده است
    setElapsedTime("00:00"); // ریست زمان
    setIsTiming(false);
    navigation.navigate("Menu");
  };

  const scaleValues = useRef({
    Stop: new Animated.Value(1),
  }).current;

  const handlePressIn = (key) => {
    Animated.spring(scaleValues[key], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (key, handler) => {
    Animated.spring(scaleValues[key], {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => handler());
  };

  return (
    <SafeAreaView style={styles.area}>
      <ImageBackground style={styles.container} imageStyle={styles.backgroundImage} source={require("../assets/ezgif-4-b23da8f69a.png")}>
        <View style={styles.Game}>{children}</View>
        <View style={styles.downBox}>
          <Animated.View
            style={[
              styles.itemBox,
              { transform: [{ scale: scaleValues.Stop }] },
              {borderColor:'red' ,  shadowColor: "red",}
            ]}
          >
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn("Stop")}
              onPressOut={() =>
                handlePressOut("Stop", () => stopButtonHandler())
              }
            >
              <View style={styles.boxText}>
                <Text style={styles.text}>
                  {lan === false ? "توقف" : "Stop"}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
          
          <View style={styles.timeArea}>
            <Text style={styles.timeText}>{elapsedTime}</Text>
            <Pressable onPress={handleTimerToggle} style={styles.toggleButton}>
              <Text
                style={[
                  styles.toggleText,
                  lan ? styles.englishText : styles.persianText,
                ]}
              >
                {lan
                  ? isTiming
                    ? "Stop"
                    : "Start"
                  : isTiming
                  ? "متوقف کن"
                  : "شروع کن"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  backgroundImage:{
    opacity:0.1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2%",
  },
  Game: {
    width: w,
    height: h,
    borderWidth: 5,
    borderRadius: 25,
    borderColor: "#03FCEC",
    backgroundColor:'white'
  },
  downBox: {
    width: "100%",
    height: "10%",
    marginTop: "5%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
  },
  stopButton: {
    backgroundColor: "rgb(255, 255, 255)",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    height: "85%",
    width: "45%",
    borderWidth: 1,
    borderColor: "#03FCEC",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 8,
  },
  stopText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  timeArea: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "48%",
    height: "90%",
    borderRadius: 45,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "5%",
    flexDirection: "row",
    borderColor: "#03FCEC",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 8,
  },
  timeText: {
    fontSize: 20,
    color: "#8D8D8D",
    fontWeight: "bold",
  },
  toggleButton: {
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "3%",
    borderWidth: 1,
    borderColor: "#03FCEC",

  },
  englishText: { paddingHorizontal: 20 },
  persianText: { paddingHorizontal: 10 },
  toggleText: {
    fontSize: 15,
    color: "#8D8D8D",
    fontWeight: "bold",
    
  },
  itemBox: {
    backgroundColor: "rgb(255, 255, 255)",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    height: "85%",
    width: "45%",
    borderWidth: 1,
    borderColor: "#03FCEC",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 8,
  },
  boxText: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imagesIcon: {
    width: 100,
    height: 100,
  },
  midPart: {
    width: "70%",
    height: 2,
    backgroundColor: "#8D8D8D",
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "900",
    color: "#8D8D8D",
  },
});
