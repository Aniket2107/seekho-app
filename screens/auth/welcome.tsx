import React from "react";
import { StyleSheet } from "react-native";
import StyledButton from "../../components/Home/styledbutton";
import { View, Text, Dimensions, SafeAreaView } from "react-native";
import Elephant from "../../components/elephant";
import { HomeNavProps } from "../../types/ParamList";

const Welcome = ({ navigation }: HomeNavProps<"Home">) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ele}>
        <Elephant />
      </View>
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
            navigation.navigate("Why");
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
    </SafeAreaView>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  ele: {
    marginTop: -100,
  },
  body: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  titles: {
    marginTop: "110%",
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
    bottom: Dimensions.get("window").height * 0.1,
    width: "100%",
  },
});
