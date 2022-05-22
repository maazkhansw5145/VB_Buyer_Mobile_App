import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OfflineNotice from "../Components/Special/OfflineNotice";
import { connect } from "react-redux";

function Header(props) {
  const { index, routes } = props.navigation.dangerouslyGetState();
  const screenName = routes[index].name;
  return (
    <View>
      <SafeAreaView>
        {screenName !== "WelcomeScreen" &&
          screenName !== "ItemPlacement" &&
          screenName !== "OrderPlacement" &&
          screenName !== "Shop" &&
          screenName !== "PhoneAuthentication" &&
          screenName !== "MapView" &&
          screenName !== "LoginFirst" &&
          screenName !== "Logout" &&
          screenName !== "ForgotPassword" &&
          screenName !== "Receipt" && (
            <Appbar style={styles.header} dark={true}>
              {props.auth.isAuthenticated ? (
                <Appbar.Action
                  icon="reorder-horizontal"
                  onPress={() => props.navigation.openDrawer()}
                />
              ) : (
                <Appbar.Action
                  icon="account-plus"
                  onPress={() => props.navigation.navigate("Login")}
                />
              )}
              <Appbar.Content title="Virtual Bazaar" />
              <Appbar.Action
                icon="home-search"
                color={screenName === "ItemsScreen" ? "#24091b" : "white"}
                onPress={() => props.navigation.navigate("ItemsScreen")}
              />
              <Appbar.Action
                icon={props.auth.newNotification ? "bell-ring" : "bell"}
                color={
                  screenName === "Notifications"
                    ? "#24091b"
                    : props.auth.newNotification
                    ? "orange"
                    : "white"
                }
                onPress={() => {
                  if (props.auth.isAuthenticated) {
                    props.navigation.navigate("Notifications");
                  } else {
                    props.navigation.navigate("LoginFirst", {
                      item: null,
                      average_rating: null,
                      from: "notifications",
                    });
                  }
                }}
              />
            </Appbar>
          )}
        <OfflineNotice />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#B95291",
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
