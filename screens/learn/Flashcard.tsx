import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BackCard from "../../components/BackCard";
import FrontCard from "../../components/FrontCard";
import ProgressBar from "../../components/ProgressBar";
import { FlashCardNavProps } from "../../types/ParamList";

import { API } from "../../backend";

const FlashCard = ({ navigation, route }: FlashCardNavProps<"FlashCard">) => {
  const [vocab, setVocab] = useState([]);
  const [progress, setProgress] = useState({
    learning: 0,
    reviewing: 0,
    mastered: 0,
    totalWords: 0,
    learningPer: 0,
    reviewingPer: 0,
    masteredPer: 0,
  });
  const [flipcard, setFlipcard] = useState(false);

  const preload = () => {
    //First check for algo api
    //if null go for normal vocab search api
    // ;)
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {!flipcard ? (
            <View>
              <FrontCard word="apple" audioUrl="asd" imgUrl="asd" />
            </View>
          ) : (
            <View>
              <BackCard knownWord="apple" />
            </View>
          )}

          <View>
            <ProgressBar
              progress={progress.masteredPer || 20}
              backgroundColor="green"
              title={`You have mastered ${progress.mastered || 0} out of ${
                progress.totalWords || 0
              } words`}
            />
            <ProgressBar
              progress={progress.reviewingPer || 30}
              backgroundColor="yellow"
              title={`You are reviewing ${progress.reviewing || 0} out of ${
                progress.totalWords || 0
              } words`}
            />
            <ProgressBar
              progress={progress.learningPer || 50}
              backgroundColor="red"
              title={`You are learning ${progress.learning || 0} out of ${
                progress.totalWords || 0
              } words`}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlashCard;

// route.params.level
