import React from "react";
import { View, Dimensions, StyleSheet, Animated } from "react-native";
const { width: W, height: H } = Dimensions.get("window");
import BoxGame from "./BoxGame";

export default class Blipchase extends React.Component {
  constructor(props) {
    super(props);
    const h = H * 0.80;
    const w = W * 0.95;
    this.state = {
      pos: new Animated.ValueXY({ x: 0, y: 0 }),
      parentWidth: w,
      parentHeight: h,
    };
  }

  componentDidMount() {
    // شروع انیمیشن فقط در صورتی که ابعاد معتبر باشند
    if (this.state.parentWidth > 0 && this.state.parentHeight > 0) {
      this._loopAnimation();
    }
  }

  getDurationByHardness(hardnes) {
    switch (hardnes) {
      case "Hard":
        return 1000; // سرعت سریع‌تر
      case "Medium":
        return 3000; // سرعت متوسط
      case "Easy":
        return 6000; // سرعت آهسته‌تر
      default:
        return 3000; // مقدار پیش‌فرض در صورت عدم وجود سختی
    }
  }

  _handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    if (width > 0 && height > 0) {
      this.setState(
        {
          parentWidth: width,
          parentHeight: height,
        },
        () => {
          // شروع انیمیشن بعد از تنظیم ابعاد
          this._loopAnimation();
        }
      );
    } else {
      console.warn("Invalid dimensions: width or height is zero.");
    }
  };

  _loopAnimation = () => {
    const { parentWidth, parentHeight } = this.state;
    const { hardnes = "Medium" } = this.props.route.params || {};
    const ballSize = 25;
    const maxX = parentWidth - ballSize;
    const maxY = parentHeight - ballSize;

    const des = {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    };

    if (isNaN(des.x) || isNaN(des.y)) {
      console.warn("Invalid destination coordinates:", des);
      return;
    }

    Animated.timing(this.state.pos, {
      toValue: des,
      duration: this.getDurationByHardness(hardnes),
      useNativeDriver: true,
    }).start(() => {
      this._loopAnimation();
    });
  };

  render() {
    return (
      <BoxGame navigation={this.props.navigation}>
        <View
          style={[styles.container, { width: this.state.parentWidth, height: this.state.parentHeight }]}
          onLayout={this._handleLayout} // استفاده از onLayout برای دریافت ابعاد
        >
          <Animated.View
            style={{
              width: 25,
              height: 25,
              borderRadius: 25 / 2,
              backgroundColor: "red",
              position: "absolute",
              transform: [
                { translateX: this.state.pos.x },
                { translateY: this.state.pos.y },
              ],
            }}
          />
        </View>
      </BoxGame>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "center", // مرکز‌چین کردن والد
  },
});
