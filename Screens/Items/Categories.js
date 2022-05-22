import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Categories = (props) => {
  return (
    <View>
      {props.for === "fastFood" ? (
        <View style={styles.container}>
          <ScrollView horizontal={true} >
            <Text
              onPress={() => props.changeSearchKeyword("random")}
              style={[
                styles.category,
                props.searchKeyword === "random" ? styles.active : styles.inactive,
              ]}
            >
              Random
            </Text>
            <Text
              onPress={() => props.changeSearchKeyword("burger")}
              style={[
                styles.category,
                props.searchKeyword === "burger" ? styles.active : styles.inactive,
              ]}
            >
              Burger
            </Text>
            <Text
              onPress={() => props.changeSearchKeyword("pizza")}
              style={[
                styles.category,
                props.searchKeyword === "pizza" ? styles.active : styles.inactive,
              ]}
            >
              Pizza
            </Text>
            <Text
              onPress={() => props.changeSearchKeyword("rice")}
              style={[
                styles.category,
                props.searchKeyword === "rice" ? styles.active : styles.inactive,
              ]}
            >
              Rice
            </Text>
            <Text
              onPress={() => props.changeSearchKeyword("meat")}
              style={[
                styles.category,
                props.searchKeyword === "meat" ? styles.active : styles.inactive,
              ]}
            >
              Meat
            </Text>
            <Text
              onPress={() => props.changeSearchKeyword("deals")}
              style={[
                styles.category,
                props.searchKeyword === "deals" ? styles.active : styles.inactive,
              ]}
            >
              Deals
            </Text>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView horizontal={true}>
            <Text
              onPress={() => props.setCategory("random")}
              style={[
                styles.category,
                props.category === "random" ? styles.active : styles.inactive,
              ]}
            >
              Random
            </Text>
            <Text
              onPress={() => props.setCategory("electronics")}
              style={[
                styles.category,
                props.category === "electronics"
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              Electronics
            </Text>
            <Text
              onPress={() => props.setCategory("shoes")}
              style={[
                styles.category,
                props.category === "shoes"
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              Shoes
            </Text>
            <Text
              onPress={() => props.setCategory("glasses")}
              style={[
                styles.category,
                props.category === "glasses" ? styles.active : styles.inactive,
              ]}
            >
              Glasses
            </Text>
            <Text
              onPress={() => props.setCategory("mens_cloths")}
              style={[
                styles.category,
                props.category === "mens_cloths"
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              Men's Cloths
            </Text>
            <Text
              onPress={() => props.setCategory("kids_cloths")}
              style={[
                styles.category,
                props.category === "kids_cloths"
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              Kid's Cloths
            </Text>
            <Text
              onPress={() => props.setCategory("womens_cloths")}
              style={[
                styles.category,
                props.category === "womens_cloths"
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              Women's Cloths
            </Text>
            <Text
              onPress={() => props.setCategory("watches")}
              style={[
                styles.category,
                props.category === "watches" ? styles.active : styles.inactive,
              ]}
            >
              Watches
            </Text>
            <Text
              onPress={() => props.setCategory("perfumes")}
              style={[
                styles.category,
                props.category === "perfumes" ? styles.active : styles.inactive,
              ]}
            >
              Perfumes
            </Text>
            <Text
              onPress={() => props.setCategory("sports")}
              style={[
                styles.category,
                props.category === "sports" ? styles.active : styles.inactive,
              ]}
            >
              Sports
            </Text>
            <Text
              onPress={() => props.setCategory("toys")}
              style={[
                styles.category,
                props.category === "toys" ? styles.active : styles.inactive,
              ]}
            >
              Toys
            </Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 15,
  },
  category: {
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  active: {
    backgroundColor: "#42557E",
    color: "white",
  },
  inactive: {
    backgroundColor: "lightgray",
    color: "black",
  },
});

export default Categories;
