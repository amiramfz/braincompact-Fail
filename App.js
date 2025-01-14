import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, Switch } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LanguageProvider, LanguageContext } from "./language/language";
import Menu from "./screens/Menu";
import SetingSpead from "./screens/SetingSpead";
import BoxGame from "./screens/BoxGame";
import Blipchase from "./screens/Blipchase";
import StableLine from "./screens/StableLine";
import HueMove from "./screens/HueMove";
import ContrastPlay from "./screens/ContrastPlay";
import SnakePath from "./screens/SnakePath";
import DartDash from "./screens/DartDash";
import ColorChalenge from "./screens/ColorChalenge";
import DualDraw from "./screens/DualDraw";
import 'react-native-gesture-handler';

// import { Audio } from 'expo-av';

const Stack = createStackNavigator();

const getTitle = (lan, titleEn, titleFa) => (lan ? titleFa : titleEn);

function AppContent() {
  const { lan, toggleLanguage } = useContext(LanguageContext);
  // useEffect(() => {
  //   let sound;
    
  //   const loadSound = async () => {
  //     try {
  //       sound = new Audio.Sound();
  //       await sound.loadAsync(require('./assets/water.mp3')); 
  //       await sound.playAsync();
  //     } catch (error) {
  //       console.error('Failed to load or play sound', error);
  //     }
  //   };
  
  //   loadSound();
  
  //   return () => {
  //     if (sound) {
  //       sound.unloadAsync(); 
  //     }
  //   };
  // }, []);

  const LanguageSwitch = () => (
    <View style={styles.langButtonContainer}>
      <View style={styles.langButton}>
        <Text style={styles.langText}>فا</Text>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#03FCEC" }}
            thumbColor={lan ? "#8D8D8D" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleLanguage}
            value={lan}
            style={styles.switch}
          />
        </View>
        <Text style={styles.langText}>En</Text>
      </View>
    </View>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          headerTintColor: "#000",
          contentStyle: { backgroundColor: "#7bd3e9" },
          headerLeft: () => <LanguageSwitch />,
          headerRight: () => (
            <View style={styles.navMenu}>
              <Image
                style={styles.imagesIcon}
                source={ require('./assets/logo.png')}
              />
            </View>
          ),
        }}
      >
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: getTitle(lan, "منو", "menu"),
          }}
        />
        <Stack.Screen
          name="Blipchase"
          component={Blipchase}
          options={{
            title: getTitle(lan, "تعقیب و گریز", "Blipchase"),
          }}
        />
        <Stack.Screen
          name="StableLine"
          component={StableLine}
          options={{
            title: getTitle(lan, "خط پایدار", "StableLine"),
          }}
        />
        <Stack.Screen
          name="HueMove"
          component={HueMove}
          options={{
            title: getTitle(lan, "جنبش رنگ", "HueMove"),
          }}
        />
        <Stack.Screen
          name="ContrastPlay"
          component={ContrastPlay}
          options={{
            title: getTitle(lan, "بازی تضاد رنگ", "ContrastPlay"),
          }}
        />
        <Stack.Screen
          name="SnakePath"
          component={SnakePath}
          options={{
            title: getTitle(lan, "مسیر مار", "SnakePath"),
          }}
        />
        <Stack.Screen
          name="SetingSpead"
          component={SetingSpead}
          options={{
            title: getTitle(lan, "انتخاب سرعت", "Speed Setting"),
          }}
        />
        <Stack.Screen
          name="BoxGame"
          component={BoxGame}
          options={{
            title: getTitle(lan, "بازی جعبه", "Box Game"),
          }}
        />
        <Stack.Screen
          name="DartDash"
          component={DartDash}
          options={{
            title: getTitle(lan, "فرار سریع", "DartDash"),
          }}
        />
        <Stack.Screen
          name="ColorChalenge"
          component={ColorChalenge}
          options={{
            title: getTitle(lan, "چالش رنگ ها", "چالش رنگ"),
          }}
        />
        <Stack.Screen
          name="DualDraw"
          component={DualDraw}
          options={{
            title: getTitle(lan, "نقاشی دوتایی", "Dual Draw"),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <StatusBar style="auto" />
      <AppContent />
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inContainer: {
    flex: 1,
  },
  langButtonContainer: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -19,
  },
  switchContainer: {
    transform: [{ scale: 1 }],
  },
  switch: {
    margin: 5,
  },
  langButton: {
    width: 200,
    height: 40,
    // borderRadius: 26,
    // borderWidth: 3,
    // borderColor: "#03FCEC",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  langText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8D8D8D",
  },
  navMenu: {
    marginRight: 18,
  },
  imagesIcon: {
    width: 45,
    height: 45,
  },
});
