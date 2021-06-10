import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useInterval } from "../utils/useInterval";

interface IProps {
  timeoutFn: () => any;
  calTimeFn: () => any;
  duration: number;
  isReRendered: boolean;
}

type option = {
  option: string;
  isCorrect: boolean;
};

const Timer: React.FC<IProps> = (props) => {
  const [seconds, setSeconds] = useState<number>(0);

  useInterval(() => {
    if (props.duration === seconds) {
      console.log("Ok reached");
      setSeconds(0);
      props.timeoutFn();
    } else {
      setSeconds(seconds + 1);
      props.calTimeFn();
    }
  }, 1000);

  useEffect(() => {
    return () => setSeconds(0);
  }, [props.isReRendered]);

  const { duration } = props;
  let timeLeft = duration - seconds;
  const color = timeLeft > 5 ? "black" : "red";
  return (
    <View style={styles.container1}>
      <Text style={{ fontSize: 17 }}>Time Left: </Text>

      <Text style={[styles.text2, { color: color }]}>
        {timeLeft.toString().padStart(2, "0")}
      </Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container1: {
    flexDirection: "row",
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
