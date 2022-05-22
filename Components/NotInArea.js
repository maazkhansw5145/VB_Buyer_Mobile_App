import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function NotInArea(props) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="sentiment-very-dissatisfied"
        size={50}
        color="gray"
        style={{ marginBottom: 20 }}
      />
      {props.random ? (
        <Text style={styles.text}>
          Fast Food Is Not Available In Your Area Yet
        </Text>
      ) : (
        <Text style={styles.text}>
          This Item Is Not Available In Your Area Yet
        </Text>
      )}
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "gray",
    fontSize: 15,
    fontStyle: "italic",
    marginBottom: 10,
    fontFamily: "serif",
  },
});
