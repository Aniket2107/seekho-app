import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { API } from "../../backend";
import LearnCard from "../../components/LearnCard";
import AuthGlobal from "../../context/store/AuthGlobal";

const temoData = ["Colors", "Fruits", "Numbers", "Words", "Text", "Changes"];

type progres = {
  level: string;
  progress: number;
};

const Learn: React.FC = () => {
  const context = useContext(AuthGlobal);

  const [levels, setLevels] = useState<string[]>([]);
  const [progressData, setProgressData] = useState<progres[]>([]);

  useEffect(() => {
    fetch(`${API}lang/level/Marathi`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setLevels(data.data);
      })
      .catch((err) => console.log(err));

    //Fetching the progress:--

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
  }, []);

  var previous: number | null = null;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Select a Level</Text>
        {temoData.map((lvl, idx) => {
          let progress = 0;

          progressData.map((data) => {
            if (data.level.includes(`${lvl}`)) {
              progress = data.progress;
            }
          });

          function previousfn() {
            previous = progress;
          }

          var isLocked =
            Number(previous) >= 80 || previous === null ? false : true;

          return (
            <React.Fragment>
              <TouchableOpacity
                onPress={() => {
                  //check for isLocked here itself hurray..!!
                  console.log(lvl, "clicked");
                }}
              >
                <LearnCard
                  level={lvl}
                  key={lvl}
                  idx={idx}
                  progress={progress}
                  isLocked={isLocked}
                />
              </TouchableOpacity>

              {previousfn()}
            </React.Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Learn;

{
  /*https://icons.expo.fyi/ */
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
    color: "#000",
  },
});
