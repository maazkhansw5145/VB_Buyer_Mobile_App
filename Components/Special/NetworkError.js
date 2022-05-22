import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NetworkError = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.icon}
        name="wifi-off"
        size={60}
        color="cornflowerblue"
      />
      <Text style={styles.text}>Unable to connect to the server</Text>
      <Text style={styles.text}>Kindly check your internet connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "auto",
  },
  icon: {
    marginHorizontal: "auto",
  },
  text: {
    alignItems: "center",
    fontSize: 25,
    color: "orangered",
    fontStyle:'italic',
  },
});

export default NetworkError;
