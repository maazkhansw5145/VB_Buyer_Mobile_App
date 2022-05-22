import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import FastFoodItemsScreen from "./FastFoodItemsScreen";
import MallItemsScreen from "./MallItemsScreen";
import { connect } from "react-redux";
import * as Notifications from "expo-notifications";
import { newNotification } from "../../Redux/Actions/authActions";
import { clearOrder } from "../../Redux/Actions/buyerActions";
import NearbyItemsScreen from "./NearbyItemsScreen";

export function ItemsScreen(props) {
  const [activeTab, setActiveTab] = useState("mall");
  useEffect(() => {
    if (props.auth.welcomePage === "notSeen") {
      props.navigation.navigate("WelcomeScreen");
    }
  }, []);

  useEffect(() => {
    if (props.route.params) {
      setActiveTab(props.route.params.tab);
    }
  }, [props.route.params]);

  // When auth state changes It causes problem
  if (props.auth.isAuthenticated) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    // const lastNotificationResponse =
    // Notifications.useLastNotificationResponse();
    Notifications.addNotificationReceivedListener(() =>
      props.newNotification(true)
    );
  }
  // useEffect(() => {
  //   if (lastNotificationResponse) {
  //     props.navigation.navigate("Notifications");
  //   }
  // }, [lastNotificationResponse]);

  return (
    <View style={{ flex: 1 }}>
      {activeTab === "fast_food" ? (
        <FastFoodItemsScreen
          navigation={props.navigation}
          setActiveTab={setActiveTab}
        />
      ) : activeTab === "mall" ? (
        <MallItemsScreen
          navigation={props.navigation}
          setActiveTab={setActiveTab}
        />
      ) : (
        <NearbyItemsScreen navigation={props.navigation} />
      )}

      <View style={styles.bottomActionArea}>
        <TouchableOpacity
          onPress={() => setActiveTab("mall")}
          style={styles.bottomActionAreaIcon}
        >
          <MaterialIcons
            name="store"
            size={22}
            style={activeTab === "mall" ? styles.active : styles.inActive}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (props.auth.location) {
              setActiveTab("fast_food");
            } else {
              props.navigation.navigate("MapView", {
                text: "Hold the location icon, drag it to your exact loction",
                from: "fast_food",
              });
            }
          }}
          style={styles.bottomActionAreaIcon}
        >
          <MaterialIcons
            name="fastfood"
            size={22}
            style={activeTab === "fast_food" ? styles.active : styles.inActive}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomActionArea: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#B95291",
    bottom: 0,
    width: "100%",
  },
  bottomActionAreaIcon: {
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
  active: {
    color: "#24091b",
  },
  inActive: {
    color: "white",
  },
  location: {
    flexDirection: "row",
    marginLeft: 10,
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.buyer.order,
});

export default connect(mapStateToProps, { newNotification, clearOrder })(
  ItemsScreen
);
