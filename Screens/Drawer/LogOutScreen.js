import React from "react";
import { connect } from "react-redux";
import ConfirmationScreen from "../../Components/Special/ConfirmationScreen";
import { logout } from "../../Redux/Actions/authActions";

function LogOutScreen(props) {
  const onYes = () => {
    props.logout();
    props.navigation.navigate("ItemsScreen");
  };
  const onNo = () => {
    props.navigation.navigate("ItemsScreen");
  };
  return (
    <ConfirmationScreen
      title="Are you sure to logout?"
      onYes={onYes}
      onNo={onNo}
    />
  );
}

export default connect(null, { logout })(LogOutScreen);
