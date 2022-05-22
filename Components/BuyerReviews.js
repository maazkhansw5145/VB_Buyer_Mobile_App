import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";

export default function BuyerReviews({ review }) {
  const date = new Date(review.reviewAt).toLocaleDateString();
  const time = new Date(review.reviewAt).toLocaleTimeString();
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewText}>{review.review}</Text>
      </View>
      <View style={styles.ratingContainer}>
        {review.rating ? (
          <Rating
            ratingCount={5}
            startingValue={review.rating}
            readonly={true}
            showRating={false}
            imageSize={15}
          />
        ) : (
          <Text style={{ fontStyle: "italic" }}>Does not rate</Text>
        )}
        <Text style={styles.time}>
          {date} / {time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "white",
  },
  reviewContainer: {
    width: "60%",
  },
  reviewText: {
    color: "black",
    fontSize: 14,
    fontStyle: "italic",
    marginTop:10
  },
  ratingContainer: {
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  time: {
    fontStyle: "italic",
    fontSize: 12,
    marginTop: 10,
    color: "gray",
  },
});
