import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ContactUsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any query or suggestion feel free to contact.
        </Text>
        <View style={styles.contactContainer}>
          <MaterialCommunityIcons name="email" size={24} color="#D44638" />
          <Text style={styles.contactText}>maazkhansw@gmail.com</Text>
        </View>
        <View style={styles.contactContainer}>
          <MaterialCommunityIcons name="whatsapp" size={24} color="#25D366" />
          <Text style={styles.contactText}>+92 347 9235145</Text>
        </View>
        <Text style={[styles.text,{color:'cornflowerblue'}]}>You can follow us on social media.</Text>
        <View style={styles.socialMediaLinksContainer}>
          <TouchableOpacity
            onPress={async () =>
              await Linking.openURL("https://www.facebook.com/maazkhansw/")
            }
          >
            <MaterialCommunityIcons name="facebook" size={34} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () =>
              await Linking.openURL(
                "https://www.linkedin.com/in/maaz-khan-2974a1228"
              )
            }
          >
            <MaterialCommunityIcons name="linkedin" size={34} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () =>
              await Linking.openURL(
                "https://www.instagram.com/maazkhansw/?hl=en"
              )
            }
          >
            <MaterialCommunityIcons name="instagram" size={34} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    flex: 1,
    justifyContent: "center",
  },
  body: {
    marginHorizontal: 10,
    elevation: 4,
    borderRadius: 30,
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#785895",
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
  },
  socialMediaLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#785895",
    paddingVertical: 10,
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    alignItems: "center",
  },
  text: {
    color: "black",
    alignSelf: "center",
    fontSize: 18,
    marginVertical: 20,
    fontStyle: "italic",
    marginHorizontal: 10,
    textAlign: "center",
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    fontStyle: "italic",
    color:'red'
  },
});
