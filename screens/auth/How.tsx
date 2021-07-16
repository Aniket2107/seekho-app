import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthNavProps } from "../../types/ParamList";

const data: string[] = [
  "TV",
  "Social Media",
  "App store",
  "Web Search",
  "Friends or Family",
  "News, articles or blog",
  "Online ads",
  "Other",
];

const topRadius = {
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
};

const bottomRadius = {
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderBottomWidth: 1,
};

const How = ({ navigation, route }: AuthNavProps<"How">) => {
  const [userHow, setHow] = useState<string>("");

  const handleChange = (dt: string) => {
    setHow(dt);
  };

  const handlePress = () => {
    console.log(userHow);

    navigation.navigate("Goal", {
      why: route.params.why,
      how: userHow,
    });
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={styles.header}>
        <Text style={styles.title}>How did you hear about us?</Text>
      </View>

      <ScrollView>
        <View style={styles.body}>
          {data &&
            data.map((dt, idx) => {
              return (
                <TouchableOpacity
                  onPress={() => handleChange(dt)}
                  style={[
                    styles.card,
                    userHow == dt ? { backgroundColor: "#D9F4FB" } : null,
                    idx === 0 ? topRadius : null,
                    idx === 7 ? bottomRadius : null,
                  ]}
                  key={dt}
                >
                  <Text
                    style={[
                      styles.cardText,
                      userHow == dt ? { color: "#24A9DB" } : { color: "#000" },
                    ]}
                  >
                    {dt}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>

      <TouchableOpacity onPress={handlePress} style={styles.nextBtn}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default How;

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    padding: 10,
  },
  title: {
    marginHorizontal: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  card: {
    height: 52,
    marginHorizontal: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  cardText: {
    padding: 10,
    fontSize: 20,
    letterSpacing: 1,
  },
  body: {
    marginVertical: 30,
    marginHorizontal: 10,
    height: "auto",
    marginBottom: 120,
  },
  nextBtn: {
    position: "absolute",
    bottom: 30,
    marginHorizontal: 20,
    width: "90%",
    borderRadius: 30,
    height: 45,
    backgroundColor: "#56CD01",
  },
  btnText: {
    color: "white",
    letterSpacing: 1,
    // fontWeight:'bold',
    fontSize: 20,
    padding: 8,
    alignSelf: "center",
  },
});
