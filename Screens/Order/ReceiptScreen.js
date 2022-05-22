import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loading from "../../Components/Special/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import url from "../../Constants/URL";

export function Receipt(props) {
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState(null);

  async function fetchData() {
    let user = await AsyncStorage.getItem("persist:auth");
    let token = JSON.parse(user).token;
    fetch(`${url}/receipt/${props.route.params.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((receipt) => {
        setReceipt(receipt);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  let date = new Date(receipt.sendAt).toLocaleDateString();
  let time = new Date(receipt.sendAt).toLocaleTimeString();
  var totalQuantity = 0;
  var subTotalPrice = 0;
  return (
    <View style={{ backgroundColor: "lightgray", flex:1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row",alignItems:'center' }}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={28}
            color="orangered"
            style={{    backgroundColor: "rgba(236, 236, 236,0.8)",
            padding: 8,
            borderRadius: 10,}}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <Text style={styles.title}>Receipt</Text>
        </View>

        <View style={styles.line} />
        <View>
          <View>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.bold]}>Order From</Text>
              <Text style={[styles.cell, styles.italic]}>
                {receipt.seller.name}
              </Text>
              <View style={styles.cell}></View>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={[styles.cell, styles.bold, { alignSelf: "center" }]}>
              Ordered At
            </Text>
            <Text style={[styles.cell, styles.italic,{color:'cornflowerblue'}]}>
              {date} {time}
            </Text>
            <Text style={styles.cell}></Text>
          </View>
        </View>

        <View>
          <View style={[styles.tableTitle, styles.row]}>
            <Text style={[styles.cell, styles.bold]}>Items</Text>
            <Text style={[styles.cell, styles.bold]}>Quantity</Text>
            <Text style={[styles.cell, styles.bold]}>Price</Text>
          </View>
          {receipt.order.map((order,i) => {
            {
              totalQuantity = totalQuantity + order.quantity;
            }
            {
              subTotalPrice = subTotalPrice + order.item.price;
            }
            return (
              <View style={[styles.orderItems, styles.row]} key={i}>
                <Text style={[styles.cell, styles.italic]}>
                  {order.item.name}
                </Text>
                <Text style={[styles.cell, styles.italic]}>
                  {order.quantity}
                </Text>
                <Text style={[styles.cell, styles.italic]}>
                  {order.item.price}
                </Text>
              </View>
            );
          })}
        </View>
        
        <View style={[styles.subTotal, styles.row]}>
          <Text style={[styles.cell, styles.bold]}>SubTotal</Text>
          <Text style={[styles.cell, styles.italic]}>{totalQuantity}</Text>
          <Text style={[styles.cell, styles.italic]}>{subTotalPrice}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Delivery</Text>
          <Text style={styles.cell} />
          <Text style={[styles.cell, styles.bold]}>Fee</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}></View>
          <Text style={styles.cell} />
          <Text style={[styles.cell, styles.italic]}>150</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold,{fontFamily:'serif'}]}>Total</Text>
          <View style={styles.cell}></View>
          <Text
            style={[
              styles.cell,
              { color: "orangered", fontWeight: "bold",fontSize:16},
            ]}
          >
            {subTotalPrice + 150}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 10,
  },
  cell: {
    width: 100,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "serif",
    color: "#785895",
    marginLeft:10
  },
  bold: {
    fontWeight: "bold",
    fontSize: 16,
  },
  italic: { fontStyle: "italic", fontSize: 16 },
  tableTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  orderItems: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Receipt;
