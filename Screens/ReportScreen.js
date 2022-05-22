import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { report } from "../Constants/API";

const ReportScreen = (props) => {
  const [otherReason, setOtherReason] = useState("");
  const [fakeDelivery, setFakeDelivery] = useState(false);
  const [image, setImage] = useState("");

  const { sellerId, orderId, buyerId } = props.route.params;

  const pickImage = async () => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.65,
            base64: true,
          });
          if (!result.cancelled) {
            setImage(result.uri);
          }
        }
      }
    })();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Report</Text>
        <View style={styles.line} />
        {!fakeDelivery ? (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => setFakeDelivery(true)}>
              <View style={styles.optionContainer}>
                <FontAwesome5 name="box-open" size={24} color="black" />
                <View>
                  <Text style={styles.optionTitle}>Fake Delivery.</Text>
                  <Text style={styles.optionDescription}>
                    The item is not as it was displayed.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() => {
                const description = "Late delivery";
                report(buyerId, orderId, sellerId, description);
                props.navigation.navigate("ThanksForReporting");
              }}
            >
              <View style={styles.optionContainer}>
                <FontAwesome5 name="calendar-times" size={24} color="black" />
                <View>
                  <Text style={styles.optionTitle}>Late Delivery.</Text>
                  <Text style={styles.optionDescription}>
                    The item is delivered too late.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ width: "90%", marginVertical: 10 }}>
              <TextInput
                placeholder="Other reason"
                onChangeText={(text) => setOtherReason(text)}
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 20,
                }}
              />
            </View>
            <TouchableOpacity
              disabled={otherReason.length < 5}
              style={[
                styles.button,
                otherReason.length < 5 ? styles.inactve : styles.active,
              ]}
              onPress={() => {
                const description = otherReason;
                report(buyerId, orderId, sellerId, description);
                props.navigation.navigate("ThanksForReporting");
              }}
            >
              <Text style={{ color: "white" }}>Submit Report</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.fakeDeliveryDescription}>
              Upload a photo of the received item, so that we can verify the
              report.
            </Text>
            {image.length === 0 ? (
              <TouchableOpacity
                style={styles.uploadPhotoContainer}
                onPress={() => pickImage()}
              >
                <View style={{}}>
                  <FontAwesome5
                    name="camera"
                    size={40}
                    color="violet"
                    style={{ alignSelf: "center" }}
                  />
                  <Text style={{ fontStyle: "italic", color: "violet" }}>
                    Click here to upload photo
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={{ alignItems: "center", marginVertical: 20 }}>
                <Image style={styles.image} source={{ uri: image }} />
              </View>
            )}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                disabled={image.length === 0}
                style={[
                  styles.button,
                  image.length === 0 ? styles.inactve : styles.active,
                ]}
                onPress={async () => {
                  const img = await fetch(image);
                  const IMAGE = await img.blob();
                  const description = "Fake delivery";
                  report(buyerId, orderId, sellerId, description, IMAGE);
                  props.navigation.navigate("ThanksForReporting");
                }}
              >
                <Text style={{ color: "white" }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  form: {
    marginHorizontal: 10,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    borderRadius: 30,
    backgroundColor: "white",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    fontFamily: "serif",
    alignSelf: "flex-start",
    marginLeft: 30,
    color: "#785895",
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    width: "85%",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "lightgray",
    marginVertical: 10,
    width: "90%",
    elevation: 4,
  },
  optionTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "serif",
    marginLeft: 15,
    color: "#785895",
  },
  optionDescription: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "serif",
    marginLeft: 15,
    color: "black",
  },
  button: {
    width: 120,
    borderRadius: 20,
    marginHorizontal: "auto",
    alignItems: "center",
    fontSize: 18,
    paddingVertical: 10,
    elevation: 4,
    marginVertical: 10,
  },
  active: {
    backgroundColor: "#0064C3",
  },
  inactve: {
    backgroundColor: "lightgrey",
  },
  fakeDeliveryDescription: {
    marginHorizontal: 15,
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
  uploadPhotoContainer: {
    alignItems: "center",
    marginVertical: 25,
  },
  image: {
    resizeMode: "cover",
    height: 150,
    width: 150,
    borderRadius: 20,
  },
});

export default ReportScreen;
