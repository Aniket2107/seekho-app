import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";

interface IProps {
  wordId: string;
  knownWord: string;
  wordInlang?: string;
  wordInKnown?: string;
  imgUrl: string;
  audioUrl: string;
  handleKnow: (wordId: string) => void;
  handleDontKnow: (wordId: string) => void;
}

const BackCard: React.FC<IProps> = (props) => {
  const [sound, setSound] = React.useState<Audio.Sound>();

  const [showDefault, setShowDefault] = React.useState(true);

  let image = showDefault
    ? require("../assets/new.webp")
    : { uri: props.imgUrl };

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: props.audioUrl });
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.card}>
      <View style={{ marginLeft: "80%", marginTop: 15 }}>
        <TouchableOpacity onPress={playSound}>
          <AntDesign name="sound" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.knownWord}>
        <Text style={styles.knownText}>Word: {props.knownWord}</Text>
      </View>

      <Image
        source={image}
        style={styles.img}
        onLoadEnd={() => setShowDefault(false)}
      />

      <View style={styles.leftContainer}>
        <Text style={styles.word}>• {props.wordInKnown}</Text>
        <Text style={styles.word}>• {props.wordInlang}</Text>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.handleKnow(props.wordId)}
      >
        <Text
          style={{
            color: "#000",
            marginTop: 9,
            fontSize: 19,
            fontStyle: "italic",
          }}
        >
          ✓ I knew this word
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer2}
        onPress={() => props.handleDontKnow(props.wordId)}
      >
        <Text
          style={{
            color: "white",
            marginTop: 9,
            fontSize: 19,
            fontStyle: "italic",
          }}
        >
          ✗ I didn't know this word
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    // borderColor: "#000",
    // borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    elevation: 3,
  },
  knownWord: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  knownText: {
    fontSize: 16,
  },
  leftContainer: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -5,
  },
  img: {
    width: 120,
    height: 120,
  },
  word: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#000",
    fontWeight: "bold",
  },

  buttonContainer: {
    width: "99%",
    height: 40,
    position: "absolute",
    bottom: 40,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#90eeaa",
  },
  buttonContainer2: {
    width: "100%",
    height: 40,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    backgroundColor: "#ed7679",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
});
