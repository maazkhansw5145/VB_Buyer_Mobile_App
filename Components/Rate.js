import React from 'react'
import { View, Text,StyleSheet, TextInput,Image } from 'react-native'
import { AirbnbRating } from "react-native-ratings";

export default function Rate(props) {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>How much did you like it?</Text>
        <View style={styles.itemContainer}>
          <Image
            style={styles.image}
            source={{uri: props.item.item.images[0]}}
            resizeMode='cover'
          />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemName}>{props.item.item.name}</Text>
          </View>
        </View>
        <AirbnbRating
          count={5}
          reviews={["Terrible", "Bad", "Normal", "Good", "Excellent"]}
          defaultRating={3}
          onFinishRating={(rating) => props.pushRating(props.item.item._id,rating)}
          size={25}
        />
        <TextInput
          placeholder={"Any suggestion ? We value your suggestions."}
          multiline={true}
          style={styles.input}
          onChangeText={(text) => props.pushReview(props.item.item._id,text)}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontStyle: "italic",
  },
  input: {
    borderRadius: 4,
    paddingVertical: 10,
    borderWidth: 1,
    paddingLeft: 10,
    color: "black",
    marginTop: 30,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  itemContainer: {
    flexDirection: "row",
    marginVertical:15
  },
  itemTextContainer: {
    marginLeft: 15,
    justifyContent:"center"
  },
  itemName: {
    fontSize: 18,
  },
  retailerName: {
    fontSize: 18,
    fontStyle: "italic",
  },
});
