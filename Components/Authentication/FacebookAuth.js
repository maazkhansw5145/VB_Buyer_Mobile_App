import React from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Facebook from "expo-facebook";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { register } from "../../Redux/Actions/authActions";
import { FacebookAppId } from "../../Constants/config";

const FacbookLoginLogic = async (props) => {
  try {
    await Facebook.initializeAsync({
      appId: FacebookAppId,
    });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });
    console.log("type",type)
    console.log("TOKEN",token)
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(200)`
        // `https://graph.facebook.com/me?access_token=${token}`

      )
        .then((response) => response.json())
        .then((data) => {
          props.register({
            name: data.name,
            loginID: data.email,
            image: data.picture.data.url,
            password: data.id,
            userID: data.id,
          });
          if (props.order.length === 0) {
            props.navigation.navigate("ItemsScreen");
          } else {
            props.navigation.navigate("OrderPlacement");
          }
        })
        .catch((e) => Alert.alert("Signup Error", e, [{ text: "OK" }]));
    } else {
      Alert.alert("Authenticaton Cancelled", "You have cancelled to login!", [
        { text: "OK" },
      ]);
    }
  } catch ({message}) {
    Alert.alert("Facebook Login Error", message, [{ text: "OK" }]);
  }
};

const FacebookAuth = (props) => {
  return (
    <TouchableOpacity
      style={styles.facebookAuthButton}
      onPress={() => FacbookLoginLogic(props)}
    >
      <>
        <FontAwesome5 name="facebook-f" size={24} color="white" />
        <Text style={styles.text}>Login With Facebook</Text>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  facebookAuthButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    backgroundColor: "#3b5998",
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

export default connect(mapStateToProps, { register })(FacebookAuth);
