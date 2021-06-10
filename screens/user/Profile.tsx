import React, { useContext } from "react";

import { View, Text, Button, StyleSheet } from "react-native";
import { logoutUser } from "../../context/actions/authActions";
import AuthGlobal from "../../context/store/AuthGlobal";

const Profile: React.FC = () => {
  const context = useContext(AuthGlobal);

  return (
    <View style={styles.container}>
      <Text>Profile page</Text>

      <Button title="Logout" onPress={() => logoutUser(context.dispatch)} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
