import React, { useState, useEffect } from "react";

import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { API } from "../../backend";
import { VocabProgressNavProps } from "../../types/ParamList";

type data = {
  date: string;
  language: string;
  wordsLearned: number;
};

const VocabProgress = ({ route }: VocabProgressNavProps<"VocabProgress">) => {
  const [lables, setLabels] = useState<string[]>(["none"]);
  const [data, setData] = useState<number[]>([1]);

  useEffect(() => {
    fetch(`${API}algo/userprogress/${route.params.userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr: data[] = data.data;

          let newData = arr.slice(Math.max(arr.length - 7, 1));

          let lbs: string[] = [],
            dat: number[] = [];

          newData.map((dt) => {
            let temp = dt.date.substr(dt.date.length - 5);

            lbs.push(temp);
            dat.push(dt.wordsLearned);
          });

          setLabels(lbs);
          setData(dat);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (!lables || !data) {
    <View>
      <ActivityIndicator size="large" color="red" />
    </View>;
  }

  return (
    <View>
      <View>
        <LineChart
          data={{
            labels: lables,
            datasets: [
              {
                data: data,
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

export default VocabProgress;
