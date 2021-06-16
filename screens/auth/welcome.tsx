import React from "react";
import { StyleSheet } from "react-native";
import StyledButton from "../../components/Home/styledbutton";
import { View, Text, Dimensions } from "react-native";
import Elephant from "../../components/elephant";
import { HomeNavProps } from "../../types/ParamList";

const Welcome = ({ navigation }: HomeNavProps<"Home">) => {
  return (
    <View style={styles.container}>
      <Elephant />
      <View style={styles.titles}>
        <Text style={styles.title}>SeeKho</Text>
        <Text style={styles.subtitle}>
          A Way To Connect To Different Cultures
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <StyledButton
          type="primary"
          content={"Get Started"}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
        <StyledButton
          type="secondary"
          content={"I Already have an account"}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
    </View>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("screen").height,
  },
  ele: {
    height: 150,
    width: 150,
  },
  titles: {
    marginTop: "100%",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#199dd5",
    // fontFamily: 'monospace',
  },
  subtitle: {
    fontSize: 16,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
});
