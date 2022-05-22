import React from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { connect } from "react-redux";
import CartItem from "../../Components/CartItem";
import { Feather } from "@expo/vector-icons";
import { Root } from "popup-ui";
import LottieView from "lottie-react-native";

const CartScreen = (props) => {
  return (
    <Root style={{ flex: 1 }}>
      {props.cart.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>My Cart</Text>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.noItemContainer}
            onPress={() => props.navigation.navigate("ItemsScreen")}
          >
            <>
              <LottieView
                source={require("../../assets/animations/empty-cart.json")}
                autoPlay
                loop
                style={{height:250,width:250}}
              />
              <Text style={styles.text}>Empty Cart</Text>
            </>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={props.cart}
          ListHeaderComponent={() => (
            <View>
              <View
                style={{
                  paddingLeft: 25,
                  paddingVertical: 10,
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <Feather name="shopping-cart" size={28} color="violet" />
                <Text style={styles.title}>My Cart</Text>
              </View>
              <View style={styles.line} />
            </View>
          )}
          renderItem={(item) => (
            <CartItem item={item.item} navigation={props.navigation} />
          )}
          keyExtractor={(item) => item.item._id}
        />
      )}
    </Root>
  );
};

const styles = StyleSheet.create({
  noItemContainer: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:100
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    color: "#785895",
    marginTop: 10,
    marginLeft: 15,
    fontFamily: "serif",
  },
  text: {
    fontSize: 18,
    color: "gray",
    fontStyle: "italic",
    fontFamily: "serif",
  },
  line: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});

const mapStateToProps = (state) => ({
  cart: state.auth.user.cart,
});

export default connect(mapStateToProps)(CartScreen);
