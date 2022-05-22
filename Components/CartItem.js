import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { removeFromCart } from "../Redux/Actions/authActions";
import { getOrder } from "../Redux/Actions/buyerActions";
import ErrorAlert from "./Special/ErrorAlert";
import { Popup } from "popup-ui";

const CartItem = (props) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.error) {
      setError(props.error);
    }
  }, [props]);

  const item = props.item.item;
  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: item.images[0] }}
        />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>Price : {item.price}</Text>
        </View>
      </View>
      {error && <ErrorAlert error={error} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e60000" }]}
          onPress={() => {
            props.removeFromCart(props.buyerID, item._id);
            Popup.show({
              type: "Success",
              title:"Done",
              textBody: "Item Removed Successfully",
              button: true,
              buttonText: "Ok",
              callback: () => Popup.hide(),
            });
          }}
        >
          <>
            <MaterialCommunityIcons
              name="delete-forever"
              size={24}
              color="white"
            />
            <Text style={{ color: "white" }}>Delete</Text>
          </>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#00cc00" }]}
          onPress={() => {
            props.getOrder(item);
            props.navigation.navigate("OrderPlacement");
          }}
        >
          <>
            <MaterialCommunityIcons name="cart" size={24} color="white" />
            <Text style={{ color: "white" }}>Buy</Text>
          </>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
  },
  image: {
    width: 135,
    height: 135,
    marginRight: 10,
    borderRadius: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  description: {
    fontSize: 14,
    fontStyle: "italic",
    color: "cornflowerblue",
    fontFamily: "serif",
    marginVertical: 10,
    width: Dimensions.get("window").width - 160,
  },
  price: {
    fontSize: 18,
    color: "orangered",
    fontFamily: "serif",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
  },
  button: {
    width: "40%",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 4,
  },
  line: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginVertical: 15,
  },
});

const mapStateToProps = (state) => ({
  buyerID: state.auth.user.id,
  error: state.error.error,
});

export default connect(mapStateToProps, { removeFromCart, getOrder })(CartItem);
