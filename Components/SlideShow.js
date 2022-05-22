import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const SlideShow = (props) => {
  const [imageNumber, setImageNumber] = useState(1);
  return (
    <View>
      <ImageBackground
        source={{ uri: props.images[imageNumber - 1] }}
        style={styles.image}
      >
        <TouchableOpacity
            onPress={() => props.onBackButtonPress()}
            style={styles.backButton}
          >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={28}
            color="orangered"
          />
          </TouchableOpacity>
        {imageNumber !== 1 && (
          <TouchableOpacity
            onPress={() => setImageNumber(imageNumber - 1)}
            style={styles.leftButton}
          >
            <AntDesign name="left" size={24} color="cornflowerblue" />
          </TouchableOpacity>
        )}
        {imageNumber !== props.images.length && (
          <TouchableOpacity
            onPress={() => setImageNumber(imageNumber + 1)}
            style={styles.rightButton}
          >
            <AntDesign name="right" size={24} color="cornflowerblue" />
          </TouchableOpacity>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  leftButton: {
    position: "absolute",
    left: 20,
    top: "50%",
    backgroundColor: "rgba(236, 236, 236,0.4);",
    padding: 5,
    borderRadius: 40,
  },
  rightButton: {
    position: "absolute",
    right: 20,
    top: "50%",
    backgroundColor: "rgba(236, 236, 236,0.4)",
    padding: 5,
    borderRadius: 40,
  },
  backButton:{
    margin:20,
    position:'absolute',
    backgroundColor: "rgba(236, 236, 236,0.4)",
    padding: 5,
    borderRadius: 40,
  }
});

export default SlideShow;
