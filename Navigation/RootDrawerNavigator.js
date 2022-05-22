import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import { StyleSheet, View, Text, Image } from "react-native";
import { Rating } from "react-native-ratings";
import StackNavigator from "./StackNavigator";
import { connect } from "react-redux";

const DrawerNavigator = createDrawerNavigator();

const RootNavigator = (props) => {
  return (
    <DrawerNavigator.Navigator
      screenOptions={{ gestureEnabled: props.auth.isAuthenticated }}
      drawerContent={(navProps) => (
        <DrawerContent {...navProps} auth={props.auth} />
      )}
    >
      <DrawerNavigator.Screen
        name="StackNavigator"
        component={StackNavigator}
      />
    </DrawerNavigator.Navigator>
  );
};
const DrawerContent = (props) => {
  return (
    <Drawer.Section style={{ justifyContent: "center", height: "100%" }}>
      {props.auth.isAuthenticated && (
        <View style={styles.userContainer}>
          {props.auth.user.image ? (
            <Image
              style={styles.image}
              source={{ uri: props.auth.user.image }}
            />
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>{props.auth.user.name[0]}</Text>
            </View>
          )}
          <Rating
            ratingCount={5}
            startingValue={3}
            readonly={true}
            imageSize={20}
          />
          <Text style={styles.name}>{props.auth.user.name}</Text>
        </View>
      )}
      <View style={styles.line} />
      <Drawer.Item
        label="Profile"
        icon="face-man-profile"
        onPress={() => {
          props.navigation.navigate("Profile");
        }}
      />
      <Drawer.Item
        label="Current Location"
        icon="google-maps"
        onPress={() => {
          props.navigation.navigate("MapView", {
            text: `To change your location, hold the location icon, drag it to your exact loction`,
          });
        }}
      />
      <Drawer.Item
        label="Order Tracking"
        icon="truck-delivery"
        onPress={() => {
          props.navigation.navigate("OrderTracking");
        }}
      />
      <Drawer.Item
        label="Cart"
        icon="cart"
        onPress={() => {
          props.navigation.navigate("Cart");
        }}
      />
      <Drawer.Item
        label="History"
        icon="history"
        onPress={() => {
          props.navigation.navigate("History");
        }}
      />
      <Drawer.Item
        label="Contact Us"
        icon="cellphone-message"
        onPress={() => {
          props.navigation.navigate("ContactUs");
        }}
      />
      <Drawer.Item
        label="Register Shop"
        icon="store"
        onPress={() => {
          props.navigation.navigate("RegisterShop");
        }}
      />
      <Drawer.Item
        label="Logout"
        icon="logout"
        onPress={() => {
          props.navigation.navigate("Logout");
        }}
      />
    </Drawer.Section>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    marginVertical: 10,
    marginHorizontal: "auto",
    alignItems: "center",
  },
  image: {
    marginVertical: 35,
    resizeMode: "cover",
    height: 150,
    width: 150,
    borderRadius: 70,
    marginHorizontal: "auto",
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    color:'#B95291',
    fontFamily:'serif'
  },
  line: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  noImageContainer: {
    width: 150,
    height: 140,
    borderRadius: 70,
    marginBottom: 15,
    backgroundColor: "slateblue",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    fontSize: 30,
    margin: "auto",
    color: "white",
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RootNavigator);
