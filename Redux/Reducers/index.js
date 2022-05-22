import { combineReducers } from "redux";
import buyerReducer from "./buyerReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  blacklist: ["buyer","error"],
};

export default combineReducers({
  buyer: buyerReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  error: errorReducer,
});
