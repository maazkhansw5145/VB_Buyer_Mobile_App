import React from "react";
import ConfirmationScreen from "../../Components/Special/ConfirmationScreen";

const LoginFirst = (props) => {
  const onYes = () => {
    if(props.route.params && props.route.params.from === "notifications"){
      props.navigation.navigate("Login", { from: "notifications" });
    } else {
      props.navigation.navigate("Login");
    }
  };
  const onNo = () => {
    props.navigation.goBack();
  };
  return (
    <ConfirmationScreen
      title="You need to login first"
      msg="Do you want to login?"
      onYes={onYes}
      onNo={onNo}
    />
  );
};

export default LoginFirst;
