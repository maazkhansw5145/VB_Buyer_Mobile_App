import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";
import Rate from "../../Components/Rate";
import {submiteReview} from '../../Constants/API'
export default function RatingScreen(props) {
  const [ratingsObject, setRatingsObject] = useState([]);
  const [error, setError] = useState(null);
  const { order, buyerId, orderId } = props.route.params;

  const pushRating = (itemId, rating) => {
    var done = false;
    ratingsObject.forEach((item) => {
      if (item.itemId === itemId) {
        done = true;
        return (item.rating = rating);
      }
    });
    if (!done) {
      setRatingsObject([
        ...ratingsObject,
        {
          itemId: itemId,
          rating,
        },
      ]);
    }
  };

  const pushReview = (itemId, review) => {
    var done = false;
    ratingsObject.forEach((item) => {
      if (item.itemId === itemId) {
        done = true;
        return (item.review = review);
      }
    });
    if (!done) {
      setRatingsObject([
        ...ratingsObject,
        {
          itemId: itemId,
          review,
        },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={order}
        renderItem={(item) => (
          <Rate
            item={item.item}
            pushRating={pushRating}
            pushReview={pushReview}
          />
        )}
        keyExtractor={(item) => item.item._id}
        ListFooterComponent={() => {
          return(
          <TouchableOpacity style={[styles.submitBtn, ratingsObject.length === 0 ? styles.inactve : styles.active]} onPress={() => { 
            submiteReview(buyerId,orderId,ratingsObject);
            Alert.alert(
              "Thanks For Review",
              "It would really help us to improve",
              [
                {
                  text: "OK",
                  onPress: () => props.navigation.navigate("ItemsScreen"),
                },
              ]
            );
            } }>
          <Text style={{color:'white'}}>Submit Review</Text>
        </TouchableOpacity>
        )
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical:10
  },
  submitBtn: {
    width: 160,
    borderRadius: 20,
    alignSelf:'center',
    alignItems: "center",
    fontSize: 18,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginVertical: 25,
    color:"white"
  },
  active: {
    backgroundColor: "#0064C3",
  },
  inactve: {
    backgroundColor: "lightgrey",
  },
});
