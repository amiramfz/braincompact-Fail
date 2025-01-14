import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import BoxGame from "./BoxGame";

export default function DualDraw({ route, navigation }) {
  const { hardnes } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require("../assets/Screenshot (29).png"),
    require("../assets/Screenshot 1.png"),
    require("../assets/Screenshot 2.png"),
    require("../assets/Screenshot 3.png"),
    require("../assets/Screenshot 4.png"),
    require("../assets/Screenshot 5.png"),
    require("../assets/Screenshot 6.png"),
    require("../assets/Screenshot 7.png"),
    require("../assets/Screenshot 8.png"),
  ];

  function getIntervalByHardness(hardnes) {
    if (hardnes === "Hard") {
      return 3000; // سرعت سریع‌تر
    } else if (hardnes === "Medium") {
      return 5000; // سرعت متوسط
    } else if (hardnes === "Easy") {
      return 8000; // سرعت آهسته‌تر
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % images.length);
    }, getIntervalByHardness(hardnes));

    return () => clearInterval(interval); // پاک کردن تایمر هنگام unmount
  }, [hardnes]);

  return (
    <BoxGame navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.rightBox}>
          <Image source={images[currentIndex]} style={styles.image} />
        </View>
        <View style={styles.leftBox}>
          <Image
            source={images[(currentIndex + 1) % images.length]}
            style={styles.image}
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
    borderRadius: 20,
    flexDirection: "row",
    padding: "2%",
    gap: 5,
  },
  rightBox: {
    width: "50%",
    height: "50%",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#dcc0de",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  leftBox: {
    width: "50%",
    height: "50%",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#dcc0de",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "70%",
    borderRadius: 15,
  },
});
