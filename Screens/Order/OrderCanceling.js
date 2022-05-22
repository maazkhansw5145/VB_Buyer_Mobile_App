import React from "react";
import ConfirmationScreen from "../../Components/Special/ConfirmationScreen";
import { cancelOrder } from '../../Constants/API'
const OrderCanceling = (props) => {
  const { orderId } = props.route.params;
  const onYes = () => {
    cancelOrder(orderId)
    props.navigation.navigate("ItemsScreen");
  };
  const onNo = () => {
    props.navigation.navigate("ItemsScreen");
  };

  return (
    <ConfirmationScreen
      title="Confirmation"
      msg="Do you want to cancel this order?"
      onYes={onYes}
      onNo={onNo}
    />
  );
};

export default OrderCanceling;
