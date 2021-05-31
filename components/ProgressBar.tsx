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
      <Text style={{ marginLeft: 12 }}> {props.title}</Text>
      <View style={styles.progressBar}>
        <View
          style={{
            backgroundColor: props.backgroundColor,
            width: `${props.progress}%`,
            height: screenHeight * 0.03,
          }}
        />
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  progressBar: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default ProgressBar;
