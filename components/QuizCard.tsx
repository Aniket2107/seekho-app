import React from "react";

import { View, Text, StyleSheet } from "react-native";

interface Iprops {
  level: string;
  isLocked: boolean;
}

const QuizCard: React.FC<Iprops> = (props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{props.level}</Text>
    </View>
  );
};

export default QuizCard;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 60,
    backgroundColor: "#2ac7b1",
    margin: 20,
    elevation: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
});
