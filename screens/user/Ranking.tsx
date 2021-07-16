import { useFocusEffect } from "@react-navigation/core";
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";

import { API } from "../../backend";
import { RankingNavProps } from "../../types/ParamList";

type data = {
  email: string;
  name: string;
  points: string;
};

const Ranking = ({ route }: RankingNavProps<"Ranking">) => {
  const [data, setData] = useState<data[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetch(`${API}lang/ranking/${route.params.lang}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            let dt = data.data;
            setData(dt.reverse());
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }, [])
  );

  const layout = (item: data, idx: number) => {
    return (
      <View style={styles.container}>
        <Text>{idx + 1}</Text>
        <View style={styles.textContainer}>
          <Text>{item.name}</Text>
          {/* <Text>{item.email}</Text> */}
        </View>
        <Text>{item.points}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.header}>Leaderboard</Text>
      <View style={styles.thead}>
        <Text>Rank</Text>
        <Text>User</Text>
        <Text>Points</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => layout(item, index)}
        keyExtractor={(item) => item.email}
      />
    </View>
  );
};

export default Ranking;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "bold",
    margin: 10,
  },
  thead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    backgroundColor: "#ccc",
    marginBottom: 10,
    padding: 10,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
