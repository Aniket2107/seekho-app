import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthNavProps } from "../../types/ParamList";

const dataGoal = [
  {
    name: "Casual",
    value: 5,
  },
  {
    name: "Regular",
    value: 10,
  },
  {
    name: "Serious",
    value: 20,
  },
  {
    name: "Insane",
    value: 30,
  },
];

const langdata = ["Marathi", "Tamil", "Gujarati"];

const topRadius = {
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
};

const bottomRadius = {
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderBottomWidth: 1,
};

const Goal = ({ navigation, route }: AuthNavProps<"Goal">) => {
  const [goal, setGoal] = useState<number>(0);
  const [lang, Setlang] = useState("");

  const handlePress = () => {
    console.log(route.params);
    // console.log(lang);

    navigation.navigate("Register", {
      why: route.params.why,
      how: route.params.how,
      goal: goal,
      lang: lang,
    });
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={styles.header}>
        <Text style={styles.title}>Pick a goal</Text>
      </View>

      <ScrollView>
        <View style={styles.body}>
          {dataGoal &&
            dataGoal.map((dt, idx) => {
              return (
                <TouchableOpacity
                  onPress={() => setGoal(dt.value)}
                  style={[
                    styles.card,
                    goal == dt.value ? { backgroundColor: "#D9F4FB" } : null,
                    idx === 0 ? topRadius : null,
                    idx === 3 ? bottomRadius : null,
                  ]}
                  key={dt.value}
                >
                  <Text
                    style={[
                      styles.cardText1,
                      goal == dt.value
                        ? { color: "#24A9DB" }
                        : { color: "#000" },
                    ]}
                  >
                    {dt.name}
                  </Text>
                  <Text
                    style={[
                      styles.cardText,
                      goal == dt.value
                        ? { color: "#24A9DB" }
                        : { color: "#000" },
                    ]}
                  >
                    {dt.value} words a day
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>

      <View style={styles.header}>
        <Text style={styles.title}>Select a language</Text>
      </View>

      <ScrollView>
        <View style={[styles.body, { marginBottom: 120 }]}>
          {langdata &&
            langdata.map((dt, idx) => {
              return (
                <TouchableOpacity
                  onPress={() => Setlang(dt)}
                  key={dt}
                  style={[
                    styles.card,
                    lang == dt ? { backgroundColor: "#D9F4FB" } : null,
                    idx === 0 ? topRadius : null,
                    idx === 2 ? bottomRadius : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.langText,
                      lang == dt ? { color: "#24A9DB" } : { color: "#000" },
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
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Goal;

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
    height: 55,
    marginHorizontal: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderBottomWidth: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText1: {
    paddingHorizontal: 10,
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  cardText: {
    padding: 10,
    fontSize: 18,
    // letterSpacing: 1,
  },
  langText: {
    padding: 10,
    fontSize: 20,
    letterSpacing: 1,
  },
  body: {
    marginTop: 15,
    marginHorizontal: 10,
    height: "auto",
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
