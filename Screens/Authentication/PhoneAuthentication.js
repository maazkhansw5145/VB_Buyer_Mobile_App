import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "./firebase";
import { signup, addPhoneNumber } from "../../Redux/Actions/authActions";
import { postOrder, clearOrder } from "../../Redux/Actions/buyerActions";
import { connect } from "react-redux";
import Loading from "../../Components/Special/Loading";
import url from "../../Constants/URL";

const PhoneAuthentication = (props) => {
  const [code, setCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verifyNow, setVerifyNow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wrongOTPAttemps, setWrongOTPAttemps] = useState(0);
  const [error, setError] = useState("");

  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    if (
      (props.auth.msg === "Signup Successfully" &&
        props.route.params.for === "signup") ||
      (props.auth.msg === "Updated Successfully" &&
        props.route.params.for === "addPhoneNumber") ||
      (props.route.params.for === "forgotPassword" &&
        props.auth.msg === "Password Changes Successfully")
    ) {
      props.navigation.navigate("ItemsScreen");
    }
  }, [props.auth.msg]);

  useEffect(() => {
    if (props.buyer.msg === "Order Send Successfully!") {
      props.navigation.navigate("OrderPosted");
    }
  }, [props.buyer.msg]);

  useEffect(() => {
    if (
      props.error.error === "Phone number is already attached to an account"
    ) {
      setError("Phone number is already attached to an account");
    }
  }, [props.error]);

  useEffect(() => {
    if (wrongOTPAttemps === 4) {
      props.navigation.navigate("ItemsScreen");
    }
  }, [wrongOTPAttemps]);

  const checkPhoneNumber = () => {
    fetch(`${url}/check/+92${phoneNumber}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response === true) {
          if (props.route.params.for === "signup") {
            setError(
              "Account with this number already exists. Click on Forgot Password in the login page."
            );
          } else {
            sendVerification();
          }
        } else {
          if (props.route.params.for === "signup") {
            sendVerification();
          } else {
            setError("Number is not associated with any account");
          }
        }
      });
  };

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(`+92${phoneNumber}`, recaptchaVerifier.current)
      .then(setVerificationId);
    setVerifyNow(true);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => userVerified())
      .catch((e) => {
        setWrongOTPAttemps(wrongOTPAttemps + 1);
        setLoading(false);
      });
  };

  const userVerified = () => {
    if (props.route.params.for === "sendOrder") {
      return props.postOrder({
        order: props.buyer.order,
        buyerID: props.auth.user.id,
        sellerID: props.buyer.order[0].item.retailer._id,
        location: props.auth.location,
        address: props.route.params.address,
      });
    }

    if (props.route.params.for === "signup") {
      let user = {
        ...props.route.params.data,
        contact: `+92${phoneNumber}`,
      };
      props.signup(user);
      setLoading(true);
    }

    if (props.route.params.for === "forgotPassword") {
      props.navigation.navigate("ForgotPassword", {
        phoneNumber: `+92${phoneNumber}`,
      });
    }

    if (props.route.params.for === "addPhoneNumber") {
      props.addPhoneNumber(props.route.params.loginId, `+92${phoneNumber}`);
    }
    if (props.route.params.for === "registerShop") {
      var shopData = {
        ...props.route.params.shopData,
        phoneNumber: `+92${phoneNumber}`,
        owner: props.auth.user.id,
      };
      fetch(`${url}/register/shop`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      })
        .then((res) => res.json())
        .then(() => {
          Alert.alert(
            "Shop registration request sends successfully",
            "Our team will validate your shop registration request and will inform you within hours. Thank you",
            [
              {
                text: "OK",
                onPress: () => props.navigation.navigate("ItemsScreen"),
              },
            ]
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
      <View style={styles.content}>
        <MaterialCommunityIcons
          onPress={() => {
            props.clearOrder();
            props.navigation.navigate("ItemsScreen");
          }}
          name="keyboard-backspace"
          size={24}
          color="#FF6D3A"
          style={{ marginVertical: 10 }}
        />

        {verifyNow ? (
          <View>
            <Text>Enter the code</Text>
            <TextInput
              placeholder="Confirmation Code"
              onChangeText={(value) => {
                if (/^[0-9\b]+$/.test(value) || value === "") {
                  setCode(value);
                }
              }}
              value={code}
              keyboardType="number-pad"
              maxLength={6}
              style={{
                marginVertical: 15,
                padding: 10,
                borderRadius: 10,
                backgroundColor: "lightgray",
              }}
            />
            {wrongOTPAttemps !== 0 && (
              <View style={styles.alert}>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={28}
                  color="red"
                />
                <View>
                  <Text style={styles.msg}>Please enter correct code.</Text>
                  {wrongOTPAttemps !== 0 && (
                    <Text style={styles.msg}>
                      {`${4 - wrongOTPAttemps} attempts left.`}
                    </Text>
                  )}
                </View>
              </View>
            )}
            <Text
              style={{ marginVertical: 10, color: "blue", textAlign: "right" }}
              onPress={() => {
                sendVerification();
                setWrongOTPAttemps(0);
                setCode("");
                setLoading(false);
              }}
            >
              Resend Code
            </Text>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  confirmCode();
                }}
                style={[
                  styles.button,
                  code.length !== 6 || loading
                    ? styles.inactive
                    : styles.active,
                ]}
                disabled={code.length !== 6 || loading}
              >
                {loading ? (
                  <Loading />
                ) : (
                  <Text style={{ color: "white" }}>Verify Code</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text>Enter Your Phone Number</Text>
            <View style={styles.phoneNumberContainer}>
              <Image
                source={require("../../assets/PakistanFlag.png")}
                style={styles.image}
              />
              <TextInput
                defaultValue="+92"
                editable={false}
                style={styles.phoneNumber}
              />
              <TextInput
                placeholder="Phone Number"
                style={styles.phoneNumber}
                onChangeText={(value) => {
                  if (/^[0-9\b]+$/.test(value) || value === "") {
                    error.length !== 0 && setError("");
                    setPhoneNumber(value);
                  }
                }}
                keyboardType="phone-pad"
                value={phoneNumber}
                autoCompleteType="tel"
                maxLength={10}
              />
            </View>
            {error.length !== 0 && (
              <View style={styles.alert}>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={28}
                  color="red"
                />
                <Text style={styles.msg}>{error}</Text>
              </View>
            )}

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  phoneNumber.length === 10 ? styles.active : styles.inactive,
                ]}
                disabled={phoneNumber.length !== 10}
                onPress={
                  props.route.params.for === "forgotPassword" ||
                  props.route.params.for === "signup"
                    ? checkPhoneNumber
                    : sendVerification
                  // userVerified
                }
              >
                <Text style={{ color: "white" }}>Send Verification Code</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "gray",
    alignItems: "center",
  },
  content: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
  },
  button: {
    width: 200,
    borderRadius: 20,
    alignItems: "center",
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    elevation: 4,
  },
  phoneNumberContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 20,
  },
  phoneNumber: {
    paddingHorizontal: 10,
    marginLeft: 10,
    color: "black",
  },
  image: {
    width: 30,
    height: 30,
  },
  active: {
    backgroundColor: "mediumslateblue",
  },
  inactive: {
    backgroundColor: "lightgrey",
  },
  alert: {
    borderRadius: 20,
    backgroundColor: "rgb(250, 214, 207)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: "auto",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  msg: {
    color: "red",
    marginHorizontal: 12,
  },
  verifyCodeBtn: {
    width: 100,
    borderRadius: 20,
    marginHorizontal: "auto",
    alignItems: "center",
    fontSize: 18,
    paddingVertical: 10,
    elevation: 4,
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => ({
  buyer: state.buyer,
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {
  postOrder,
  signup,
  clearOrder,
  addPhoneNumber,
})(PhoneAuthentication);
