import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOCATION_UPDATE,
  GET_NOTIFICATIONS,
  ADD_NOTIFICATIONS,
  NO_MORE_NOTIFICATIONS,
  NEW_NOTIFICATION,
  UPDATE_PROFILE_NAME,
  CLEAR_MESSAGE,
  UPDATE_PROFILE_IMAGE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  WELCOME_PAGE_SEEN,
  ADD_PHONE_NUMBER,
} from "../Types";

const initialState = {
  token: null,
  isAuthenticated: false,
  location: null,
  user: null,
  msg: null,
  notifications: [],
  welcomePage: "notSeen",
  newNotification: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        token: action.payload.token,
        isAuthenticated: true,
        msg: action.payload.msg,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        msg: null,
      };
    case LOCATION_UPDATE:
      return {
        ...state,
        location: action.payload,
      };
    case NEW_NOTIFICATION:
      return {
        ...state,
        newNotification: action.payload,
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case ADD_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...state.notifications, ...action.payload],
        msg: "",
      };
    case NO_MORE_NOTIFICATIONS:
      return {
        ...state,
        msg: "No More Notifications",
      };
    case UPDATE_PROFILE_NAME:
      return {
        ...state,
        user: { ...state.user, name: action.payload },
        msg: "Updated Successfully",
      };
    case ADD_PHONE_NUMBER:
      return {
        ...state,
        user: { ...state.user, contact: action.payload },
        msg: "Updated Successfully",
      };
    case UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        user: { ...state.user, image: action.payload },
      };
    case WELCOME_PAGE_SEEN:
      return {
        ...state,
        welcomePage: "seen",
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        msg: null,
      };
    case ADD_TO_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart: [...state.user.cart, { item: action.payload }],
        },
      };
    case REMOVE_FROM_CART:
      var newCart = state.user.cart.filter(
        (item) => item.item._id !== action.payload
      );
      return {
        ...state,
        user: {
          ...state.user,
          cart: newCart,
        },
      };
    default:
      return state;
  }
}
