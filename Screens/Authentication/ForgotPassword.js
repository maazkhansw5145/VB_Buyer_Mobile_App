import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ErrorAlert from "../../Components/Special/ErrorAlert";
import { connect } from "react-redux";
import { forgotPassword } from "../../Redux/Actions/authActions";

const ForgotPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [password, confirmPassword]);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Change Password</Text>
        <View style={styles.line} />
        <View style={styles.inputWrapper}>
          <View style={styles.input}>
            <TextInput
              onChangeText={setPassword}
              value={password}
              style={{ width: "100%" }}
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={!showPassword ? true : false}
              onBlur={() =>
                password.length < 8 &&
                setError({ error: "Password should've at least 8 characters." })
              }
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
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              style={{ width: "100%" }}
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              secureTextEntry={!showPassword ? true : false}
              onBlur={() =>
                password !== confirmPassword &&
                setError({ error: "Confirm password must match password." })
              }
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
        
        {error && <ErrorAlert error={error} />}

        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <TouchableOpacity
            style={[
              styles.button,
              password.length < 8 || password !== confirmPassword
                ? styles.inactive
                : styles.active,
            ]}
            disabled={password.length < 8 || password !== confirmPassword}
            onPress={() => {
              props.forgotPassword(props.route.params.phoneNumber, password);
              props.navigation.navigate("ItemsScreen");
            }}
          >
            <Text style={{ color: "white" }}>Change Password</Text>
          </TouchableOpacity>
        </View>
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
    borderRadius: 20,
    alignItems: "center",
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    width: 200,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    color: "black",
    marginTop: 10,
    color: "#8b008b",
  },
  input: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    marginHorizontal: 20,
    alignItems: "stretch",
    color: "black",
    flexDirection: "row",
  },
  active: {
    backgroundColor: "#0064C3",
  },
  inactive: {
    backgroundColor: "gray",
  },
  inputWrapper: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginBottom: 30,
    marginTop: 20,
    marginHorizontal: 30,
  },
});

export default connect(null, { forgotPassword })(ForgotPassword);
