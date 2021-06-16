import React from "react";
import { StyleSheet } from "react-native";
import { View, Text ,Image} from "react-native";

const Elephant: React.FC = () => {
  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/1.png')} />
    </View>
  );
};

export default Elephant;
const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 20,
        top: 100,
        alignItems: 'center',
    },
    logo:{
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },

});