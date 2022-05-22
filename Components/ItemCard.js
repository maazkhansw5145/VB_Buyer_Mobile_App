import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";

const ItemCard = (props) => {
  const item = props.item.item;
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          props.navigation.navigate("ItemPlacement", { item })
        }
      >
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={{ uri: item.images[0] }}
          />
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
            <Text style={{fontSize:13,fontStyle:'italic'}}>
              No Review Yet
            </Text>
          )}
          <Text style={styles.itemName}>{item.name}</Text>
          {item.retailer && (
            <View style={styles.textContainer}>
              <Text>
                <Text>Retailer: </Text>
                <Text style={{color:'cornflowerblue'}}>{item.retailer.name}</Text>
              </Text>
            </View>
          )}
          <View style={styles.textContainer}>
            <Text>
              <Text>Price: </Text>
              <Text style={[styles.bold,{color:'#f69954'}]}>{item.price}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    borderRadius: 5,
    width: 165,
    backgroundColor: "white",
  },
  content: {
    paddingBottom: 5,
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    marginVertical:5,
    textAlign:'center',
  },
  image: {
    marginBottom: 5,
    height: 130,
    minWidth: "100%",
    borderRadius:5
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  textContainer: {
    marginBottom: 7,
  },
});

export default ItemCard;
