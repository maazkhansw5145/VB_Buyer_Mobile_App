import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function List({ data, parent, navigation }) {
  console.log("DATA",data)
  var date;
  var time;
  if(parent === "historyscreen"){
    date = new Date(data.receivedAt).toLocaleDateString();
    time = new Date(data.receivedAt).toLocaleTimeString();
  } else {
    date = new Date(data.sendAt).toLocaleDateString();
    time = new Date(data.sendAt).toLocaleTimeString();
  }

  return (
    <View
      style={{ borderRadius: 30, backgroundColor: "lightgray", padding: 15,
      marginTop: 15,
    }}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={{ uri: data.order[0].item.images[0] }}
              style={styles.image}
            />
          </View>
          <View>
            <View style={styles.itemsContainer}>
              <Text style={styles.highlightedText}>
                {data.order[0].item.name}
              </Text>
            </View>
            <Text style={styles.retailerName}>{data.seller.name}</Text>
          </View>
        </View>
        <View>
          <Text>{date}</Text>
          <Text style={{ color: "cornflowerblue" }}>{time}</Text>
        </View>
      </View>
      {parent === "historyscreen" && (
        <View style={styles.actionContainer}>
          {!data.buyerReview && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ReportScreen", {
                  orderId: data._id,
                  buyerId: data.buyer,
                  sellerId: data.seller._id,
                })
              }
              style={styles.reportButton}
            >
              <MaterialIcons
                name="report"
                size={20}
                color="#B95291"
                style={{ marginRight: 7 }}
              />
              <Text style={{ color: "#B95291", fontSize: 15 }}>Report</Text>
            </TouchableOpacity>
          )}
          <View style={{ flexDirection: "row",flex:1,justifyContent:'flex-end' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Receipt", { id: data._id })}
            >
              <MaterialCommunityIcons
                name="receipt"
                size={28}
                color="#ff9900"
              />
            </TouchableOpacity>
            {!data.buyerReview && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Rate", {
                    order: data.order,
                    buyerId: data.buyer,
                    orderId: data._id,
                  })
                }
              >
                <MaterialCommunityIcons
                  name="star"
                  size={28}
                  color="#ff9900"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemsContainer: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 20,
  },
  itemsNumber: {
    fontSize: 16,
  },
  retailerName: { fontStyle: "italic", color: "cornflowerblue" },
  actionContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  highlightedText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reportButton: {
    flexDirection: "row",
    width: 90,
    alignItems:'center'
  },
});
