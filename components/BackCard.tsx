import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
  knownWord: string;
  wordInlang?: string;
  wordInKnown?: string;
  imgUrl?: string;
  audioUrl?: string;
  //Two functions: ;;
}

const BackCard: React.FC<IProps> = (props) => {
  return (
    <View style={styles.card}>
      <View style={{ marginLeft: "80%", marginTop: 10 }}>
        <Feather name="bookmark" size={30} color="black" />
      </View>
      <Text style={styles.headerTitle}>{props.wordInKnown}</Text>
      <Text style={styles.word}>({props.knownWord})</Text>
      <View style={{ marginVertical: 15 }}>
        <AntDesign name="sound" size={24} color="black" />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          console.log("dont know");
        }}
      >
        <Text style={{ color: "white", marginTop: 9, fontSize: 19 }}>
          I knew the meaning
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer2}
        onPress={() => {
          console.log("know");
        }}
      >
        <Text style={{ color: "white", marginTop: 9, fontSize: 19 }}>
          I didn't know the meaning
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 25,
    color: "red",
    fontStyle: "italic",
  },
  word: {
    fontSize: 12,
    fontStyle: "italic",
  },
  buttonContainer: {
    width: "100%",
    height: 45,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#68BB59",
  },
  buttonContainer2: {
    width: "100%",
    height: 45,
    alignItems: "center",
    backgroundColor: "green",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
});
