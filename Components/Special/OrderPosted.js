import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { clearMessage } from "../../Redux/Actions/buyerActions";
import LottieView from "lottie-react-native";

function OrderPosted(props) {
  useEffect(() => {
    if (props.buyer.msg !== "") {
      props.clearMessage();
    }
  }, [props.buyer.msg]);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <LottieView
              source={require("../../assets/animations/order-placed.json")}
              autoPlay
              style={{ height: 200, width: 200 }}
            />
        <Text style={{ color: "cornflowerblue", fontSize: 20, marginVertical: 10 }}>
          Thanks For Ordering
        </Text>
        <Text style={styles.msg}>
          You will be notified when the order is delivered.
        </Text>
        <Text style={styles.msg}>
          You can also track order in the order tracking section.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("ItemsScreen");
          }}
        >
          <Text style={{ color: "white", marginLeft: 10 }}>
            Back to Home Screen
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "lightgray",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    marginHorizontal: 10,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    borderRadius: 30,
    backgroundColor: "white",
    paddingVertical: 30,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    elevation: 2,
    backgroundColor: "#B95291",
    marginTop: 15,
  },
  msg: {
    color: "black",
    fontStyle: "italic",
    fontSize: 15,
    margin: 12,
    textAlign: "center",
    fontFamily:'serif'
  },
});

const mapStateToProps = (state) => ({
  buyer: state.buyer,
});

export default connect(mapStateToProps, {
  clearMessage,
})(OrderPosted);
