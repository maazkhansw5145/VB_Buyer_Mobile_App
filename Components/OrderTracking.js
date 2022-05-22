import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Stepper from "./Stepper";
import List from "./Special/List";
import { MaterialIcons } from "@expo/vector-icons";

const OrderTracking = (props) => {
  const { sendAt, status } = props.item.item;
  const orderStatusNumber = findOrderStatusNumber(status);
  var currentTime = new Date();
  var orderTime = new Date(sendAt);
  var timeDifference = currentTime - orderTime;
  var orderTimeDifference = Math.round(timeDifference / 1000 / 60);
  return (
    <View>
      <View>
        <List data={props.item.item} />
      </View>
      <View style={styles.stepperWrapper}>
        <Stepper orderStatusNumber={orderStatusNumber} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={[styles.descriptionText, styles.italic]}>
          {orderStatusDescription(orderStatusNumber)}
        </Text>
      </View>
      {(props.item.item.nich === "Fast Food" && orderTimeDifference < 15) ||
      (props.item.item.nich !== "Fast Food" && orderTimeDifference < 120) ? (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
            props.navigation.navigate("OrderCanceling", {
              orderId: props.item.item._id,
            })
          }
        >
          <MaterialIcons name="cancel" size={24} color="white" />
          <Text style={styles.cancelText}>Cancel Order</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <View style={styles.line} />
    </View>
  );
};

const findOrderStatusNumber = (status) => {
  switch (status) {
    case "new":
      return 0;
    case "accepted":
      return 1;
    case "pending to deliver":
      return 1;
    case "delivering":
      return 2;
    case "completed":
      return 3;
    default:
      break;
  }
};

const orderStatusDescription = (statusNumber) => {
  switch (statusNumber) {
    case 0:
      return "Order sent. Wait for seller's response";
    case 1:
      return "Working on your order";
    case 2:
      return "Your order is with delivery boy, coming towards you";
    case 3:
      return "Your order has arrived at the location, please go and get it";
    default:
      break;
  }
};

const styles = StyleSheet.create({
  stepperWrapper: {
    marginVertical: 10,
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  descriptionContainer: {
    backgroundColor: "#09942e",
    borderRadius: 20,
    padding: 10,
    elevation: 4,
    alignItems: "center",
  },
  descriptionText: {
    color: "white",
  },
  cancelButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a10618",
    borderRadius: 15,
    padding: 10,
    marginTop: 15,
  },
  cancelText: {
    color: "white",
    marginLeft: 15,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 20,
  },
});

export default OrderTracking;
