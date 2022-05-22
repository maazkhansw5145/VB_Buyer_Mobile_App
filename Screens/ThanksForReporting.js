import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ThanksForReporting = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={{ marginVertical: 20 }}>
          <MaterialCommunityIcons name="file-check" size={80} color="#785895" />
        </View>
        <Text style={styles.title}>Thanks For Reporting</Text>
        <Text style={styles.description}>
          We are very sorry for this misconvenience and will take strict action
          on your report to avoid such misconvenience in future.
        </Text>
        <Text style={styles.description}>
          Providing the best online shopping experience is our goal.
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => props.navigation.navigate("ItemsScreen")}
        >
          <Text style={{ color: "white" }}>OK</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    justifyContent: "center",
  },
  form: {
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 4,
    borderRadius: 30,
    backgroundColor: "white",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    fontFamily: "serif",
    alignSelf: "center",
    color: "#785895",
  },
  button: {
    width: 100,
    borderRadius: 20,
    alignItems: "center",
    fontSize: 18,
    paddingVertical: 10,
    elevation: 4,
    marginVertical: 10,
    backgroundColor: "#0064C3",
  },
  description: {
    fontSize: 15,
    marginVertical: 15,
    fontFamily: "serif",
    marginHorizontal: 15,
    color: "black",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default ThanksForReporting;
