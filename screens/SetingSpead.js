import React, { useContext, useRef } from "react";
import {
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { LanguageContext } from "../language/language";

export default function Menu({ navigation , route }) {
  const { lan } = useContext(LanguageContext);
  const { name } = route.params;

  const scaleValues = useRef({
    Hard: new Animated.Value(1),
    Mediom: new Animated.Value(1),
    Easy: new Animated.Value(1),
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

  function press(level) {
    navigation.navigate(name, { hardnes: level }); 
  }

  return (
    <ImageBackground
      source={require("../assets/ezgif-4-b23da8f69a.png")}
      style={styles.containerMain}
      imageStyle={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.boxHeader}>
          <Text style={styles.title}>{lan === false ? "تایین سختی" : "Determination of hardness"}</Text>
          <View style={styles.midPart2}></View>
          <Text style={styles.paragraph}>
           {lan === false ? "دوست داری این مرحله چقدر سخت باشه؟" : "How difficult would you like this stage to be?"}
          </Text>
        </View>
        <View style={styles.column}>
          <Animated.View
            style={[
              styles.itemBox,
              { transform: [{ scale: scaleValues.Hard }] },
              { borderColor: "red" },
            ]}
          >
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn("Hard")}
              onPressOut={() => handlePressOut("Hard", () => press("Hard"))}
            >
              <View style={styles.boxText}>
                <Text style={styles.text}>
                  {lan === false ? "سخت" : "Hard"}
                </Text>
                <Image
                  style={styles.imagesIcon}
                  source={require("../assets/hard.png")}
                />
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
          <Animated.View
            style={[
              styles.itemBox,
              { transform: [{ scale: scaleValues.Mediom }] },
              { borderColor: "green" },
            ]}
          >
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn("Mediom")}
              onPressOut={() =>
                handlePressOut("Mediom", () => press("Medium"))
              }
            >
              <View style={styles.boxText}>
                <Text style={styles.text}>
                  {lan === false ? "متوسط" : "Mediom"}
                </Text>
                <Image
                  style={styles.imagesIcon}
                  source={require("../assets/normal.png")}
                />
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
          <Animated.View
            style={[
              styles.itemBox,
              { transform: [{ scale: scaleValues.Easy }] },
            ]}
          >
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn("Easy")}
              onPressOut={() =>
                handlePressOut("Easy", () => press("Easy"))
              }
            >
              <View style={styles.boxText}>
                <Text style={styles.text}>
                  {lan === false ? "آسان" : "Easy"}
                </Text>
                <Image
                  style={styles.imagesIcon}
                  source={require("../assets/easy.png")}
                />
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
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
  column: {
    width: " 100%",
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
    height: 120,
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
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "900",
    color: "#8D8D8D",
  },
  boxText: {
    width: "100%",
    height: "100%",
    justifyContent:"space-around",
    alignItems: "center",
    flexDirection:'row',
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
