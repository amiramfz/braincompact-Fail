import React, { useContext, useRef } from "react";
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
} from "react-native";
import { LanguageContext } from "../language/language";

export default function Menu({ navigation }) {
  const { lan, toggleLanguage } = useContext(LanguageContext);

  const scaleValues = useRef({
    Blipchase: new Animated.Value(1),
    StableLine: new Animated.Value(1),
    DualDraw: new Animated.Value(1),
    DartDash: new Animated.Value(1),
    ColorChalenge: new Animated.Value(1),
    SnakePath: new Animated.Value(1),
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

  function setingSpeadPressHandler(pageName) {
    navigation.navigate("SetingSpead", { name: pageName }, navigation);
  }

  function colorChalengeHandler() {
    navigation.navigate("ColorChalenge", navigation);
  }

  function stableLineHandler() {
    navigation.navigate("StableLine");
  }

  return (

    <ImageBackground
      source={require("../assets/ezgif-4-b23da8f69a.png")}
      style={styles.containerMain}
      imageStyle={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.boxHeader}>
          <Text style={styles.title}>
            {lan === false ? "برین کامپکت" : "Brain Compact"}
          </Text>
          <View style={styles.midPart2}></View>
          <Text style={styles.paragraph}>
            {lan === false
              ? "مجموع متخصص رفع ایرادات جسمانی "
              : "Total specialist in fixing physical defects"}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Animated.View
              style={[
                styles.itemBox,
                { transform: [{ scale: scaleValues.Blipchase }] },
              ]}
            >
              <TouchableWithoutFeedback
                onPressIn={() => handlePressIn("Blipchase")}
                onPressOut={() =>
                  handlePressOut("Blipchase", () =>
                    setingSpeadPressHandler("Blipchase")
                  )
                }
              >
                <View style={styles.boxText}>
                  <Image
                    style={styles.imagesIcon}
                    source={require("../assets/training.png")}
                  />
                  <View style={styles.midPart}></View>
                  <Text style={styles.text}>
                    {lan === false ? "تعقیب و گریز" : "Blip Chase"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
            <Animated.View
              style={[
                styles.itemBox,
                { transform: [{ scale: scaleValues.StableLine }] },
              ]}
            >
              <TouchableWithoutFeedback
                onPressIn={() => handlePressIn("StableLine")}
                onPressOut={() =>
                  handlePressOut("StableLine", stableLineHandler)
                }
              >
                <View style={styles.boxText}>
                  <Image
                    style={styles.imagesIcon}
                    source={require("../assets/curved-arrow.png")}
                  />
                  <View style={styles.midPart}></View>
                  <Text style={styles.text}>
                    {lan === false ? "خط پایدار" : "Stable Line"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
            <Animated.View
              style={[
                styles.itemBox,
                { transform: [{ scale: scaleValues.DualDraw }] },
              ]}
            >
              <TouchableWithoutFeedback
                onPressIn={() => handlePressIn("DualDraw")}
                onPressOut={() =>
                  handlePressOut("DualDraw", () =>
                    setingSpeadPressHandler("DualDraw")
                  )
                }
              >
                <View style={styles.boxText}>
                  <Image
                    style={styles.imagesIcon}
                    source={require("../assets/pencil (1).png")}
                  />
                  <View style={styles.midPart}></View>
                  <Text style={styles.text}>
                    {lan === false ? "نقاشی دوتایی" : "Dual Draw"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
          <View style={styles.column}>
            <Animated.View
              style={[
                styles.itemBox,
                { transform: [{ scale: scaleValues.DartDash }] },
              ]}
            >
              <TouchableWithoutFeedback
                onPressIn={() => handlePressIn("DartDash")}
                onPressOut={() =>
                  handlePressOut("DartDash", () =>
                    setingSpeadPressHandler("DartDash")
                  )
                }
              >
                <View style={styles.boxText}>
                  <Image
                    style={styles.imagesIcon}
                    source={require("../assets/aaaa.png")}
                  />
                  <View style={styles.midPart}></View>
                  <Text style={styles.text}>
                    {lan === false ? "فرار سریع" : "Dart Dash"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
            <Animated.View
              style={[
                styles.itemBox,
                { transform: [{ scale: scaleValues.ColorChalenge }] },
              ]}
            >
              <TouchableWithoutFeedback
                onPressIn={() => handlePressIn("ColorChalenge")}
                onPressOut={() =>
                  handlePressOut("ColorChalenge", colorChalengeHandler)
                }
              >
                <View style={styles.boxText}>
                  <Image
                    style={styles.imagesIcon}
                    source={require("../assets/wheel.png")}
                  />
                  <View style={styles.midPart}></View>
                  <Text style={styles.text}>
                    {lan === false ? "چالش رنگ" : "Color Chalenge"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
            <Animated.View
              style={[
                styles.itemBox,
                { transform: [{ scale: scaleValues.SnakePath }] },
              ]}
            >
              <TouchableWithoutFeedback
                onPressIn={() => handlePressIn("SnakePath")}
                onPressOut={() =>
                  handlePressOut("SnakePath", () =>
                    setingSpeadPressHandler("SnakePath")
                  )
                }
              >
                <View style={styles.boxText}>
                  <Image
                    style={styles.imagesIcon}
                    source={require("../assets/snake.png")}
                  />
                  <View style={styles.midPart}></View>
                  <Text style={styles.text}>
                    {lan === false ? "مسیر مار" : "Snake Path"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
  },
  backgroundImage: {
    opacity: 0.1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
  },
  boxHeader: {
    // backgroundColor:"#03FCEC",
    borderRadius: 30,
    padding: 12,
    backgroundColor: "#fff",
    width: 370,
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
    color: "#8D8D8D",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 60,
  },
  column: {
    width: " 45%",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  itemBox: {
    backgroundColor: "rgb(255, 255, 255)",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    height: 170,
    width: "100%",
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
  pressStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "900",
    color: "#8D8D8D",
  },
  boxText: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  langButtonContainer: {
    width: "100%",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  switchContainer: {
    transform: [{ scale: 2 }],
    margin: "10%",
  },

  langButton: {
    width: "70%",
    height: 90,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: "#03FCEC",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
  },
  langText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8D8D8D",
  },
  midPart: {
    width: "70%",
    height: 2,
    backgroundColor: "#8D8D8D",
    marginVertical: 10,
  },
  midPart2: {
    width: "100%",
    height: 2,
    backgroundColor: "#8D8D8D",
    marginVertical: 10,
  },
  imagesIcon: {
    width: 100,
    height: 100,
  },
});
