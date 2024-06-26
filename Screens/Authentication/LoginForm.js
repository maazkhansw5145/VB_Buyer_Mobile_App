import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { login } from "../../Redux/Actions/authActions";
import { clearErrors } from "../../Redux/Actions/errorActions";
import ErrorAlert from "../../Components/Special/ErrorAlert";
import FacebookAuth from "../../Components/Authentication/FacebookAuth";
import GoogleAuth from "../../Components/Authentication/GoogleAuth";
import Loading from "../../Components/Special/Loading";
import { Entypo } from "@expo/vector-icons";

const LoginForm = (props) => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (error) {
    props.navigation.addListener("blur", () => {
      props.clearErrors();
      setError(null);
    });
  }

  useEffect(() => {
    {
      loading && setLoading(false);
    }
    if (error) {
      props.clearErrors();
      setError(null);
    }
  }, [loginId, password]);

  useEffect(() => {
    {
      loading && setLoading(false);
    }
    if (props.msg === "Login Successfully") {
      if (props.route.params && props.route.params.from === "notifications") {
        props.navigation.navigate("Notifications");
      } else {
        if (props.order.length !== 0) {
          props.navigation.navigate("OrderPlacement");
        } else {
          props.navigation.navigate("ItemsScreen");
        }
      }
    }
    if (props.error) {
      setError(props.error);
    }
  }, [props]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.line} />
        {/* <View style={{ marginVertical: 10 }}>
          <FacebookAuth {...props} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <GoogleAuth {...props} />
        </View>
        <Text style={{ marginVertical: 20, fontSize: 18 }}>Or</Text> */}
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="account" size={40} color="black" />
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              onChangeText={(val) => setLoginId(val.trim())}
              value={loginId}
              placeholder="Login Id"
              placeholderTextColor="gray"
              autoCapitalize="none"
              onBlur={() =>
                loginId.length < 8 &&
                setError({ error: "Login Id Should've At Least 8 Characters" })
              }
            />
            <Text style={{ marginLeft: "auto", alignSelf: "center" }}>
              @vb.com
            </Text>
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="fingerprint" size={40} color="black" />
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              onChangeText={(val) => setPassword(val.trim())}
              value={password}
              placeholder="Password"
              placeholderTextColor="gray"
              autoCapitalize="none"
              secureTextEntry={!showPassword ? true : false}
              onBlur={() =>
                password.length < 8 &&
                setError({ error: "Password Should've At Least 8 Characters" })
              }
            />
            <Pressable
              style={{ justifyContent: "center" }}
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
          style={styles.forgotPassword}
          onPress={() => {
            props.navigation.navigate("PhoneAuthentication", {
              for: "forgotPassword",
            });
          }}
        >
          Forgot Password
        </Text>
        {error && <ErrorAlert error={error} />}

        <TouchableOpacity
          style={[
            styles.loginBtn,
            loginId.length < 7 || password.length < 7 || loading
              ? styles.inactve
              : styles.active,
          ]}
          disabled={loginId.length < 7 || password.length < 7 || loading}
          onPress={() => {
            const data = {
              loginID: `${loginId}@vb.com`,
              password: password,
            };
            error && props.clearErrors();
            props.login(data);
            setLoading(true);
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            <Text style={{ color: "white" }}>Login</Text>
          )}
        </TouchableOpacity>
        <View style={styles.signupWrapper}>
          <Text>Didn't have account ?</Text>
          <Text
            style={{ paddingHorizontal: 10, color: "blue" }}
            onPress={() => {
              error && props.clearErrors();
              props.navigation.navigate("Signup");
            }}
          >
            Signup
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    justifyContent: "center",
  },
  form: {
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 4,
    borderRadius: 30,
    backgroundColor: "white",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 5,
    fontFamily: "serif",
    alignSelf: "flex-start",
    marginLeft: 30,
    color: "#785895",
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    marginLeft: 10,
    paddingRight: 15,
    flex: 1,
    alignItems: "stretch",
    color: "black",
    flexDirection: "row",
  },
  inputWrapper: {
    marginBottom: 20,
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    width: 100,
    borderRadius: 20,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginRight: 20,
    color: "blue",
    marginBottom: 15,
  },
  signupWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    width: "85%",
    marginTop: 10,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

const mapStateToProps = (state) => ({
  order: state.buyer.order,
  msg: state.auth.msg,
  error: state.error.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginForm);
