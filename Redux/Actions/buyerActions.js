import {
  GET_NEARBY_ITEMS,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  GET_ORDER,
  CLEAR_ORDER,
  ORDER_POSTED,
  ORDER_FAILED,
  CLEAR_MSG_ERROR,
  CLEAR_MESSAGE,
  GET_ERRORS,
  GET_MALL_ITEMS,
  GET_NEARBY_FAST_FOOD,
  ADD_MALL_ITEMS,
  NO_MORE_ITEMS,
  NO_MORE_FASTFOOD,
  ADD_NEARBY_FAST_FOOD,
  ADD_NEARBY_MALL_ITEMS,
  FAST_FOOD_SEARCH_KEYWORD,
  MALL_ITEMS_CATEGORY,
  NEARBY_ITEMS_CATEGORY,
} from "../Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import url from "../../Constants/URL";

export const getNearbyFastFood = (location, name, skip) => (dispatch) => {
  fetch(
    `${url}/fastfood/inrange/${location.latitude}/${location.longitude}/${name}/${skip}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (res) => {
      const data = await res.json();
      if (Number(skip) === 0) {
        dispatch({
          type: GET_NEARBY_FAST_FOOD,
          payload: data,
        });
      } else {
        if (data.length === 0) {
          dispatch({
            type: NO_MORE_FASTFOOD,
          });
        } else {
          dispatch({
            type: ADD_NEARBY_FAST_FOOD,
            payload: data,
          });
        }
      }
    })
    .catch((e) => {
      dispatch({
        type: GET_ERRORS,
        payload: "Failed to fetch",
      });
    });
};

export const getMallItems = (niche, skip, name) => (dispatch) => {
  fetch(`${url}/mall/items/?niche=${niche}&skip=${skip}&name=${name}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      if (Number(skip) === 0) {
        dispatch({
          type: GET_MALL_ITEMS,
          payload: data,
        });
      } else {
        if (data.length === 0) {
          dispatch({
            type: NO_MORE_ITEMS,
          });
        } else {
          dispatch({
            type: ADD_MALL_ITEMS,
            payload: data,
          });
        }
      }
    })
    .catch((e) => {
      dispatch({
        type: GET_ERRORS,
        payload: "Failed to fetch",
      });
    });
};

export const getNearbyMallItems =
  (location, niche, name, skip) => (dispatch) => {
    fetch(
      `${url}/items/inrange/${location.latitude}/${location.longitude}/?niche=${niche}&skip=${skip}&name=${name}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        const data = await res.json();
        if (Number(skip) === 0) {
          dispatch({
            type: GET_NEARBY_ITEMS,
            payload: data,
          });
        } else {
          if (data.length === 0) {
            dispatch({
              type: NO_MORE_ITEMS,
            });
          } else {
            dispatch({
              type: ADD_NEARBY_MALL_ITEMS,
              payload: data,
            });
          }
        }
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          payload: "Failed to fetch",
        });
      });
  };

export const getOrder = (item) => (dispatch) => {
  dispatch({
    type: GET_ORDER,
    payload: item,
  });
};

export const increaseQunatity = (id) => (dispatch) => {
  dispatch({
    type: INCREASE_QUANTITY,
    payload: id,
  });
};

export const decreaseQunatity = (id) => (dispatch) => {
  dispatch({
    type: DECREASE_QUANTITY,
    payload: id,
  });
};

export const clearOrder = (order) => (dispatch) => {
  dispatch({
    type: CLEAR_ORDER,
    payload: order,
  });
};

export const postOrder = (data) => async (dispatch) => {
  console.log("POST ORDER",data)
  let user = await AsyncStorage.getItem("persist:auth");
  let token = JSON.parse(user).token;
  fetch(`${url}/${data.buyerID}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      order: data.order,
      seller: data.sellerID,
      location: data.location,
      address: data.address,
    }),
  })
    .then((response) => {
      console.log("PPPPPPPPPPPPPPPPPpp")
      console.log(response)
      if (response.status === 200) {
        dispatch({
          type: ORDER_POSTED,
          payload: "Order Send Successfully!",
        });
      } else {
        dispatch({
          type: ORDER_FAILED,
          payload: "Order Sending Fails!",
        });
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};

export const setMallItemsCategory = (category) => (dispatch) => {
  dispatch({
    type: MALL_ITEMS_CATEGORY,
    payload: category,
  });
};

export const setNearbyItemsCategory = (category) => (dispatch) => {
  dispatch({
    type: NEARBY_ITEMS_CATEGORY,
    payload: category,
  });
};

export const setFastFoodSearchKeyword = (keyword) => (dispatch) => {
  dispatch({
    type: FAST_FOOD_SEARCH_KEYWORD,
    payload: keyword,
  });
};

export const clearMsgError = () => (dispatch) => {
  dispatch({
    type: CLEAR_MSG_ERROR,
  });
};

export const clearMessage = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGE,
  });
};
