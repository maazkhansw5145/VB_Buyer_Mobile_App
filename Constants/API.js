import url from "./URL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";
import "firebase/storage";

export const cancelOrder = (orderId) => {
  fetch(`${url}/${orderId}/cancel/order`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const savingToken = (buyerID, token) => {
  fetch(`${url}/add/notification/token/${buyerID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token.data }),
  });
};

export const submiteReview = async (buyerId, orderId, ratingsObject) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  fetch(`${url}/rate/${buyerId}/${orderId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ratingsObject),
  });
};

export const saveSearchString = async (keyword, user, location) => {
  fetch(`${url}/add/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyword, user, location }),
  });
};

export const report = async (buyer, order, seller, description, image) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  if (image) {
    const task = firebase.storage().ref().child(`report/${order}`).put(image);
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      task.snapshot.ref.getDownloadURL().then((imageURL) => {
        fetch(`${url}/report/${buyer}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            seller,
            order,
            description,
            image: imageURL,
          }),
        });
      });
    });
  } else {
    fetch(`${url}/report/${buyer}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        seller,
        order,
        description,
      }),
    });
  }
};

export const registerShop = async (buyer, order, seller, description, image) => {
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  if (image) {
    const task = firebase.storage().ref().child(`report/${order}`).put(image);
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      task.snapshot.ref.getDownloadURL().then((imageURL) => {
        fetch(`${url}/report/${buyer}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            seller,
            order,
            description,
            image: imageURL,
          }),
        });
      });
    });
  } else {
    fetch(`${url}/report/${buyer}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        seller,
        order,
        description,
      }),
    });
  }
};
