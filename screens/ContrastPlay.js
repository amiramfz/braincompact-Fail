import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import BoxGame from "./BoxGame";

export default function ContrastPlay({ route , navigation }) {
  // const { hardnes } = route.params;
  const { hardnes } = route.params;
  // آرایه‌ای از اعداد
  const numbers = [1, 2, 3, 4];
  // حالت‌ها برای ذخیره‌سازی عدد قبلی و عدد فعلی
  const [currentNumber, setCurrentNumber] = useState(getRandomNumber());

  // تابعی برای انتخاب یک عدد تصادفی از آرایه
  function getRandomNumber() {
    let newNumber;
    do {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      newNumber = numbers[randomIndex];
    } while (newNumber === currentNumber); // چک کردن اینکه عدد جدید با عدد فعلی تکراری نباشد
    return newNumber;
  }

  // تنظیم فاصله زمانی (interval) بر اساس سطح سختی
  function getIntervalByHardness(hardnes) {
    if (hardnes === "Hard") {
      return 1000; // سرعت سریع‌تر
    } else if (hardnes === "Medium") {
      return 2000; // سرعت متوسط
    } else if (hardnes === "Easy") {
      return 3000; // سرعت آهسته‌تر
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNumber((prevNumber) => {
        let newNumber;
        do {
          const randomIndex = Math.floor(Math.random() * numbers.length);
          newNumber = numbers[randomIndex];
        } while (newNumber === prevNumber); // چک کردن اینکه عدد جدید با عدد قبلی تکراری نباشد
        return newNumber;
      });
    }, getIntervalByHardness(hardnes)); // فاصله زمانی بر اساس سطح سختی

    return () => clearInterval(interval);
  }, [hardnes]); // وابستگی به سختی

  return (
    <BoxGame navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.boxGreen}>
              {currentNumber !== 1 && <View style={styles.shadowfilter} />}
            </View>
            <View style={styles.boxBlue}>
              {currentNumber !== 2 && <View style={styles.shadowfilter} />}
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.boxRed}>
              {currentNumber !== 3 && <View style={styles.shadowfilter} />}
            </View>
            <View style={styles.boxYellow}>
              {currentNumber !== 4 && <View style={styles.shadowfilter} />}
            </View>
          </View>
        </View>
        <View style={styles.textBox}>
          {currentNumber === 3 && <View style={styles.greenText}></View>}
          {currentNumber === 1 && <View style={styles.blueText}></View>}
          {currentNumber === 4 && <View style={styles.redText}></View>}
          {currentNumber === 2 && <View style={styles.yellowText}></View>}
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
    padding: "2%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "85%",
  },
  column: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  shadowfilter: {
    width: "100%",
    height: "100%",
    backgroundColor: "#7a747a",
  },
  boxYellow: {
    width: "100%",
    height: "35%",
    backgroundColor: "#ffeb3b",
    borderWidth: 5,
    borderRadius: 35,
    overflow: "hidden",
    borderColor: "#ffff",
  },
  boxRed: {
    width: "100%",
    height: "35%",
    backgroundColor: "#ff0004",
    borderWidth: 5,
    borderRadius: 35,
    overflow: "hidden",
    borderColor: "#ffff",
  },
  boxBlue: {
    width: "100%",
    height: "35%",
    backgroundColor: "#0800ff",
    borderWidth: 5,
    borderRadius: 35,
    overflow: "hidden",
    borderColor: "#ffff",
  },
  boxGreen: {
    width: "100%",
    height: "35%",
    backgroundColor: "#17fd04",
    borderWidth: 5,
    borderRadius: 35,
    overflow: "hidden",
    borderColor: "#ffff",
  },
  textBox: {
    width: "90%",
    height: "15%",
    margin: "0%",
    borderWidth: 5,
    borderColor: "#dcc0de",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
  yellowText: {
    backgroundColor: "#ffeb3b",
    width: "100%",
    height: "100%",
    fontSize: 30,
    fontWeight: "bold",
  },
  redText: {
    backgroundColor: "#ff0004",
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    height: "100%",
  },
  blueText: {
    backgroundColor: "#0800ff",
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    height: "100%",
  },
  greenText: {
    backgroundColor: "#17fd04",
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    height: "100%",
  },
});
