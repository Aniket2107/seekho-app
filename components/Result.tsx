import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AuthGlobal from "../context/store/AuthGlobal";

import { data, postQuizData } from "../utils/quiz";

interface Iprops {
  time: number[];
  userAns: option[];
  score: number;
  question: question[];
  level: string;
}

type question = {
  _id: string;
  question: string;
  options: option[];
  time: number;
};

type option = {
  option: string;
  isCorrect: boolean;
};

const Result: React.FC<Iprops> = (props) => {
  const context = React.useContext(AuthGlobal);

  const [totalTime, setTotalTime] = React.useState<number>(0);

  const addQuiz = () => {
    let data: data[] = [];

    props.question.map((qt, idx) => {
      const dt = {
        question: qt.question,
        rightAns:
          qt.options.find((opt) => opt.isCorrect === true)?.option || "",
        userAns: props.userAns[idx].option,
        timeTaken: props.time[idx],
      };

      data.push(dt);
    });

    const payload = {
      userId: context.state.userId,
      language: context.state.currentLang,
      level: props.level,
      score: props.score,
      data: data,
    };

    postQuizData(payload);
  };

  const sendAlert = () => {
    Alert.alert(
      "Congratulations !!",
      "You have sucessfully completed the quiz",
      [
        {
          text: "Know More",
          onPress: () => console.log("Ok pressed"),
        },
      ]
    );
  };

  React.useEffect(() => {
    let temp: number = 0;

    props.time.map((t) => {
      temp += t;
    });

    setTotalTime(temp);

    addQuiz();

    sendAlert();
  }, []);

  const perVal = (props.question.length / props.score) * 100;

  // const scColor = perVal > 75 ? "green" : perVal > 45 ? "yellow" : "red";

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView>
        {/* <Text style={styles.headerText}></Text> */}

        <View style={styles.topContainer}>
          <Text style={{ color: "black", fontSize: 16 }}>
            Total Score: {props.score}/{props.question.length}
          </Text>
          <Text>Time Taken: {totalTime}s</Text>
        </View>

        <View>
          {props.question.map((qt, idx) => {
            const correctOpt = qt.options.find(
              (opt) => opt.isCorrect === true
            )?.option;

            return (
              <View
                key={qt._id}
                style={[
                  styles.card,
                  { backgroundColor: idx % 2 === 0 ? "#fff" : "#E9ECEF" },
                ]}
              >
                <View style={styles.body}>
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {idx + 1}.
                      {qt.question.length > 45
                        ? qt.question.substring(0, 45 - 3) + "..."
                        : qt.question}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: props.userAns[idx].isCorrect ? "green" : "red",
                      }}
                    >
                      Your ans: {props.userAns[idx].option}
                    </Text>
                    <Text>Correct ans: {correctOpt}</Text>
                    <Text>Time: {props.time[idx]}s</Text>
                  </View>
                  <View>
                    {props.userAns[idx].isCorrect ? (
                      <AntDesign name="checkcircle" size={24} color="green" />
                    ) : (
                      <Entypo name="circle-with-cross" size={24} color="red" />
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Result;

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "brown",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  body: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    height: "auto",
    width: "100%",
    padding: 5,
  },
});

//
