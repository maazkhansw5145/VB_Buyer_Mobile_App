import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOCATION_UPDATE,
  GET_NOTIFICATIONS,
  UPDATE_PROFILE_NAME,
  UPDATE_PROFILE_IMAGE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  WELCOME_PAGE_SEEN,
  ADD_PHONE_NUMBER,
  NEW_NOTIFICATION,
  NO_MORE_NOTIFICATIONS,
  ADD_NOTIFICATIONS
} from "../Types";
import { returnErrors } from "./errorActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import url from "../../Constants/URL";
import registerForPushNotifications from "../../Constants/registerForPushNotifications";
import firebase from "firebase/app";
import "firebase/storage";

export const login = (data) => (dispatch) => {
  fetch(`${url}/buyer/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.msg === "Login Successfully") {
        registerForPushNotifications(data.data);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch(returnErrors({ error: { error: data.error } }));
        dispatch({
          type: LOGIN_FAIL,
        });
      }
    })
    .catch(() => {
      dispatch(returnErrors({ error: { error: "Network Error" } }));
      dispatch({ type: REGISTER_FAIL });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const welcomePageSeen = () => {
  return {
    type: WELCOME_PAGE_SEEN,
  };
};

export const setLocation = (loginID, location) => async (dispatch) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  if (loginID === null) {
    dispatch({
      type: LOCATION_UPDATE,
      payload: location,
    });
  } else {
    fetch(`${url}/${loginID}/update/location`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ location }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.msg === "Location Updated") {
          dispatch({
            type: LOCATION_UPDATE,
            payload: location,
          });
        }
      })
      .catch(() =>
        dispatch(returnErrors({ error: { error: "Network Error" } }))
      );
  }
};

export const signup = (data) => (dispatch) => {
  fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.msg === "Signup Successfully") {
        registerForPushNotifications(data.data);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data,
        });
      } else {
        dispatch(returnErrors({ error: { error: data.error } }));
        dispatch({ type: REGISTER_FAIL });
      }
    })
    .catch(() => {
      dispatch(returnErrors({ error: { error: "Network Error" } }));
      dispatch({ type: REGISTER_FAIL });
    });
};

export const updateProfileName = (buyerID, name) => async (dispatch) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  fetch(`${url}/${buyerID}/profile/update/name`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.msg === "Updated Successfully") {
        dispatch({
          type: UPDATE_PROFILE_NAME,
          payload: name,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors({ error: { error: "Network Error" } }));
    });
};

export const updateProfileImage = (buyerID, image) => async (dispatch) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  const task = firebase.storage().ref().child(`buyers/${buyerID}`).put(image);
  task.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
    task.snapshot.ref.getDownloadURL().then((imageURL) => {
      fetch(`${url}/${buyerID}/image/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageURL }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.msg === "Image Uploaded Successfully") {
            dispatch({
              type: UPDATE_PROFILE_IMAGE,
              payload: imageURL,
            });
          }
        })
        .catch((e) => {
          dispatch(returnErrors({ error: { error: "Network Error" } }));
        });
    });
  });
};

export const forgotPassword = (contactNumber, password) => (dispatch) => {
  fetch(`${url}/${contactNumber}/forget/password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.msg === "Password Changes Successfully") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors({ error: { error: "Network Error" } }));
    });
};

export const addPhoneNumber = (loginId, phoneNumber) => (dispatch) => {
  fetch(`${url}/add/phoneNumber/${loginId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.msg === "Phone Number Added Sucessfully") {
        dispatch({
          type: ADD_PHONE_NUMBER,
          payload: response.contact,
        });
      }
      if (response.msg === "Phone number is already attached to an account") {
        dispatch(
          returnErrors({
            error: "Phone number is already attached to an account",
          })
        );
      }
    })
    .catch((err) => {
      dispatch(returnErrors({ error: { error: "Network Error" } }));
    });
};

export const addToCart = (buyerID, item) => async (dispatch) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  fetch(`${url}/${buyerID}/addtocart/${item._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(() => {
      dispatch({
        type: ADD_TO_CART,
        payload: item,
      });
    })
    .catch(() => {
      dispatch(returnErrors({ error: { error: "Adding To Cart Fails" } }));
    });
};

export const removeFromCart = (buyerID, itemID) => async (dispatch) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  fetch(`${url}/${buyerID}/removeFromCart/${itemID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      res.json().then(() => {
        dispatch({
          type: REMOVE_FROM_CART,
          payload: itemID,
        });
      });
    })
    .catch(() => {
      dispatch(returnErrors({ error: { error: "Deleting From Cart Fails" } }));
    });
};

export const getNotifications = (userId,skip) => async (dispatch) => {
  console.log(userId)
  console.log(skip)
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  fetch(`${url}/notifications/${userId}/?skip=${skip}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      res.json().then((response) => {
        if (Array.isArray(response)) {
          console.log(response)
          if(Number(skip) === 0){
            dispatch({
              type: GET_NOTIFICATIONS,
              payload: response,
            });
          } else {
            if (response.length === 0) {
              dispatch({
                type: NO_MORE_NOTIFICATIONS,
              });
            } else {
              dispatch({
                type: ADD_NOTIFICATIONS,
                payload: response,
              });
            }
          }
        } else {
      dispatch(returnErrors({ error: { error: "Notifications fetching fails" } }));
        }
      });
    })
    .catch(() => {
      dispatch(returnErrors({ error: { error: "Network error" } }));
    });
};

export const newNotification = (newNotification) => async (dispatch) => {
  dispatch({
    type: NEW_NOTIFICATION,
    payload: newNotification,
  });
};
