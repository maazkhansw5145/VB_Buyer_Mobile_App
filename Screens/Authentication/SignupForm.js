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
import { connect } from "react-redux";
import { register } from "../../Redux/Actions/authActions";
import { clearErrors } from "../../Redux/Actions/errorActions";
import ErrorAlert from "../../Components/Special/ErrorAlert";
import { Entypo } from "@expo/vector-icons";
import url from "../../Constants/URL";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const SignupForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loginIdExists, setLoginIdExists] = useState(false);

  if (error) {
    props.navigation.addListener("blur", () => {
      props.clearErrors();
      setError(null);
    });
  }

  useEffect(() => {
    if (error) {
      props.clearErrors();
      setError(null);
    }
  }, [loginId]);

  useEffect(() => {
    if (props.error) {
      setError(props.error);
    }
  }, [props]);

  const checkLoginId = async (loginId) => {
    await fetch(`${url}/loginId/check`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginId,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          setLoginIdExists({ error: "Login Id Already exists" });
        }
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.line} />
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { marginRight: 5 }]}
            onChangeText={(val) => setFirstName(val.trim())}
            value={firstName}
            placeholder="First Name"
            placeholderTextColor="gray"
          />
          <TextInput
            style={[styles.input, { marginLeft: 5 }]}
            onChangeText={(val) => setLastName(val.trim())}
            value={lastName}
            placeholder="Last Name"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.input}>
            <TextInput
              onChangeText={(val) => {
                if (loginIdExists) {
                  setLoginIdExists(false);
                }
                setLoginId(val.trim());
              }}
              style={{ width: "100%" }}
              value={loginId}
              placeholder="Login Id"
              keyboardType="email-address"
              placeholderTextColor="gray"
              autoCapitalize="none"
              onBlur={() => {
                checkLoginId(`${loginId}@vb.com`);
              }}
            />
            <Text style={{ marginLeft: "auto", alignSelf: "center" }}>
              @vb.com
            </Text>
          </View>
        </View>
        {loginIdExists && <ErrorAlert error={loginIdExists} />}
        <View style={styles.inputWrapper}>
          <View style={styles.input}>
            <TextInput
              onChangeText={(val) => setPassword(val.trim())}
              value={password}
              style={{ width: "100%" }}
              placeholder="Password"
              autoCapitalize="none"
              placeholderTextColor="gray"
              secureTextEntry={!showPassword ? true : false}
            />
            <Pressable
              style={{ marginLeft: "auto" }}
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
        <View style={styles.inputWrapper}>
          <View style={styles.input}>
            <TextInput
              onChangeText={(val) => setConfirmPassword(val.trim())}
              style={{ width: "100%" }}
              value={confirmPassword}
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              secureTextEntry={!showPassword ? true : false}
              autoCapitalize="none"
            />
            <Pressable
              style={{ marginLeft: "auto" }}
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
        {(firstName !== "" && firstName.length < 3) ||
        (lastName !== "" && lastName.length < 3) ||
        (loginId !== "" && loginId.length < 8) ||
        (confirmPassword !== "" && password !== "" && password !== confirmPassword) ||
        (password !== "" && password.length < 8 ) ? (
          <View style={styles.alert}>
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              color="red"
            />
            <Text style={styles.msg}>
              {(firstName !== "" && firstName.length < 3)
                ? "First name is too short"
                : (lastName !== "" && lastName.length < 3)
                ? "Last name is too short"
                : (loginId !== "" && loginId.length < 8)
                ? "Login Id must have at least 8 characters"
                : (confirmPassword !== "" && password !== "" && password !== confirmPassword)
                ? "Confirm password should match password"
                : (password !== "" && password.length < 8 ) &&
                  "Password must have at least 8 characters"}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {error && <ErrorAlert error={error} />}
        <TouchableOpacity
          style={[
            styles.signupBtn,
            password.length < 8 ||
            password !== confirmPassword ||
            loginId.length < 8 ||
            firstName.length < 3 ||
            loginIdExists ||
            lastName.length < 3
              ? styles.inactive
              : styles.active,
          ]}
          disabled={
            password.length < 8 ||
            password !== confirmPassword ||
            loginId.length < 8 ||
            firstName.length < 3 ||
            lastName.length < 3 ||
            loginIdExists
          }
          onPress={() => {
            checkLoginId(`${loginId}@vb.com`);
            const data = {
              name: `${firstName} ${lastName}`,
              loginID: `${loginId}@vb.com`,
              password,
            };
            props.clearErrors();
            props.navigation.navigate("PhoneAuthentication", {
              for: "signup",
              data,
            });
          }}
        >
          <Text style={{ color: "white" }}>Sign Up &#10140;</Text>
        </TouchableOpacity>
        <View style={styles.signupWrapper}>
          <Text>Already have an account ?</Text>
          <Text
            style={{ paddingHorizontal: 10, color: "blue" }}
            onPress={() => props.navigation.navigate("Login")}
          >
            Login
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    justifyContent: "center",
    flex: 1,
  },
  form: {
    paddingBottom: 20,
    marginHorizontal: 10,
    elevation: 4,
    borderRadius: 30,
    backgroundColor: "white",
  },
  title: {
    marginLeft: 20,
    fontSize: 24,
    marginTop: 30,
    fontFamily: "serif",
    color: "#785895",
  },
  input: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    marginHorizontal: 20,
    flex: 1,
    alignItems: "stretch",
    color: "black",
    flexDirection: "row",
  },
  inputWrapper: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupBtn: {
    width: 100,
    borderRadius: 20,
    alignItems: "center",
    fontSize: 18,
    paddingVertical: 10,
    elevation: 4,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  active: {
    backgroundColor: "#0064C3",
  },
  inactive: {
    backgroundColor: "lightgrey",
  },
  signupWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginVertical: 30,
    marginHorizontal: 30,
  },
  alert: {
    borderRadius: 20,
    backgroundColor: "rgb(250, 214, 207)",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginVertical:10
  },
  msg: {
    color: "red",
    marginHorizontal: 10,
  },
});

const mapStateToProps = (state) => ({
  error: state.error.error,
});

export default connect(mapStateToProps, { register, clearErrors })(SignupForm);
