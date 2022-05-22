import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  increaseQunatity,
  decreaseQunatity,
  clearOrder,
} from "../../Redux/Actions/buyerActions";

const OrderPlacement = (props) => {
  useEffect(() => {
    if (props.order.length === 0) {
      props.navigation.goBack();
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      props.clearOrder
    );
    return () => backHandler.remove();
  }, [props.order]);

  var total_quantity = 0;
  var total_price = 0;
  props.order.forEach((element) => {
    total_quantity += element.quantity;
    total_price += element.item.price * element.quantity;
  });
  if (props.order.length !== 0) {
    var retailer = props.order[0].item.retailer;
    var shopID = typeof retailer === "object" ? retailer._id : retailer;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => {
            props.clearOrder();
            props.navigation.goBack();
          }}
          style={{
            marginHorizontal: 10,
            padding: 5,
          }}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={28}
            color="#785895"
          />
        </TouchableOpacity>
        <Text style={styles.title}>Order Placement</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.inline}>
        <View style={styles.cell} />
        <Text style={[styles.cell, styles.bold]}>Item</Text>
        <Text style={[styles.cell, styles.bold]}>Quantity</Text>
        <Text style={[styles.cell, styles.bold]}>Price</Text>
      </View>
      <View style={styles.line} />

      <FlatList
        data={props.order}
        renderItem={(ORDER) => <RenderItem item={ORDER} {...props} />}
        keyExtractor={(order) => order.item._id}
      />

      <View style={styles.line} />

      <View style={styles.inline}>
        <View style={styles.cell} />
        <Text style={[styles.cell, styles.bold]}>Total</Text>
        <Text style={[styles.cell, styles.bold, { textAlign: "center" }]}>
          {total_quantity}
        </Text>
        <Text style={[styles.cell, styles.bold]}>{total_price}</Text>
      </View>
      <View style={styles.line} />
      <TouchableOpacity
        style={[
          styles.inline,
          {
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          },
        ]}
        onPress={() =>
          props.navigation.navigate("Shop", {
            shopID,
          })
        }
      >
        <MaterialCommunityIcons
          name="cart-plus"
          size={24}
          color="cornflowerblue"
          style={{ marginRight: 15 }}
        />
        <Text
          style={{
            color: "cornflowerblue",
            fontSize: 18,
          }}
        >
          Add More Items
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.inline, styles.placeOrderButton]}
        onPress={() => {
          if (props.auth.isAuthenticated) {
            props.navigation.navigate("MapView", {
              text: "Hold the location icon, drag it to your loction",
              from: "OrderPlacement",
            });
          } else {
            props.navigation.navigate("LoginFirst");
          }
        }}
      >
        <>
          <MaterialCommunityIcons
            name="send-check-outline"
            size={24}
            color="white"
            style={{ marginRight: 15 }}
          />
          <Text style={{ color: "white" }}>Place Order</Text>
        </>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const RenderItem = (props) => {
  const order = props.item.item;
  return (
    <View style={[styles.inline, { marginBottom: 10 }]}>
      <Image style={styles.image} source={{ uri: order.item.images[0] }} />
      <Text style={styles.cell}>{order.item.name}</Text>
      <View style={[{ flexDirection: "row" }]}>
        <TouchableOpacity
          onPress={() => props.increaseQunatity(order.item._id)}
        >
          <MaterialCommunityIcons name="chevron-up" size={24} color="green" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{order.quantity}</Text>
        <TouchableOpacity
          onPress={() => props.decreaseQunatity(order.item._id)}
        >
          <MaterialCommunityIcons name="chevron-down" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.cell}>{order.item.price}/-</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 60,
  },
  title: {
    fontSize: 22,
    color: "#EB5170",
  },
  titleContainer: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
  },
  cell: {
    width: 75,
    alignItems: "center",
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginRight: 5,
  },
  line: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  bold: {
    fontWeight: "bold",
  },
  placeOrderButton: {
    backgroundColor: "orangered",
    paddingVertical: 10,
    justifyContent: "center",
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  quantity: {
    borderColor: "grey",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingTop: 2,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.buyer.order,
});

export default connect(mapStateToProps, {
  increaseQunatity,
  decreaseQunatity,
  clearOrder,
})(OrderPlacement);
