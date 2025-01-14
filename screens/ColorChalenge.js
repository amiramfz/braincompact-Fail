// import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import React, { useContext } from "react";

// import { LanguageContext } from "../language/language";

// export default function ColorChalenge({ navigation, route }) {
//   const { lan, toggleLanguage } = useContext(LanguageContext);

//   function setingSpeadPressHandler(pageName) {
//     navigation.navigate("SetingSpead", { name: pageName });
//   }
//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.buttBox}>
//           <Pressable
//             style={[styles.buttBoxIn, { backgroundColor: "#7bd3e9" }]}
//             onPress={() => setingSpeadPressHandler("HueMove")}
//           >
//             <Text style={styles.Text}>
//               {lan === false ? "جنبش رنگ" : "Hue Move"}
//             </Text>
//           </Pressable>
//         </View>
//         <View style={styles.buttBox}>
//           <Pressable
//             style={[styles.buttBoxIn, { backgroundColor: "#f7f7c5" }]}
//             onPress={() => setingSpeadPressHandler("ContrastPlay")}
//           >
//             <Text style={styles.Text}>
//               {lan === false ? "بازی تضاد رنگ" : "Contrast Play"}
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttBoxIn: {
//     padding: 45,
//     paddingHorizontal: 60,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 30,
//   },
//   buttBox: {
//     marginVertical: "10%",
//   },
//   Text: {
//     fontSize: 25,
//     fontWeight: "bold",
//   },
// });


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

export default function ColorChalenge({ navigation }) {
  const { lan, toggleLanguage } = useContext(LanguageContext);

  const scaleValues = useRef({
    HueMove: new Animated.Value(1),
    ContrastPlay: new Animated.Value(1),
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
      navigation.navigate("SetingSpead", { name: pageName });
    }

  return (
    <ImageBackground
      source={require("../assets/ezgif-4-b23da8f69a.png")}
      style={styles.containerMain}
      imageStyle={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.boxHeader}>
          <Text style={styles.title}>{lan === false ? "تمرکزی یا حرفه ای" : "Focused or professional"}</Text>
          <View style={styles.midPart2}></View>
          <Text style={styles.paragraph}>
          {lan === false ? "در این بخش نوع بازی رنگ خود را انتخاب کنید " : "In this section, choose your color game type."}  
          </Text>
        </View>
        <View style={styles.column}>
          <Animated.View
            style={[
              styles.itemBox,
              { transform: [{ scale: scaleValues.HueMove }] },
            ]}
          >
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn("HueMove")}
              onPressOut={() => handlePressOut("HueMove", () => setingSpeadPressHandler("HueMove"))}
            >
              <View style={styles.boxText}>
                <Text style={styles.text}>
                {lan === false ? "جنبش رنگ" : "Hue Move"}
                </Text>
                <Image
                  style={styles.imagesIcon}
                  source={require("../assets/8549515.png")}
                />
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
          <Animated.View
            style={[
              styles.itemBox,
              { transform: [{ scale: scaleValues.ContrastPlay }] },
            ]}
          >
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn("ContrastPlay")}
              onPressOut={() =>
                handlePressOut("ContrastPlay", () => setingSpeadPressHandler("ContrastPlay"))
              }
            >
              <View style={styles.boxText}>
                <Text style={styles.text}>
                {lan === false ? "بازی تضاد رنگ" : "Contrast Play"}
                </Text>
                <Image
                  style={styles.imagesIcon}
                  source={require("../assets/10336311 (1).png")}
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
