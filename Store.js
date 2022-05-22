import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import rootReducer from "./Redux/Reducers";

const middleware = [thunk];

const buyerPersistConfig = {
  key: "buyer",
  storage: AsyncStorage,
  blacklist: ["auth","error"],
};

const persistedReducer = persistReducer(buyerPersistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
