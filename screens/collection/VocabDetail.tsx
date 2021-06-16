import React from "react";

import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";

import { API } from "../../backend";

import { AntDesign } from "@expo/vector-icons";
import AuthGlobal from "../../context/store/AuthGlobal";
import { VocabDetailNavProps } from "../../types/ParamList";

type vocabType = {
  _id: string;
  language: string;
  hindiInHindi: string;
  englishInEnglish: string;
  languageInHindi: string;
  languageInEnglish: string;
  languageInLanguage: string;
  image: string;
  audio: string;
};

const { height } = Dimensions.get("window");

const VocabDetail = ({
  navigation,
  route,
}: VocabDetailNavProps<"VocabDetail">) => {
  const context = React.useContext(AuthGlobal);

  const [sound, setSound] = React.useState<Audio.Sound>();
  const [vocab, SetVocab] = React.useState<vocabType>();
  const [loading, setLoading] = React.useState(true);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: vocab ? vocab.audio : "",
    });
    setSound(sound);

    await sound.playAsync();
  }

  const preload = () => {
    // fetch the vocab by id:

    fetch(`${API}vocab/id/${route.params.vocabId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          SetVocab(data.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteVocab = () => {
    fetch(`${API}collection/delete/${context.state.userId}/${vocab?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Alert.alert(
            "Vocab deleted! ",
            "You can add the vocab again from flashcards.",
            [{ text: "Ok", onPress: () => console.log("vocab deleted") }]
          );
          preload();
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    preload();

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        height: "100%",
        //
      }}
    >
      <View style={styles.soundBtn}>
        <TouchableOpacity onPress={playSound}>
          <AntDesign name="sound" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={[styles.body, { backgroundColor: route.params.color }]}>
        <Image source={{ uri: vocab?.image }} style={styles.img} />

        <View>
          <Text style={styles.headText}>
            {context.state.currentLang === "English" || "english"
              ? vocab?.englishInEnglish
              : vocab?.hindiInHindi}
          </Text>

          <View style={styles.vocabCont}>
            <Text style={styles.font}>* {vocab?.languageInLanguage}</Text>
            <Text style={styles.font}>
              *{" "}
              {context.state.currentLang === "English" || "english"
                ? vocab?.languageInEnglish
                : vocab?.languageInHindi}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.deleteBtn}>
        <TouchableOpacity onPress={deleteVocab}>
          <Text style={styles.deleteText}>Delete Vocab</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.goBackBtn}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.deleteText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VocabDetail;

const styles = StyleSheet.create({
  soundBtn: {
    position: "absolute",
    top: 37,
    right: 20,
    padding: 10,
    borderRadius: 100,
    backgroundColor: "black",
  },
  body: {
    marginTop: height * 0.15,
    borderRadius: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    elevation: 2,
  },
  img: {
    alignSelf: "center",
    margin: 10,
    width: 180,
    height: 180,
  },
  headText: {
    alignSelf: "center",
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  font: {
    fontSize: 28,
    color: "#fff",
  },
  vocabCont: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  deleteBtn: {
    position: "absolute",
    bottom: 70,
    width: "92%",
    alignSelf: "center",
    height: 40,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: "red",
  },
  deleteText: {
    alignSelf: "center",
    fontSize: 18,
    padding: 5,
    color: "#fff",
  },
  goBackBtn: {
    position: "absolute",
    bottom: 20,
    height: 37,
    width: "92%",
    alignSelf: "center",
    elevation: 5,
    borderRadius: 15,
    backgroundColor: "#00BFFF",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
