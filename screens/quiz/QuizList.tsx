import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import AuthGlobal from "../../context/store/AuthGlobal";
import { useFocusEffect } from "@react-navigation/native";

import { FontAwesome5 } from "@expo/vector-icons";

import { API } from "../../backend";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import QuizCard from "../../components/QuizCard";
import { QuizListNavProps } from "../../types/ParamList";

type progres = {
  level: string;
  progress: number;
};

const QuizList = ({ navigation, route }: QuizListNavProps<"QuizList">) => {
  const context = React.useContext(AuthGlobal);

  const [levels, setLevels] = React.useState<string[]>([]);
  const [progressData, setProgressData] = React.useState<progres[]>([]);

  const fetchProgress = () => {
    fetch(
      `${API}algo/learnData/${context.state.userId}/${context.state.currentLang}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProgressData(data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const preload = () => {
    fetch(`${API}lang/level/${context.state.currentLang}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLevels(data.data);
        }
      })
      .catch((err) => console.log(err));

    fetchProgress();
  };

  useFocusEffect(
    React.useCallback(() => {
      preload();

      // return () => {
      //   setLevels([]);
      //   setProgressData([]);
      // };
    }, [])
  );

  const handleClick = (isLocked: boolean, lvl: string) => {
    if (isLocked) {
      Alert.alert("Quiz locked", "Please complete the learn lessons first", [
        {
          text: "Ok",
          onPress: () => console.log("Ok pressed"),
        },
      ]);
    } else {
      navigation.navigate("Quiz", { level: lvl });
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <FontAwesome5 name="user-graduate" size={24} color="black" />
        <Text style={styles.headerText1}>Quiz</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>Choose a Level</Text>

        {levels && levels.length > 0 ? (
          levels.map((lvl) => {
            let progress = 0;
            progressData.map((data) => {
              if (data.level.toLowerCase().includes(lvl.toLowerCase())) {
                progress = data.progress;
              }
            });

            const isLocked = progress >= 80 ? false : true;

            return (
              <React.Fragment key={lvl}>
                <TouchableOpacity onPress={() => handleClick(isLocked, lvl)}>
                  <QuizCard level={lvl} isLocked={isLocked} />
                </TouchableOpacity>
              </React.Fragment>
            );
          })
        ) : (
          <View>
            <ActivityIndicator size="large" color="red" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default QuizList;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    elevation: 4,
  },
  headerText1: {
    marginLeft: 10,
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  scroll: {
    marginBottom: 50,
  },
  text: {
    alignSelf: "center",
    margin: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});
