import React from "react";

import { View, Text, StyleSheet } from "react-native";

interface Iprops {
  level: string;
  isLocked: boolean;
  color: string;
}

const QuizCard: React.FC<Iprops> = (props) => {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: props.color ? props.color : "#2ac7b1" },
      ]}
    >
      <Text style={styles.text}>{props.level}</Text>
    </View>
  );
};

export default QuizCard;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 60,
    margin: 20,
    elevation: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
