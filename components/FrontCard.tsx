import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Audio } from "expo-av";

interface Iprops {
  word: string;
  imgUrl: string;
  audioUrl: string;
  showMeaning: () => void;
}

const FrontCard: React.FC<Iprops> = (props) => {
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
      <TouchableOpacity onPress={playSound}>
        <View style={{ marginLeft: "80%", marginTop: 15 }}>
          <AntDesign name="sound" size={30} color="black" />
        </View>
      </TouchableOpacity>

      <View style={styles.container}>
        <Image
          source={image}
          style={styles.img}
          onLoadEnd={() => setShowDefault(false)}
        />
        <Text style={styles.headerTitle}>{props.word}</Text>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={props.showMeaning}
      >
        <Text style={{ color: "white", marginTop: 9, fontSize: 19 }}>
          Show meaning
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FrontCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    borderColor: "#000",
    // borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    elevation: 3,
  },
  container: {
    marginTop: -10,
    height: "60%",
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    height: 130,
    width: 130,
  },

  headerTitle: {
    fontStyle: "italic",
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "99%",
    height: 45,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#F59530",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    // borderTopColor: "#000",
    // borderTopWidth: 1,
    elevation: 8,
  },
});
