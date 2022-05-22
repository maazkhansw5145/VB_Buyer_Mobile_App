import * as Notifications from "expo-notifications";
import { savingToken } from "./API";
import { Alert } from "react-native";
function showAlert() {
  Alert.alert(
    "Notification Permission Denied",
    "We will not be able to inform you about your order. Kindly press on try again and allow notifications so that we can inform you about your order.",
    [
      {
        text: "Try Again",
        onPress: () => registerForPushNotifications(),
      },
      {
        text: "Cancel",
        onPress: () => props.navigation.navigate("ItemsScreen"),
      },
    ]
  );
}

export default registerForPushNotifications = async (data) => {
  console.log(data);
  try {
    const permission = await Notifications.requestPermissionsAsync();
    console.log(permission);
    if (!permission === "granted") {
      showAlert();
    }
    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    var alreadySaved = false;
    if (data.notificationsToken && data.notificationsToken == token.data) {
      alreadySaved = true;
    }
    if (!alreadySaved) {
      savingToken(data.id, token);
    }
  } catch (error) {}
};
