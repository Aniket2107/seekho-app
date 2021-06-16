//TODO: types for route and cards:-

import React, { useState, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import QuestionCard from "../../components/QuestionCard";
import { Ionicons } from "@expo/vector-icons";

import { API } from "../../backend";
import AuthGlobal from "../../context/store/AuthGlobal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/core";
import { QuizNavProps } from "../../types/ParamList";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Result from "../../components/Result";

type question = {
  _id: string;
  question: string;
  options: Array<options>;
  time: number;
};

type options = {
  option: string;
  isCorrect: boolean;
};

const { width } = Dimensions.get("window");

const Quiz = ({ navigation, route }: QuizNavProps<"Quiz">) => {
  const context = React.useContext(AuthGlobal);

  const [questions, setQuestions] = useState<question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAns, setUserAns] = useState<options[]>([]);
  const [time, setTime] = useState<number[]>([]);
  const [timePerQuestion, setTPerQ] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const preload = () => {
    fetch(`${API}quiz/quiz`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: context.state.currentLang,
        level: route.params.level,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQuestions(data.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useFocusEffect(
    useCallback(() => {
      preload();

      return () => {
        setQuestions([]);
      };
    }, [])
  );

  const checkAnsFn = (option: options) => {
    console.log("ans called");
    if (option.isCorrect) {
      setScore(score + 1);
    }
    setTPerQ(0);
    setUserAns([...userAns, option]);
    setTime([...time, timePerQuestion]);

    setCurrentQ(currentQ + 1);
  };

  const calTime = () => {
    setTPerQ(timePerQuestion + 1);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Warning!",
              "All your progress will be lost, make sure you complete the test"
            )
          }
          style={{ marginLeft: 10 }}
        >
          <Ionicons name="arrow-back" size={31} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{route.params.level}</Text>
      </View>

      <ScrollView>
        <View>
          {questions && currentQ < questions.length ? (
            <QuestionCard
              counter={currentQ + 1}
              question={questions[currentQ].question}
              options={questions[currentQ].options}
              checkAnsFn={checkAnsFn}
              calTimeFn={calTime}
              duration={questions[currentQ].time}
              totalQuestions={questions.length}
            />
          ) : (
            <Result
              userAns={userAns}
              time={time}
              question={questions}
              score={score}
              level={route.params.level}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  onLoad: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    marginLeft: width * 0.28,
    fontSize: 20,
    fontWeight: "bold",
  },
});
