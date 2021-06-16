import { useFocusEffect } from "@react-navigation/core";
import React, { useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Image } from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";

import { LineChart } from "react-native-chart-kit";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import StyledButton from "../../components/Home/styledbutton";

import { logoutUser } from "../../context/actions/authActions";
import AuthGlobal from "../../context/store/AuthGlobal";
import { ProfileNavProps } from "../../types/ParamList";
import { API } from "../../backend";

type data = {
  date: string;
  language: string;
  wordsLearned: number;
};

type user = {
  name: string;
  email: string;
  city: string;
  country: string;
  dailyGoal: number;
  gender: string;
  points: {
    language: string;
    coins: number;
  }[];
};

const Profile = ({ navigation }: ProfileNavProps<"Profile">) => {
  const context = useContext(AuthGlobal);

  const [user, setUser] = React.useState<user>();
  const [lables, setLabels] = React.useState<string[]>(["none"]);
  const [data, setData] = React.useState<number[]>([1]);

  useFocusEffect(
    React.useCallback(() => {
      fetch(`${API}user/${context.state.userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.data);
          }
        })
        .catch((err) => console.log(err));

      fetch(`${API}algo/userprogress/${context.state.userId}`)
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
    }, [])
  );

  return (
    <ScrollView style={{ height: "auto" }}>
      <SafeAreaView>
        <View style={styles.header}>
          <FontAwesome name="user" size={24} color="black" />
          <Text style={styles.headerText1}>Profile</Text>
        </View>

        <View style={[styles.userInfoSection, styles.row]}>
          <Image source={require("../../assets/user.png")} style={styles.img} />

          <View style={styles.userSec}>
            <Text style={styles.head1}>{user?.name}</Text>
            <Text style={styles.head2}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 10 }}>
                {user?.city}, {user?.country}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 10 }}>
                +91-951163780
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="crown" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 10 }}>
                {user?.points[0].coins}
              </Text>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <MaterialCommunityIcons
                name="gender-male"
                size={20}
                color="#777777"
              />
              <Text style={{ color: "#777777", marginLeft: 10 }}>Male</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome5 name="tasks" size={20} color="#777777" />
              <Text style={{ color: "#777777", marginLeft: 10 }}>
                {user?.dailyGoal}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.progressBody, { marginTop: -20 }]}>
          <View
            style={[
              styles.row,
              { alignItems: "center", marginLeft: 20, marginBottom: 0 },
            ]}
          >
            <MaterialCommunityIcons
              name="progress-check"
              size={24}
              color="green"
            />
            <Text style={styles.progressTxt}>Progress</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <LineChart
              data={{
                labels: lables,
                datasets: [
                  {
                    data: data,
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.85} // from react-native
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

          {/* <StyledButton
          type="primary"
          content="Vocab"
          onPress={() =>
            navigation.navigate("VocabProgress", {
              userId: context.state.userId,
            })
          }
        /> */}
          {/* <StyledButton
            type="primary"
            content="Quiz"
            onPress={() =>
              navigation.navigate("QuizProgress", {
                userId: context.state.userId,
              })
            }
          /> */}
        </View>

        <View style={styles.rankingBtn}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Ranking", {
                lang: context.state.currentLang,
              })
            }
          >
            <MaterialIcons name="leaderboard" size={28} color="red" />
          </TouchableOpacity>
        </View>

        <View style={styles.deleteBtn}>
          <TouchableOpacity onPress={() => logoutUser(context.dispatch)}>
            <Text style={styles.deleteText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    elevation: 4,
  },
  head1: {
    fontSize: 18,
    fontWeight: "700",
    margin: 3,
  },
  head2: {
    fontStyle: "italic",
  },
  headerText1: {
    marginLeft: 10,
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  userInfoSection: {
    marginLeft: 10,
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderColor: "#000",
    borderWidth: 0.6,
    marginVertical: 10,
    marginRight: 10,
  },
  userSec: {
    flexDirection: "column",
    justifyContent: "center",
  },
  progressBody: {
    borderBottomWidth: 0.4,
  },
  progressTxt: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  rankingBtn: {
    position: "absolute",
    top: 10,
    right: 15,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#000",
    borderRadius: 500,
  },
  deleteBtn: {
    marginTop: 20,
    marginBottom: 20,
    width: "92%",
    alignSelf: "center",
    height: 43,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: "red",
    padding: 2,
  },
  deleteText: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "700",
    padding: 5,
    color: "#fff",
    textTransform: "uppercase",
  },
});
