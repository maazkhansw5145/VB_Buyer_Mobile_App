import * as React from "react";
import { FAB, Portal, Provider } from "react-native-paper";
import { connect } from "react-redux";
import AutocompleteInput from "./AutocompleteInput";

function actions(props) {
  if (props.from === "FastFood") {
    return [
      // {
      // icon: "collage",
      // label: "Deals",
      // onPress: () => props.searchFastFood('deal'),
      // },
    ];
  } else if (props.from === "Mall") {
    return [
      {
        icon: "google-maps",
        label: "Nearby",
        onPress: () => {
          if (props.location) {
            props.setActiveTab("NearbyItems");
          } else {
            props.navigation.navigate("MapView", {
              text: "Hold the location icon, drag it to your exact loction",
              from:"NearbyItems"
            });
          }
        },
      },
    ];
  } else {
    return [];
  }
}

const FloatingButton = (props) => {
  const [state, setState] = React.useState({ open: false });
  const [searchString, setSearchString] = React.useState("");

  const onStateChange = ({ open }) => {
    setState({ open });
    if (searchString.length !== 0) {
      setSearchString("");
    }
  };
  const { open } = state;
  return (
    <Provider>
      <Portal>
        <FAB.Group
          small={true}
          fabStyle={{
            marginBottom: 65,
            backgroundColor:
              props.from === "NearbyItems" && searchString.length === 0
                ? "orangered"
                : searchString.length === 0
                ? "white"
                : "#00917C",
          }}
          actions={actions(props)}
          open={open}
          icon={
            !open && props.from !== "NearbyItems"
              ? "magnify"
              : !open
              ? "map-marker-radius"
              : searchString.length === 0
              ? "keyboard-backspace"
              : "check"
          }
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              if (searchString.length !== 0) {
                if (props.from === "FastFood") {
                  props.search(searchString);
                }
                if (props.from === "Mall") {
                  props.searchMall(searchString);
                }
                if (props.from === "NearbyItems") {
                  props.searchNearby(searchString);
                }
              }
            }
          }}
        />
        {open && (
          <AutocompleteInput
            from={props.from}
            setSearchString={setSearchString}
          />
        )}
      </Portal>
    </Provider>
  );
};

const mapStateToProps = (state) => ({
  location: state.auth.location,
});

export default connect(mapStateToProps)(FloatingButton);
