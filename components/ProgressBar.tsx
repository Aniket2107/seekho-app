import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface IProps {
  title: string;
  backgroundColor: string;
  progress: number;
}

const ProgressBar: React.FC<IProps> = (props) => {
  return (
    <View>
      <Text style={styles.title}> {props.title}</Text>
      <View style={styles.progressBar}>
        <View
          style={{
            backgroundColor: props.backgroundColor,
            width: `${props.progress}%`,
          }}
        />
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  title: {
    marginLeft: 14,
    fontSize: 16,
  },
  progressBar: {
    flexDirection: "row",
    width: "90%",
    height: 24,
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default ProgressBar;
