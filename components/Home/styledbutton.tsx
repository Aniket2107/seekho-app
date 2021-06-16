import React from "react";
import { StyleSheet } from "react-native";

import { View, Text, Pressable } from "react-native";
interface IProps {
  type: string;
  content: string;
  onPress: () => void;
}

const StyledButton: React.FC<IProps> = (props) => {
  const backgroundColor = props.type == "primary" ? "#199dd5" : "#ffffff";
  const textColor = props.type == "primary" ? "#ffffff" : "#199dd5";
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { backgroundColor: backgroundColor }]}
        onPress={() => props.onPress()}
      >
        <Text style={[styles.text, { color: textColor }]}>{props.content}</Text>
      </Pressable>
    </View>
  );
};
export default StyledButton;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  button: {
    height: 50,
    borderRadius: 20,
    borderColor: "#cccccc",
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 4,
  },
  text: {
    fontSize: 17,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
