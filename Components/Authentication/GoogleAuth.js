import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import { GoogleAuth_android } from "../../Constants/config";
import { connect } from "react-redux";
import { register } from "../../Redux/Actions/authActions";

const googleAuthLogic = async (props) => {
  try {
    const { type, user, accessToken } = await Google.logInAsync({
      androidClientId: GoogleAuth_android,
    });
console.log(type)
    if (type === "success") {
      // Then you can use the Google REST API
      props.register({
        name: user.name,
        loginID: user.email,
        image: user.photoUrl,
        password: user.id,
        userID: user.id,
        location: [props.location.latitude, props.location.longitude],
      });
      if (props.order.length === 0) {
        props.navigation.navigate("ItemsScreen");
      } else {
        props.navigation.navigate("OrderPlacement");
      }
    } else {
      props.navigation.navigate("ItemsScreen");
    }
  } catch (error) {
    Alert.alert("Google Authenticaton Failed", error, [{ text: "OK" }]);
  }
};

function GoogleAuth(props) {
  return (
    <TouchableOpacity
      style={styles.googleAuthButton}
      onPress={() => googleAuthLogic(props)}
    >
      <>
        <FontAwesome name="google" size={24} color="white" />
        <Text style={styles.text}>Login With Google</Text>
      </>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleAuthButton: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 15,
    backgroundColor: "#DB4437",
    flexDirection: "row",
    elevation: 4,
  },
  text: {
    color: "white",
    alignSelf: "center",
    marginLeft: 15,
  },
});

const mapStateToProps = (state) => ({
  location: state.auth.location,
  order: state.buyer.order,
});

export default connect(mapStateToProps, { register })(GoogleAuth);
