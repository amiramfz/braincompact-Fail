import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import BoxGame from "./BoxGame";

export default function HueMove({ route , navigation }) {
  const { hardnes } = route.params;
  const numbers = [1, 2, 3, 4];
  const [previousNumber, setPreviousNumber] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(getRandomNumber());

  function getRandomNumber() {
    let newNumber;
    do {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      newNumber = numbers[randomIndex];
    } while (newNumber === previousNumber);
    return newNumber;
  }

  function getIntervalByHardness(hardnes) {
    if (hardnes === "Hard") {
      return 500; // سرعت سریع‌تر
    } else if (hardnes === "Medium") {
      return 1000; // سرعت متوسط
    } else if (hardnes === "Easy"){
      return 2000; // سرعت آهسته‌تر
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousNumber(currentNumber);
      setCurrentNumber(getRandomNumber());
    }, getIntervalByHardness(hardnes)); // استفاده از تابع برای تنظیم سرعت

    return () => clearInterval(interval);
  }, [currentNumber, hardnes]);

  return (
    <BoxGame navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.colorBox}>
          {currentNumber === 1 && <View style={styles.boxGreen} />}
          {currentNumber === 2 && <View style={styles.boxBlue} />}
          {currentNumber === 3 && <View style={styles.boxRed} />}
          {currentNumber === 4 && <View style={styles.boxYellow} />}
        </View>
        <View style={styles.textBox}>
          {currentNumber === 3 && <Text style={styles.greenText}>Green</Text>}
          {currentNumber === 1 && <Text style={styles.blueText}>Blue</Text>}
          {currentNumber === 4 && <Text style={styles.redText}>Red</Text>}
          {currentNumber === 2 && <Text style={styles.yellowText}>Yellow</Text>}
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
    padding: 10,
  },
  colorBox: {
    width: "100%",
    height: "80%",
    borderColor: "#ffffff",
    borderWidth: 5,
    borderRadius: 35,
    overflow: "hidden",
  },
  boxYellow: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffeb3b",
  },
  boxRed: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ff0004",
  },
  boxBlue: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0800ff",
  },
  boxGreen: {
    width: "100%",
    height: "100%",
    backgroundColor: "#17fd04",
  },
  textBox: {
    width: "100%",
    height: "15%",
    margin: "0%",
    borderWidth: 5,
    borderRadius: 25,
    borderColor: "#dcc0de",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginTop: "5%",
  },
  yellowText: {
    backgroundColor: "#ffeb3b",
    width: "100%",
    height: "100%",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  redText: {
    backgroundColor: "#ff0004",
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  blueText: {
    backgroundColor: "#0800ff",
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  greenText: {
    backgroundColor: "#17fd04",
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
});
