import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { currentLocation, getAddress } from "../Constants/currentLocation";
import Loading from "./Special/Loading";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { setLocation } from "../Redux/Actions/authActions";
import { clearOrder, postOrder } from "../Redux/Actions/buyerActions";

function MapViewComponent(props) {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (props.buyer.msg === "Order Send Successfully!") {
      props.navigation.navigate("OrderPosted");
    }
  }, [props.buyer.msg]);

  useEffect(() => {
    let loc = currentLocation();
    loc.then((l) => {
      if (l === "Permission denied") {
        showAlert();
      } else {
        setCoordinates({
          latitude: l.coords.latitude,
          longitude: l.coords.longitude,
        });
      }
    });
  }, []);

  if (!coordinates) {
    return <Loading />;
  }
  function showAlert() {
    Alert.alert(
      "Location Permission Denied",
      "We cannot proceed without your location.",
      [
        {
          text: "Try Again",
          onPress: () => myLocation(),
        },
        {
          text: "Cancel",
          onPress: () => props.navigation.navigate("ItemsScreen"),
        },
      ]
    );
  }

  function myLocation() {
    let loc = currentLocation();
    loc.then((l) => {
      if (l === "Permission denied") {
        showAlert();
      } else {
        setCoordinates({
          latitude: l.coords.latitude,
          longitude: l.coords.longitude,
        });
      }
    });
  }
  const setLocationWithAuth = () => {
    props.setLocation(props.auth.user.id, coordinates);
    if (props.route.params.from === "OrderPlacement") {
      setLoading(true);
      getAddress(coordinates.latitude, coordinates.longitude).then(
        (address) => {
          if (props.auth.user.contact) {
            props.postOrder({
              order: props.buyer.order,
              buyerID: props.auth.user.id,
              sellerID: props.buyer.order[0].item.retailer._id,
              location: props.auth.location,
              address,
            });
          } else {
            props.navigation.navigate("PhoneAuthentication", {
              for: "sendOrder",
              address: address,
            });
          }
        }
      );
    } else {
      props.navigation.navigate("ItemsScreen");
    }
  };

  const registerShop = () => {
    getAddress(coordinates.latitude, coordinates.longitude).then((address) => {
      var shopData = {
        ...props.route.params.shopData,
        location: [coordinates.latitude, coordinates.longitude],
        address,
      };
      props.navigation.navigate("PhoneAuthentication", {
        for: "registerShop",
        shopData,
      });
    });
  };

  const setLocationWithoutAuth = () => {
    props.setLocation(null, coordinates);
    props.navigation.navigate("ItemsScreen", { tab: props.route.params.from });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="hybrid"
      >
        <Marker
          draggable
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }}
          onDragEnd={(e) => setCoordinates(e.nativeEvent.coordinate)}
        />
      </MapView>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
          props.clearOrder();
        }}
        style={[styles.overlay, styles.backButton]}
      >
        <MaterialIcons
          name="keyboard-backspace"
          size={24}
          color="black"
          style={{ padding: 15 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.overlay, styles.myLocation]}
        onPress={myLocation}
      >
        <MaterialIcons
          name="my-location"
          size={24}
          color="orangered"
          style={{ padding: 15 }}
        />
      </TouchableOpacity>

      <View style={styles.text}>
        <Text>{props.route.params.text} and press &#10140;</Text>
      </View>
      <TouchableOpacity
        style={[styles.overlay, styles.done]}
        disabled={loading}
        onPress={() => {
          props.route.params.for === "registerShop"
            ? registerShop()
            : props.auth.isAuthenticated
            ? setLocationWithAuth()
            : setLocationWithoutAuth();
        }}
      >
        {!loading ? (
          <Ionicons
            name="checkmark-done-sharp"
            size={28}
            color="#1a75ff"
            style={{ padding: 12 }}
          />
        ) : (
          <Loading />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(236, 236, 236,0.8)",
    // padding: 15,
    borderRadius: 30,
  },
  myLocation: {
    top: 10,
    right: 10,
  },
  backButton: {
    top: 10,
    left: 10,
  },
  done: {
    bottom: 11,
    right: 10,
  },
  text: {
    bottom: 10,
    left: 10,
    width: Dimensions.get("window").width - 80,
    position: "absolute",
    backgroundColor: "rgba(236, 236, 236,0.9)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    elevation: 4,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  buyer: state.buyer,
});

export default connect(mapStateToProps, { setLocation, clearOrder, postOrder })(
  MapViewComponent
);
