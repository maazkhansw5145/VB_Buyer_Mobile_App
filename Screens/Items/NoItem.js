import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { saveSearchString } from "../../Constants/API";
import LottieView from "lottie-react-native";

const NoItem = (props) => {
  useEffect(() => {
    if (props.searchString.length !== 0) {
      if (props.auth.isAuthenticated) {
        saveSearchString(
          props.searchString,
          props.auth.user.id,
          props.auth.location
        );
      } else {
        saveSearchString(props.searchString);
      }
    }
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 200,
      }}
    >
      {props.searchString.length === 0 ? (
        <>
          <MaterialIcons
            name="sentiment-very-dissatisfied"
            size={50}
            color="gray"
            style={{ marginBottom: 20 }}
          />
          <Text
            style={{
              color: "gray",
              fontSize: 18,
              fontStyle: "italic",
              fontFamily: "serif",
            }}
          >
            No item in this category yet
          </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 18,
              fontStyle: "italic",
              marginTop: 10,
              fontFamily: "serif",
            }}
          >
            Coming Soon
          </Text>
        </>
      ) : (
        <>
          <LottieView
            source={require("../../assets/animations/no-search-results.json")}
            autoPlay
            loop
            style={{ height: 100, width: 100, marginBottom: 30 }}
          />
          <Text
            style={{
              color: "gray",
              fontSize: 18,
              fontStyle: "italic",
              fontFamily: "serif",
            }}
          >
            No item found
          </Text>

          <Text
            style={{
              color: "gray",
              fontSize: 18,
              fontStyle: "italic",
              marginTop: 10,
              fontFamily: "serif",
            }}
          >
            Try a different keyword
          </Text>
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NoItem);
