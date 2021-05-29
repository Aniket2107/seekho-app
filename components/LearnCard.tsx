import React from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";

import { useFonts } from "expo-font";

import AppLoading from "expo-app-loading";

interface IProps {
  level: string;
  idx: number;
  isLocked: boolean;
  progress: number;
}

const colorData = ["#F6BD6E", "#EF585A", "#4FC4CC", "#799DF3"];

const LearnCard: React.FC<IProps> = (props) => {
  const levelLenght = props.level.length;
  const id = props.idx % 4;

  let [fontsLoaded] = useFonts({
    PatrickHand_400Regular: require("../assets/PatrickHand-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View>
      <View
        style={[
          styles.card,
          { backgroundColor: colorData[id], opacity: props.isLocked ? 0.5 : 1 },
        ]}
      >
        <View style={styles.main}>
          <View style={styles.leftContainer}>
            <Text
              style={[
                styles.header,
                {
                  marginLeft: levelLenght > 5 ? -4 : 3,
                },
              ]}
            >
              {props.level}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Image source={require("../assets/fruit.png")} style={styles.img} />
          </View>
        </View>
        <Text style={styles.completed}>{props.progress}% Completed</Text>
        <View style={styles.progressbar}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "#25A5F7",
                width: `${props.progress}%`,
                borderRadius: 10,
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.bottomView,
            { backgroundColor: props.isLocked ? "#D0D0D0" : "#3D8754" },
          ]}
        >
          {props.isLocked ? (
            <Text style={[styles.bottomText, { color: "#000" }]}> Locked </Text>
          ) : (
            <Text style={[styles.bottomText, { color: "#fff" }]}>Unlocked</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default LearnCard;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 160,
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    elevation: 3,
    borderRadius: 10,
    borderColor: "grey",
    marginBottom: 30,
    borderWidth: 0.1,
  },
  main: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -15,
  },
  leftContainer: {
    alignItems: "flex-start",
  },
  rightContainer: {},
  img: {
    width: 45,
    height: 45,
  },

  header: {
    color: "#000",
    fontFamily: "PatrickHand_400Regular",
    fontSize: 25,
    margin: 5,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: -5,
  },
  completed: {
    fontSize: 12,
    color: "#000",
    marginLeft: -3,
    fontFamily: "PatrickHand_400Regular",
  },
  progressbar: {
    width: "45%",
    backgroundColor: "#fff",
    height: 10,
    marginTop: 7,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 0.5,
  },
  bottomView: {
    width: "100%",
    height: 30,
    padding: 5,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  bottomText: {
    letterSpacing: 0.5,
    textTransform: "uppercase",
    fontFamily: "PatrickHand_400Regular",
  },
});

// F59530 ADD8EC 25A5F7
