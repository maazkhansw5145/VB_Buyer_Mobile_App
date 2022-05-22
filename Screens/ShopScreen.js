import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import ItemCard from "../Components/ItemCard";
import Loading from "../Components/Special/Loading";
import screenWidth from "../Constants/screenWidth";
import url from "../Constants/URL";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ShopInfo from "../Components/ShopInfo";

export function Shop(props) {
  const [items, setItems] = useState([]);
  const [shopDetails, setShopDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${url}/visit/shop/${props.route.params.shopID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setItems(response.items);
        setShopDetails({
          name: response.name,
          owner: response.owner,
          type: response.type,
          // location: response.location,
          contact: response.phoneNumber,
          image: response.image,
          address: response.address,
          status: response.status,
          self_delivering: response.self_delivering,
        });
        setLoading(false);
      })
      .catch((e) => {
        setError(e.castError);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={28}
          color="black"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <Text style={{ marginLeft: "30%", fontWeight: "bold" }}>
          Shop Profile
        </Text>
      </View>
      <FlatList
        ListHeaderComponent={() => <ShopInfo shopDetails={shopDetails} />}
        data={items}
        numColumns={screenWidth()}
        renderItem={(item) => (
          <ItemCard item={item} navigation={props.navigation} />
        )}
        style={{ marginBottom: 60 }}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 10,
  },
  errorContainer: {
    justifyContent: "center",
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 22,
  },
});

export default Shop;
