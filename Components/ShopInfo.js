import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ShopInfo = (props) => {
  return (
    <View>
      <View style={styles.introContainer}>
        <View style={styles.metaData}>
          {props.shopDetails.image ? (
            <Image
              style={styles.logo}
              resizeMode="cover"
              source={{
                uri: props.shopDetails.image,
              }}
            />
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>
                {props.shopDetails.name[0]}
              </Text>
            </View>
          )}
          <View>
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {props.shopDetails.name}
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              {props.shopDetails.owner}
            </Text>
            <Text style={{ fontStyle: "italic", color: "white" }}>
              {props.shopDetails.address}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.performanceContainer}>
        <View style={styles.performanceElement}>
          <Text style={{ fontWeight: "bold" }}>Contact</Text>
          <Text style={{ fontStyle: "italic" }}>
            {props.shopDetails.contact}
          </Text>
        </View>
        <View style={styles.performanceElement}>
          <Text style={{ fontWeight: "bold" }}>Status</Text>
          <Text style={{ fontStyle: "italic" }}>
            {props.shopDetails.status}
          </Text>
        </View>
        <View style={styles.performanceElement}>
          <Text style={{ fontWeight: "bold" }}>Delivery</Text>
          <Text style={{ fontStyle: "italic" }}>
            {props.shopDetails.self_delivering ? "Self Delivery" : "TCS"}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  introContainer: {
    backgroundColor: "#ff7883",
    paddingBottom: 30,
    paddingTop: 40,
    marginBottom: 10,
    elevation: 6,
  },
  metaData: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  performanceContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingVertical: 20,
  },
  performanceElement: {
    alignItems: "center",
  },
  divider: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 10,
    marginBottom: 10,
  },
  noImageContainer: {
    borderRadius: 30,
    width: 100,
    height: 100,
    color: "black",
    backgroundColor: "#B95291",
    alignItems: "center",
  },
  noImageText: {
    fontSize: 30,
    color: "white",
    top: "25%",
  },
});

export default ShopInfo;
