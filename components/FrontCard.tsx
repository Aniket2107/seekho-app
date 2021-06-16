import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { API } from "../backend";

import { Audio } from "expo-av";
import AuthGlobal from "../context/store/AuthGlobal";

interface Iprops {
  word: string;
  wordId: string;
  wordStatus: string;
  imgUrl: string;
  audioUrl: string;
  showMeaning: () => void;
}

const FrontCard: React.FC<Iprops> = (props) => {
  const context = React.useContext(AuthGlobal);

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

  const addToCollection = () => {
    Alert.alert("Loading....");

    fetch(`${API}collection/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: context.state.userId,
        vocabId: props.wordId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          Alert.alert("Congrats!", "Vocab added to you collection..", [
            { text: "Ok", onPress: () => console.log("Word added") },
          ]);
        } else {
          Alert.alert("Oops!", "Vocab already exists on your collection..", [
            { text: "Ok", onPress: () => console.log("Word added") },
          ]);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.card}>
      <View style={{ marginLeft: "80%", marginTop: 15 }}>
        <TouchableOpacity onPress={playSound}>
          <AntDesign name="sound" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.addColl}>
        <TouchableOpacity onPress={addToCollection}>
          <MaterialIcons name="add-comment" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.wordStatus}>
        <Text style={styles.wordStatusText}>{props.wordStatus}</Text>
      </View>

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
  addColl: {
    position: "absolute",
    top: 60,
    right: 20,
  },
  wordStatus: {
    position: "absolute",
    left: 15,
    top: 15,
    backgroundColor: "green",
    borderRadius: 15,
  },
  wordStatusText: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    fontStyle: "italic",
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
