import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { welcomePageSeen } from "../Redux/Actions/authActions";
import { AntDesign, FontAwesome5, Fontisto, Entypo } from "@expo/vector-icons";

const WelcomeScreen = (props) => {
  const [page, setPage] = useState(1);
  const done = () => {
    props.welcomePageSeen();
    props.navigation.navigate("ItemsScreen");
  };
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        {page === 1 ? (
          <View>
            <Text style={styles.title}>Welcome To Virtual Bazaar</Text>
            <Text style={styles.description}>
              This is testing version 1 of virtual bazaar.
            </Text>
            <Text style={styles.description}>
              Our goal is to provide the best experience to online shoppers by
              using the latest technologies like augmented reality, computer
              vision, and by enforcing strict frameworks to encouter fake
              deliveries.
            </Text>
            <Text style={styles.description}>
              <Text style={{ color: "orangered" }}>
                Your help is required, use the app and provide feedback.
              </Text>
              Suggest anything which you believe can improve your online
              shopping experience.
            </Text>
            <Text style={[styles.description, { color: "orangered" }]}>
              Note: The items and shops listed are dummy.
            </Text>
          </View>
        ) : page === 2 ? (
          <View>
            <AntDesign
              name="Safety"
              size={100}
              color="cornflowerblue"
              style={styles.icon}
            />
            <Text style={styles.title}>Genuine Products Only</Text>
            <Text style={styles.description}>
              There is a strong check on products and sellers.
            </Text>
            <Text style={styles.description}>
              We approve a seller or product after checking its validatity.
            </Text>
          </View>
        ) : page === 3 ? (
          <View>
            <FontAwesome5
              name="user-shield"
              size={100}
              color="cornflowerblue"
              style={styles.icon}
            />
            <Text style={styles.title}>We Value Your Privacy</Text>
            <Text style={styles.description}>We do not spy our users.</Text>
            <Text style={styles.description}>
              We would show items on the basis of ratings.
            </Text>
          </View>
        ) : page === 4 ? (
          <View>
            <Entypo
              name="location"
              size={100}
              color="cornflowerblue"
              style={styles.icon}
            />
            <Text style={styles.title}>Order From Nearby Shops</Text>
            <Text style={styles.description}>
              Now order products from nearby shops and get your product within
              hours.
            </Text>
            <Text style={styles.description}>
              Also save some delivery charges.
            </Text>
          </View>
        ) : (
          <View>
            <Fontisto
              name="shopping-store"
              size={100}
              color="cornflowerblue"
              style={styles.icon}
            />
            <Text style={styles.title}>Shop And Eat</Text>
            <Text style={styles.description}>
              You can buy products as well as order food at one place.
            </Text>
          </View>
        )}
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 20,
          }}
        >
          <View style={[styles.dot, styles.filled]} />
          <View style={[styles.dot, page > 1 && styles.filled]} />
          <View style={[styles.dot, page > 2 && styles.filled]} />
          <View style={[styles.dot, page > 3 && styles.filled]} />
          <View style={[styles.dot, page > 4 && styles.filled]} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          {page > 1 && (
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                setPage(page - 1);
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {"< Back"}
              </Text>
            </TouchableHighlight>
          )}
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              page < 5 ? setPage(page + 1) : done();
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {page < 5 ? "Next >" : "Done"}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    justifyContent: "center",
  },
  modalView: {
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 4,
    borderRadius: 30,
    backgroundColor: "white",
    paddingVertical: 40,
  },
  title: {
    fontSize: 20,
    fontStyle: "italic",
    marginVertical: 10,
    color: "purple",
    textAlign: "center",
    marginHorizontal: 10,
  },
  description: {
    fontSize: 15,
    marginVertical: 5,
    fontStyle: "italic",
    marginHorizontal: 14,
    color: "black",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    backgroundColor: "#a366ff",
    borderRadius: 15,
    paddingHorizontal: 25,
    marginTop: 10,
    elevation: 4,
  },
  icon: {
    alignSelf: "center",
    paddingHorizontal: 50,
    paddingVertical: 30,
  },
  dot: {
    marginHorizontal: 5,
    alignSelf: "center",
    borderColor: "violet",
    borderWidth: 1,
    borderRadius: 50,
    width: 10,
    height: 10,
  },
  filled: {
    backgroundColor: "violet",
  },
});

export default connect(null, { welcomePageSeen })(WelcomeScreen);
