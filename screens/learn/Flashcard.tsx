import React, { useState, useCallback, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BackCard from "../../components/BackCard";
import FrontCard from "../../components/FrontCard";
import ProgressBar from "../../components/ProgressBar";
import { FlashCardNavProps } from "../../types/ParamList";

import { initialize, knowTheWord, dontKnowTheWord } from "../../utils/algo";

import { API } from "../../backend";
import AuthGlobal from "../../context/store/AuthGlobal";
import { useFocusEffect } from "@react-navigation/core";

const { width, height } = Dimensions.get("window");

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

const FlashCard = ({ navigation, route }: FlashCardNavProps<"FlashCard">) => {
  const context = useContext(AuthGlobal);

  const [vocab, setVocab] = useState<vocabType[]>([]);
  const [progress, setProgress] = useState({
    learning: 0,
    reviewing: 0,
    mastered: 0,
    totalWords: 0,
    learningPer: 0,
    reviewingPer: 0,
    masteredPer: 0,
    wordsInMastered: [""],
    wordsInReviewing: [""],
    wordsInLearning: [""],
  });
  const [flipcard, setFlipcard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wordIdx, setWordIdx] = useState(0);
  const [availContinue, setAvailContinue] = useState(false);

  const fetchProgress = () => {
    fetch(
      `${API}algo/userdata/${context.state.userId}/${context.state.currentLang}/${route.params.level}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProgress({
            ...progress,
            learningPer: data.data.learningPer,
            reviewingPer: data.data.reviewingPer,
            masteredPer: data.data.masteredPer,
            learning: data.data.learningWords,
            reviewing: data.data.reviewingWords,
            mastered: data.data.masteredWords,
            totalWords: data.data.total,
            wordsInLearning: data.data.learning,
            wordsInReviewing: data.data.reviewing,
            wordsInMastered: data.data.mastered,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const preload = async () => {
    await fetchProgress();
    //Check for algo api and if true simply set vocab
    // or else fetch normal vocab and set initializer:---

    fetch(
      `${API}algo/user-vocab/${context.state.userId}/${context.state.currentLang}/${route.params.level}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVocab(data.data);
          setLoading(false);
        } else {
          //Fetching normal vocabs and then initi..
          fetch(
            `${API}vocab/lang-level/${context.state.currentLang}/${route.params.level}`,
            {
              method: "GET",
            }
          )
            .then((res) => res.json())
            .then(async (data) => {
              if (data.success) {
                setVocab(data.data);
                setLoading(false);
              }

              await initialize(
                route.params.level,
                context.state.currentLang,
                context.state.userId
              );
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const showMeaning = () => {
    setFlipcard(!flipcard);
    fetchProgress();
  };

  const handleKnow = (wordId: string) => {
    knowTheWord(
      context.state.currentLang,
      route.params.level,
      wordId,
      context.state.userId
    );

    let nextQ = wordIdx + 1;

    if (nextQ < progress.totalWords) {
      setWordIdx(nextQ);
    } else {
      setWordIdx(0);
    }

    //at very end
    setFlipcard(!flipcard);
  };

  const handleDontKnow = (wordId: string) => {
    dontKnowTheWord(
      context.state.currentLang,
      route.params.level,
      wordId,
      context.state.userId
    );

    let nextQ = wordIdx + 1;

    if (nextQ < progress.totalWords) {
      setWordIdx(nextQ);
    } else {
      setWordIdx(0);
    }

    setFlipcard(!flipcard);
  };

  useFocusEffect(
    useCallback(() => {
      preload();
      console.log("FS");
    }, [])
  );

  if (loading || vocab.length === 0) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (
    !availContinue &&
    progress.mastered !== 0 &&
    progress.mastered === progress.totalWords
  ) {
    {
      Alert.alert(
        "Congratulations",
        "You have succesfully completed the level",
        [{ text: "OK", onPress: () => setAvailContinue(true) }]
      );
    }
  }

  const currentWord = vocab[wordIdx];
  let word: string;
  let wordStatus: string;
  let wordInKnown: string;
  if (context.state.knownLang === "English" || "english") {
    word = currentWord.englishInEnglish;
    wordInKnown = currentWord.languageInEnglish;
  } else {
    word = currentWord.hindiInHindi;
    wordInKnown = currentWord.languageInHindi;
  }

  if (
    progress.wordsInMastered &&
    progress.wordsInMastered.indexOf(currentWord._id) !== -1
  ) {
    wordStatus = "Mastered";
  } else if (
    progress.wordsInReviewing &&
    progress.wordsInReviewing.indexOf(currentWord._id) !== -1
  ) {
    wordStatus = "Reviewing";
  } else {
    wordStatus = "Learning";
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Learn")}
          style={{ marginLeft: 10 }}
        >
          <Ionicons name="arrow-back" size={31} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{route.params.level}</Text>
      </View>

      <ScrollView>
        <View style={styles.container}>
          <View>
            {!flipcard ? (
              <View style={styles.card}>
                <FrontCard
                  word={word}
                  wordId={currentWord._id}
                  wordStatus={wordStatus}
                  audioUrl={currentWord.audio}
                  imgUrl={currentWord.image}
                  showMeaning={showMeaning}
                />
              </View>
            ) : (
              <View style={styles.card}>
                <BackCard
                  wordId={currentWord._id}
                  knownWord={word}
                  wordInKnown={wordInKnown}
                  wordInlang={currentWord.languageInLanguage}
                  audioUrl={currentWord.audio}
                  imgUrl={currentWord.image}
                  handleKnow={handleKnow}
                  handleDontKnow={handleDontKnow}
                />
              </View>
            )}
          </View>

          <View style={{ marginTop: 15 }}>
            <ProgressBar
              progress={progress.masteredPer}
              backgroundColor="green"
              title={`You have mastered ${progress.mastered} out of ${
                progress.totalWords || 10
              } words`}
            />
            <ProgressBar
              progress={progress.reviewingPer}
              backgroundColor="#F59551"
              title={`You are reviewing ${progress.reviewing} out of ${
                progress.totalWords || 10
              } words`}
            />
            <ProgressBar
              progress={progress.learningPer}
              backgroundColor="red"
              title={`You are learning ${progress.learning} out of ${
                progress.totalWords || 10
              } words`}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlashCard;

const styles = StyleSheet.create({
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
  container: {
    height: height * 0.8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  card: {
    backgroundColor:'white',
    width: width * 0.91,
    height: height * 0.44,
    margin: width * 0.04,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

// route.params.level
