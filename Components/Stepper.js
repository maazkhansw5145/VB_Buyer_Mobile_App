import React from "react";
import { View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const labels = [
  "Waiting for acceptance",
  "Full filling",
  "Delivering",
  "Completed",
];

const customStyles = {
  stepIndicatorSize: 50,
  currentStepIndicatorSize: 60,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: "rgb(233,64,87)",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "rgb(0, 230, 0)",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "rgb(0, 230, 0)",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "rgb(0, 230, 0)",
  stepIndicatorUnFinishedColor: "#aaaaaa",
  stepIndicatorCurrentColor: "rgb(233,64,87)",
  stepIndicatorLabelFontSize: 11,
  currentStepIndicatorLabelFontSize: 1,
  stepIndicatorLabelCurrentColor: "rgb(233,64,87)",
  stepIndicatorLabelFinishedColor: "rgb(0, 230, 0)",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "black",
  labelSize: 11,
  currentStepLabelColor: "rgb(233,64,87)",
};

const icons = ({ position }) => {
  switch (position) {
    case 0:
      return <FontAwesome name="hourglass-start" size={18} color="white" />;
    case 1:
      return (
        <MaterialCommunityIcons
          name="package-variant"
          size={24}
          color="white"
        />
      );
    case 2:
      return (
        <MaterialCommunityIcons
          name="truck-delivery-outline"
          size={24}
          color="white"
        />
      );
    case 3:
      return (
        <MaterialCommunityIcons name="check-bold" size={24} color="white" />
      );
    default:
      break;
  }
};

const Stepper = (props) => {
  return (
    <View>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={props.orderStatusNumber}
        labels={labels}
        renderStepIndicator={icons}
        stepCount={4}
      />
    </View>
  );
};

export default Stepper;
