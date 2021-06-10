import React from "react";

import { View, Text, StyleSheet, ImageStore } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import Timer from "./Timer";
import { useFocusEffect } from "@react-navigation/core";

interface IProps {
  counter: number;
  question: string;
  options: Array<option>;
  duration: number;
  totalQuestions: number;
  checkAnsFn: (option: option) => any;
  calTimeFn: () => any;
}

type option = {
  option: string;
  isCorrect: boolean;
};

const Question: React.FC<IProps> = (props) => {
  const [userOpt, setUserOpt] = React.useState<option>({
    option: "",
    isCorrect: false,
  });
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>();
  const [isReRendered, setReRendered] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Callback called");

      setUserOpt({
        option: "",
        isCorrect: false,
      });

      setSelectedIdx(null);

      return () => {
        setUserOpt({
          option: "",
          isCorrect: false,
        });

        setSelectedIdx(null);
      };
    }, [props.counter, setReRendered])
  );

  const handleClick = (option: option, idx: number) => {
    setUserOpt(option);
    setSelectedIdx(idx);
    //Change the color: or opacity willl work fine;;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.hT1}>
            {props.counter} of {props.totalQuestions}
          </Text>
        </View>

        <Timer
          timeoutFn={() => props.checkAnsFn(userOpt)}
          calTimeFn={props.calTimeFn}
          duration={props.duration}
          isReRendered={isReRendered}
        />
      </View>

      <View style={styles.body}>
        <Text style={styles.question}>
          {props.counter}. {props.question}
        </Text>
        <Text style={styles.ans}>Answer: </Text>
        <View style={styles.optContainer}>
          {props.options.map((opt, idx) => {
            return (
              <View key={opt.option}>
                {selectedIdx === idx ? (
                  <TouchableOpacity
                    onPress={() => handleClick(opt, idx)}
                    style={styles.option}
                  >
                    <Text style={styles.optText}>
                      {idx + 1}. {opt.option}
                    </Text>
                    <FontAwesome
                      name="check-circle"
                      size={24}
                      color="white"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleClick(opt, idx)}
                    style={styles.option}
                  >
                    <Text style={styles.optText}>
                      {idx + 1}. {opt.option}
                    </Text>
                    <FontAwesome
                      name="circle-o"
                      size={24}
                      color="white"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => {
            setReRendered(!isReRendered);
            props.checkAnsFn(userOpt);
          }}
        >
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn2}
          onPress={() => {
            setReRendered(!isReRendered);
            props.checkAnsFn(userOpt);
          }}
        >
          <Text style={styles.btnText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 12,
  },
  hT1: {
    fontSize: 16,
  },
  body: {
    height: "auto",
  },
  ans: {
    fontSize: 20,
    marginTop: 18,
    marginBottom: -10,
    marginLeft: 12,
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 12,
  },
  optContainer: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    height: 300,
    justifyContent: "center",
    alignItems: "stretch",
  },
  option: {
    width: "100%",
    height: 55,
    marginBottom: 15,
    backgroundColor: "#3267FC",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  optText: {
    color: "#fff",
    fontSize: 18,
    padding: 10,
  },
  icon: {
    margin: 7,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  btn1: {
    backgroundColor: "green",
    height: 35,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  btn2: {
    backgroundColor: "red",
    height: 35,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 17,
    color: "#fff",
  },
});

{
  /* 

<TouchableOpacity
                key={opt.option}
                
                style={styles.option}
              >
                <Text style={styles.optText}>
                  ({idx + 1}) {opt.option}
                </Text>
                {selectedIdx ? (
                  
                ) : (
                  <FontAwesome
                    name="circle-o"
                    size={24}
                    color="white"
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

*/
}
