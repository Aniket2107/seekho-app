import { useFocusEffect } from "@react-navigation/core";
import React, { useState, useCallback, useContext } from "react";

import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { API } from "../../backend";
import AuthGlobal from "../../context/store/AuthGlobal";
import { Image } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";

import { collectionColors } from "../../assets/common/Colors";
import { CollectionNavProps } from "../../types/ParamList";

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
  empty?: boolean;
};

const numsColumns = 2;
const { width, height } = Dimensions.get("window");

const Ranking = ({ navigation, route }: CollectionNavProps<"Collection">) => {
  const context = useContext(AuthGlobal);

  const [vocabs, setVocabs] = useState<vocabType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(true);

  const preload = () => {
    fetch(`${API}collection/get/${context.state.userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVocabs(data.data.vocabCollection);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });

    setloading(false);
  };

  useFocusEffect(
    useCallback(() => {
      preload();
    }, [])
  );

  const filteredVocabs: vocabType[] = vocabs.filter((vb) => {
    return vb.englishInEnglish.toLowerCase().includes(search.toLowerCase());
  });

  const deleteVocab = (vocabId: string) => {
    fetch(`${API}collection/delete/${context.state.userId}/${vocabId}`, {
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

  const formData = (dataList: vocabType[], numsColumn: number) => {
    const totalRows = Math.floor(dataList.length / numsColumn);
    let totalLastRow = dataList.length - totalRows * numsColumn;

    while (totalLastRow !== 0 && totalLastRow !== numsColumn) {
      dataList.push({
        empty: true,
        _id: "",
        language: "",
        hindiInHindi: "",
        englishInEnglish: "",
        languageInHindi: "",
        languageInEnglish: "",
        languageInLanguage: "",
        image: "",
        audio: "",
      });
      totalLastRow++;
    }

    return dataList;
  };

  const displayGrid = (item: vocabType, idx: number) => {
    if (item.empty) {
      return <View style={[styles.itemStyle, styles.itemInvisible]} />;
    }

    const colorIdx = idx % 8;

    return (
      <View
        style={[
          styles.itemStyle,
          { backgroundColor: collectionColors[colorIdx] },
        ]}
      >
        <TouchableOpacity
          onPress={() => deleteVocab(item._id)}
          style={styles.itemIcon}
        >
          <Entypo name="circle-with-cross" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("VocabDetail", {
              vocabId: item._id,
              color: collectionColors[colorIdx],
            })
          }
        >
          <View style={styles.container2}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <Text style={styles.itemText}>{item.englishInEnglish}</Text>
          </View>
        </TouchableOpacity>
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
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.headText}>Collection</Text>

      <FontAwesome name="search" size={24} color="black" style={styles.icon} />
      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Search vocabs"
          placeholderTextColor="grey"
          style={styles.searchBar}
        />
      </View>
      <FlatList
        data={formData(filteredVocabs, numsColumns)}
        renderItem={({ item, index }) => displayGrid(item, index)}
        keyExtractor={(item) => item._id}
        numColumns={2}
      />

      {vocabs.length === 0 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Please add some vocab ;)</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Ranking;

const styles = StyleSheet.create({
  searchContainer: {
    width: width * 0.8,
    alignSelf: "center",
    marginVertical: 10,
  },
  searchBar: {
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 8,
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    top: 68,
    left: 50,
  },
  img: {
    marginTop: -5,
    height: 60,
    width: 60,
  },
  headText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  itemStyle: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    height: height * 0.178,
    borderRadius: 10,
  },
  container2: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  itemIcon: {
    marginLeft: "80%",
    marginTop: 2,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
