import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import ErrorAlert from "../Components/Special/ErrorAlert";
import { Dropdown } from "react-native-element-dropdown";
import { Entypo } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import url from "../Constants/URL";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RegisterShopScreen = (props) => {
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [CNIC, setCNIC] = useState("");
  // const [address, setAddress] = useState("");
  // const [businessRegistrationNumber, setBusinessRegistrationNumber] =
  //   useState("");
  const [category, setCategory] = useState("Select Category");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [self_delivering, setSelf_delivering] = useState(false);
  const [loginIdExists, setLoginIdExists] = useState(false);

  // if (error) {
  //   props.navigation.addListener("blur", () => {
  //   props.clearErrors();
  //     setError(null);
  //   });
  // }

  useEffect(() => {
    if (error) {
      //   props.clearErrors();
      setError(null);
    }
  }, [loginId]);

  const checkLoginId = async (loginId) => {
    await fetch(`${url}/check/shop/loginId`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginId: `${loginId}@vb.com`,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          setLoginIdExists({ error: "Login Id Already exists" });
        }
      });
  };

  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {/* <Image style={styles.icon} source={require('./assets/tick.png')} /> */}
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Register Shop</Text>
        <View style={styles.line} />
        <View style={styles.inputWrapper}>
          <View style={styles.input}>
            <TextInput
              onChangeText={setShopName}
              value={shopName}
              placeholder="Shop Name"
              placeholderTextColor="gray"
              style={{ paddingVertical: 10, paddingLeft: 25, flex: 1 }}
            />
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.input}>
            <TextInput
              onChangeText={setOwnerName}
              value={ownerName}
              placeholder="Owner/Manager Name"
              placeholderTextColor="gray"
              style={{ paddingVertical: 10, paddingLeft: 25, flex: 1 }}
            />
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.input}>
            <TextInput
              onChangeText={(value) => {
                if (/^[0-9\b]+$/.test(value) || value === "") {
                  setCNIC(value);
                }
              }}
              style={{ paddingVertical: 10, paddingLeft: 25, flex: 1 }}
              value={CNIC}
              placeholder="Enter Your CNIC Number"
              placeholderTextColor="gray"
              keyboardType="numeric"
            />
          </View>
        </View>
        {/* <View style={styles.inputWrapper}>
          <View style={styles.input}>
            <TextInput
            onChangeText={(value) => {
              if (/^[0-9\b]+$/.test(value) || value === "") {
                setBusinessRegistrationNumber(value);
              }
            }}
              value={businessRegistrationNumber}
              style={{ width: "100%",fontSize:12 }}
              placeholder="Business Registration Number (OPTIONAL)"
              placeholderTextColor="gray"
              keyboardType="numeric"
            />
          </View>
        </View> */}
        <View style={styles.inputWrapper}>
          <View style={[styles.input, styles.dropdown]}>
            <Text
              style={[
                category === "Select Category"
                  ? { color: "gray" }
                  : { color: "black" },
                { paddingVertical: 10, paddingLeft: 25 },
              ]}
            >
              {category}
            </Text>
            <Dropdown
              data={[
                { label: "Fast Food", value: "fast_food" },
                { label: "Home Accessories", value: "home_accessories" },
                { label: "Womens Cloths", value: "womens_cloths" },
                { label: "Mens Cloths", value: "mens_cloths" },
                { label: "Kids Cloths", value: "kids_cloths" },
                { label: "Electronics", value: "electronics" },
                { label: "Glasses", value: "glasses" },
                { label: "Watches", value: "watches" },
                { label: "Sports", value: "sports" },
                { label: "Toys", value: "toys" },
                { label: "Perfumes", value: "perfumes" },
                { label: "Masks", value: "masks" },
                { label: "Shoes", value: "shoes" },
              ]}
              placeholder=""
              style={{ flex: 1, paddingRight: 15 }}
              value={category}
              onChange={(item) => {
                setCategory(item.value);
              }}
              renderItem={(item) => _renderItem(item)}
            />
          </View>
        </View>
        {/* <View style={styles.inputWrapper}>
          <View style={styles.input}>
            <TextInput
              onChangeText={setAddress}
              style={{ paddingVertical: 10, paddingLeft: 25, flex: 1 }}
              value={address}
              placeholder="Address"
              placeholderTextColor="gray"
              onBlur={() =>
                address.length < 6 && setError({ error: "Adress is too short" })
              }
            />
          </View>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontFamily: "serif" }}>Self Delivering:</Text>
          <Switch
            value={self_delivering}
            onValueChange={() => setSelf_delivering(!self_delivering)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.input}>
            <TextInput
              onChangeText={(val) => {
                if (loginIdExists) {
                  setLoginIdExists(false);
                } else {
                  setLoginId(val.trim());
                }
              }}
              style={{ paddingVertical: 10, paddingLeft: 25, flex: 1 }}
              value={loginId}
              placeholder="Login Id"
              placeholderTextColor="gray"
              autoCapitalize="none"
            />
            <Text
              style={{
                marginLeft: "auto",
                marginRight: 15,
                alignSelf: "center",
              }}
            >
              @vb.com
            </Text>
          </View>
        </View>
        {loginIdExists && <ErrorAlert error={loginIdExists} />}
        <View style={styles.inputWrapper}>
          <View style={styles.input}>
            <TextInput
              onChangeText={(val) => setPassword(val.trim())}
              style={{ paddingVertical: 10, padding: 25, flex: 1 }}
              value={password}
              placeholder="Password"
              placeholderTextColor="gray"
              autoCapitalize="none"
              secureTextEntry={!showPassword ? true : false}
            />
            <Pressable
              style={{ justifyContent: "center", paddingRight: 20 }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Entypo
                name={!showPassword ? "eye-with-line" : "eye"}
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        </View>
        <Text
          style={{
            fontSize: 12,
            color: "gray",
            fontStyle: "italic",
            marginLeft: 20,
          }}
        >
          You will need it to login to your store, so remember it.
        </Text>
        {(CNIC.length < 13 && CNIC !== "") ||
        (shopName.length < 3 && shopName !== "") ||
        (ownerName.length < 3 && ownerName !== "") ||
        // address.length < 6 ||
        // category === "Select Category" ||
        (loginId.length < 8 && loginId !== "") ||
        (password.length < 8 && password !== "") ? (
          <View style={styles.alert}>
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              color="red"
            />
            <Text style={styles.msg}>
              {shopName.length < 3
                ? "Shop name is too short"
                : ownerName.length < 3
                ? "Owner name is too short"
                : CNIC.length !== 13
                ? "CNIC number is not valid"
                : loginId.length < 8
                ? "Login Id must have at least 8 characters"
                : category === "Select Category"
                ? "Select category, Please!"
                : password.length < 8 &&
                  "Password must have at least 8 characters"}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {error && <ErrorAlert error={error} />}
        <TouchableOpacity
          style={[
            styles.registerButton,
            CNIC.length < 13 ||
            shopName.length < 3 ||
            ownerName.length < 3 ||
            // address.length < 6 ||
            category === "Select Category" ||
            loginId.length < 8 ||
            loginIdExists ||
            password.length < 8
              ? styles.inactive
              : styles.active,
          ]}
          disabled={
            CNIC.length !== 13 ||
            shopName.length < 3 ||
            ownerName.length < 3 ||
            // address.length < 6 ||
            category === "Select Category" ||
            loginId.length < 8 ||
            loginIdExists ||
            password.length < 8
          }
          onPress={() => {
            const shopData = {
              name: shopName,
              ownerName,
              CNIC,
              category,
              loginId: `${loginId}@vb.com`,
              password,
              // address,
              self_delivering,
            };
            if (self_delivering) {
              props.navigation.navigate("MapView", {
                for: "registerShop",
                shopData,
                text: "Hold the location icon, then select your shop location",
              });
            } else {
              props.navigation.navigate("PhoneAuthentication", {
                for: "registerShop",
                shopData,
              });
            }
          }}
        >
          <Text style={{ color: "white" }}>Register &#10140;</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    justifyContent: "center",
    height: "100%",
  },
  form: {
    paddingBottom: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    borderRadius: 30,
    backgroundColor: "white",
  },
  title: {
    marginLeft: 20,
    fontSize: 24,
    marginTop: 15,
    fontFamily: "serif",
    color: "#785895",
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    marginHorizontal: 20,
    flex: 1,
    alignItems: "stretch",
    color: "black",
    flexDirection: "row",
  },
  inputWrapper: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerButton: {
    width: 100,
    borderRadius: 20,
    alignItems: "center",
    fontSize: 18,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  active: {
    backgroundColor: "#0064C3",
  },
  inactive: {
    backgroundColor: "lightgrey",
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginVertical: 20,
    marginHorizontal: 30,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  textItem: {
    fontSize: 16,
  },
  dropdown: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  alert: {
    borderRadius: 20,
    backgroundColor: "rgb(250, 214, 207)",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  msg: {
    color: "red",
    marginHorizontal: 10,
  },
});

export default RegisterShopScreen;
