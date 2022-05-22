import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Linking
} from "react-native";
import { Rating } from "react-native-ratings";
import SlideShow from "../../Components/SlideShow";
import BuyerReviews from "../../Components/BuyerReviews";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/Actions/authActions";
import { getOrder, clearOrder } from "../../Redux/Actions/buyerActions";
import { Root, Toast } from "popup-ui";

const ItemPlacement = (props) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      props.clearOrder
    );
    return () => backHandler.remove();
  }, []);
  const item = props.route.params.item;
  if (props.auth.isAuthenticated) {
    var inCart = props.auth.user.cart.find(function (res) {
      if (res.item._id == item._id) return true;
    });
  }
  var shopID =
    typeof item.retailer === "object" ? item.retailer._id : item.retailer;
  const onBackButtonPress = () => {
    props.clearOrder();
    props.navigation.navigate("ItemsScreen");
  };
  return (
    <Root>
      <SlideShow images={item.images} onBackButtonPress={onBackButtonPress} />
      {(item.niche === "glasses" && item.model) && (
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "violet",
              margin: 10,
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 4,
              flexDirection: "row",
              justifyContent: "center",
            },
          ]}
          onPress={() => Linking.openURL(`https://vb-virtual-mirror.netlify.app?sku=${item.model}`)}
        >
          <MaterialCommunityIcons name="mirror" size={24} color={"white"} />
          <Text style={{ color: "white", marginLeft: 15, paddingVertical: 15 }}>
            Try Out - Using Virtual Mirror
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.container}>
        <View style={[styles.section, styles.aquamarine]}>
          <View style={{ alignItems: "center" }}>
            <Text>{item.name}</Text>
            {item.average_ratings ? (
              <Rating
                ratingCount={5}
                startingValue={item.average_ratings}
                readonly={true}
                showRating={false}
                imageSize={20}
                style={{ marginVertical: 5 }}
              />
            ) : (
              <Text style={{ fontStyle: "italic", color: "lightgrey" }}>
                No Ratings Yet
              </Text>
            )}
          </View>
          <Text style={{ fontSize: 18, color: "#EB5170" }}>
            Price: {item.price}
          </Text>
          <Text style={{ color: "#785895", marginVertical: 10 }}>
            Description :
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8, fontStyle: "italic" }}>
            {item.description}
          </Text>
        </View>
      </View>
      <Text style={styles.reviewTitle}>Customer's Reviews</Text>
      {item.reviews.length === 0 ? (
        <Text style={styles.noReviewText}>No Reviews Yet</Text>
      ) : (
        <FlatList
          data={item.reviews}
          keyExtractor={(item) => item.reviewAt}
          renderItem={(review) => <BuyerReviews review={review.item} />}
        />
      )}
      <View style={styles.bottomActionArea}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Shop", { shopID })}
        >
          <MaterialCommunityIcons name="store-outline" size={40} color="red" />
        </TouchableOpacity>
        {!inCart && (
          <TouchableOpacity
            style={[styles.button, styles.deepskyblue]}
            onPress={() => {
              if (props.auth.isAuthenticated) {
                props.addToCart(props.auth.user.id, item);
                Toast.show({
                  title: "Item Added To Cart Successfully",
                  text: "You can now order it anytime from your cart",
                  color: "#2ecc71",
                });
              } else {
                props.navigation.navigate("LoginFirst", {
                  item,
                });
              }
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}> Add To Cart</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.limegreen]}
          onPress={() => {
            props.getOrder(item);
            props.navigation.navigate("OrderPlacement");
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}> Buy Now</Text>
        </TouchableOpacity>
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  aquamarine: {
    backgroundColor: "white",
  },
  ratingContainer: {
    alignItems: "flex-start",
  },
  reviewTitle: {
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 10,
    color: "black",
  },
  bottomActionArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
    bottom: 0,
    width: "100%",
    position: "absolute",
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  limegreen: {
    backgroundColor: "limegreen",
  },
  deepskyblue: {
    backgroundColor: "deepskyblue",
  },
  noReviewText: {
    alignSelf: "center",
    color: "gray",
    fontStyle: "italic",
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addToCart, getOrder, clearOrder })(
  ItemPlacement
);
