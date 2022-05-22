import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "./Header";

import NotificationsScreen from "../Screens/NotificationsScreen";
import ProfileScreen from "../Screens/Drawer/ProfileScreen";
import OrderTrackingScreen from "../Screens/Drawer/OrderTrackingScreen";
import HistoryScreen from "../Screens/Drawer/HistoryScreen";
import ContactUsScreen from "../Screens/Drawer/ContactUsScreen";
import LogOutScreen from "../Screens/Drawer/LogOutScreen";
import LoginForm from "../Screens/Authentication/LoginForm";
import SignupForm from "../Screens/Authentication/SignupForm";
import ReceiptScreen from "../Screens/Order/ReceiptScreen";
import RatingScreen from "../Screens/Order/RatingScreen";
import CartScreen from "../Screens/Drawer/CartScreen";
import ItemPlacement from "../Screens/Order/ItemPlacement";
import OrderPlacement from "../Screens/Order/OrderPlacement";
import Shop from "../Screens/ShopScreen";
import MapView from "../Components/MapView";
import LoginFirst from "../Screens/Order/LoginFirst";
import ItemsScreen from "../Screens/Items/ItemsScreen";
import PhoneAuthentication from "../Screens/Authentication/PhoneAuthentication";
import ForgotPassword from "../Screens/Authentication/ForgotPassword";
import RegisterShopScreen from "../Screens/RegisterShopScreen";
import OrderPosted from "../Components/Special/OrderPosted";
import OrderCanceling from "../Screens/Order/OrderCanceling";
import ReportScreen from "../Screens/ReportScreen";
import ThanksForReporting from "../Screens/ThanksForReporting";
import WelcomeScreen from "../Screens/WelcomeScreen";
// import VirtualMirror from "../Screens/Items/VirtualMirror";

const StackNavigator = createStackNavigator();

const stackNavigator = () => {
  return (
    <StackNavigator.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, navigation }) => (
          <Header scene={scene} navigation={navigation} />
        ),
      }}
    >
      <StackNavigator.Screen name="ItemsScreen" component={ItemsScreen} />
      <StackNavigator.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <StackNavigator.Screen name="Profile" component={ProfileScreen} />
      <StackNavigator.Screen
        name="OrderTracking"
        component={OrderTrackingScreen}
      />
      <StackNavigator.Screen name="History" component={HistoryScreen} />
      <StackNavigator.Screen name="ContactUs" component={ContactUsScreen} />
      <StackNavigator.Screen name="Cart" component={CartScreen} />
      <StackNavigator.Screen name="Logout" component={LogOutScreen} />
      <StackNavigator.Screen name="Login" component={LoginForm} />
      <StackNavigator.Screen name="Signup" component={SignupForm} />
      <StackNavigator.Screen name="Receipt" component={ReceiptScreen} />
      <StackNavigator.Screen name="Rate" component={RatingScreen} />
      <StackNavigator.Screen name="ItemPlacement" component={ItemPlacement} />
      <StackNavigator.Screen name="OrderPlacement" component={OrderPlacement} />
      <StackNavigator.Screen name="Shop" component={Shop} />
      <StackNavigator.Screen name="MapView" component={MapView} />
      <StackNavigator.Screen name="LoginFirst" component={LoginFirst} />
      {/* <StackNavigator.Screen name="VirtualMirror" component={VirtualMirror} /> */}
      <StackNavigator.Screen
        name="PhoneAuthentication"
        component={PhoneAuthentication}
      />
      <StackNavigator.Screen name="ForgotPassword" component={ForgotPassword} />
      <StackNavigator.Screen
        name="RegisterShop"
        component={RegisterShopScreen}
      />
      <StackNavigator.Screen name="OrderPosted" component={OrderPosted} />
      <StackNavigator.Screen name="OrderCanceling" component={OrderCanceling} />
      <StackNavigator.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <StackNavigator.Screen name="ReportScreen" component={ReportScreen} />
      <StackNavigator.Screen
        name="ThanksForReporting"
        component={ThanksForReporting}
      />
    </StackNavigator.Navigator>
  );
};

export default stackNavigator;
