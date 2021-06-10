import React, { useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

import { API } from "../../backend";
import LearnCard from "../../components/LearnCard";
import AuthGlobal from "../../context/store/AuthGlobal";
import { LearnNavProps } from "../../types/ParamList";

// const temoData = ["Colors", "Fruits", "Numbers", "Words", "Text", "Changes"];

type progres = {
  level: string;
  progress: number;
};

const Learn = ({ navigation }: LearnNavProps<"Learn">) => {
  const context = useContext(AuthGlobal);

  const [levels, setLevels] = useState<string[]>([]);
  const [progressData, setProgressData] = useState<progres[]>([]);

  const fetchProgress = () => {
    fetch(
      `${API}algo/learnData/${context.state.userId}/${context.state.currentLang}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProgressData(data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const preload = () => {
    fetch(`${API}lang/level/${context.state.currentLang}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLevels(data.data);
        }
      })
      .catch((err) => console.log(err));

    fetchProgress();
  };

  useFocusEffect(
    useCallback(() => {
      preload();

      // return () => {
      //   setLevels([]);
      //   setProgressData([]);
      // }
    }, [])
  );

  var previous: number | null = null;

  const handleClick = (isLocked: boolean, lvl: string) => {
    if (isLocked) {
      Alert.alert(
        "Level locked",
        "Please complete 80% of previous level to unlock",
        [
          {
            text: "Ok",
            onPress: () => console.log("Ok pressed"),
          },
        ]
      );
    } else {
      navigation.navigate("FlashCard", { level: lvl });
    }
  };

  return (
    <View>
      <ScrollView>
        <Text style={styles.heading}>Select a Level</Text>

        {levels.length > 0 ? (
          levels.map((lvl, idx) => {
            let progress = 0;

            progressData.map((data) => {
              if (data.level.toLowerCase().includes(lvl.toLowerCase())) {
                progress = data.progress;
              }
            });

            function previousfn() {
              previous = progress;
            }

            var isLocked =
              Number(previous) >= 80 || previous === null || idx === 0
                ? false
                : true;

            return (
              <React.Fragment key={lvl}>
                <TouchableOpacity onPress={() => handleClick(isLocked, lvl)}>
                  <LearnCard
                    level={lvl}
                    idx={idx}
                    progress={progress}
                    isLocked={isLocked}
                  />
                </TouchableOpacity>

                {previousfn()}
              </React.Fragment>
            );
          })
        ) : (
          <View>
            <ActivityIndicator size="large" color="red" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Learn;

{
  /*https://icons.expo.fyi/ */
}

const styles = StyleSheet.create({
  // container: {
  // },
  heading: {
    textAlign: "center",
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
    color: "#000",
  },
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
