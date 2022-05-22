import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Loading from "../../Components/Special/Loading";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetworkError from "../../Components/Special/NetworkError";
import url from "../../Constants/URL";
import OrderTracking from "../../Components/OrderTracking";
import LottieView from "lottie-react-native";

function OrderTrackingScreen(props) {
  const [loading, setLoading] = useState(true);
  const [onGoingOrders, setonGoingOrders] = useState(null);
  const [networkError, setNetworkError] = useState(null);

  const fetchData = async () => {
    let user = await AsyncStorage.getItem("persist:auth");
    let token = JSON.parse(user).token;
    fetch(`${url}/order/tracking/${props.auth.user.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((orders) => {
        setonGoingOrders(orders);
        setLoading(false);
      })
      .catch((e) => {
        setNetworkError("Failed to fetch");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (networkError) {
    return (
      <View>
        <Text>
          <NetworkError />
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1}}>
      <Text style={styles.title}>Order Tracking</Text>
      <View style={styles.line} />
      {!loading && onGoingOrders.length === 0 ? (
        <TouchableOpacity
          style={styles.nothingToTrackContainer}
          onPress={() => props.navigation.navigate("ItemsScreen")}
        >
          <>
            <LottieView
              source={require("../../assets/animations/order-tracking.json")}
              autoPlay
              loop
              style={{ height: 200, width: 200 }}
            />
            <Text style={styles.nothingToTrackText}>
              No ongoing Order To Track
            </Text>
          </>
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={onGoingOrders}
            renderItem={(item) => (
              <OrderTracking item={item} navigation={props.navigation} />
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 75 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 22,
    marginVertical: 8,
    fontFamily: "serif",
    marginLeft: 30,
    color: "#785895",
  },
  nothingToTrackContainer: {
    alignItems: "center",
    color: "rgb(169,169,169)",
    justifyContent: "center",
    flex:1,
    marginBottom:50
  },
  nothingToTrackText: {
    fontSize: 18,
    color: "gray",
    fontFamily: "serif",
    marginTop:30,
    fontStyle:'italic'
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginTop: 10,
    marginHorizontal: 25,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(OrderTrackingScreen);
