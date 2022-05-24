import {
  GET_NEARBY_ITEMS,
  GET_ORDER,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_ORDER,
  ORDER_POSTED,
  ORDER_FAILED,
  CLEAR_MSG_ERROR,
  LOGOUT_SUCCESS,
  GET_MALL_ITEMS,
  ADD_MALL_ITEMS,
  ADD_NEARBY_FAST_FOOD,
  GET_NEARBY_FAST_FOOD,
  NO_MORE_ITEMS,
  NO_MORE_FASTFOOD,
  CLEAR_MESSAGE,
  ADD_NEARBY_MALL_ITEMS,
  MALL_ITEMS_CATEGORY,
  NEARBY_ITEMS_CATEGORY,
  FAST_FOOD_SEARCH_KEYWORD,
} from "../Types";

const initialState = {
  mall_items: null,
  mall_items_category: "random",
  nearby_items: null,
  nearby_items_category: "random",
  nearby_fastFood: null,
  fast_food_search_keyword: "random",
  order: [],
  msg: "",
  error: null,
};

export default function buyerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MALL_ITEMS:
      return {
        ...state,
        mall_items: action.payload,
        msg: "",
      };
    case ADD_MALL_ITEMS:
      return {
        ...state,
        mall_items: [...state.mall_items, ...action.payload],
        msg: "",
      };
    case ADD_NEARBY_FAST_FOOD:
      return {
        ...state,
        nearby_fastFood: [...state.nearby_fastFood, ...action.payload],
        msg: "",
      };
    case GET_NEARBY_ITEMS:
      return {
        ...state,
        nearby_items: action.payload,
      };
    case ADD_NEARBY_MALL_ITEMS:
      return {
        ...state,
        nearby_items: [...state.nearby_items, ...action.payload],
        msg: "",
      };
    case NO_MORE_ITEMS:
      return {
        ...state,
        msg: "No More Items",
      };
    case MALL_ITEMS_CATEGORY:
      return {
        ...state,
        mall_items_category: action.payload,
      };
    case NEARBY_ITEMS_CATEGORY:
      return {
        ...state,
        nearby_items_category: action.payload,
      };
    case FAST_FOOD_SEARCH_KEYWORD:
      return {
        ...state,
        fast_food_search_keyword: action.payload,
      };
    case NO_MORE_FASTFOOD:
      return {
        ...state,
        msg: "No More Fast Food",
      };
    case GET_NEARBY_FAST_FOOD:
      return {
        ...state,
        nearby_fastFood: action.payload,
        msg: "",
      };
    case GET_ORDER:
      if (state.order.length !== 0) {
        let alreadyExists = state.order.find((order) => {
          if (order.item._id === action.payload._id) {
            return true;
          }
        });
        if (!alreadyExists) {
          return {
            ...state,
            order: [...state.order, { item: action.payload, quantity: 1 }],
          };
        }
        return { ...state };
      } else {
        return {
          ...state,
          order: [...state.order, { item: action.payload, quantity: 1 }],
        };
      }
    case CLEAR_ORDER:
      return {
        ...state,
        order: [],
      };
    case INCREASE_QUANTITY:
      const NewOrder = state.order.map((order) =>
      order.item._id === action.payload && order.quantity < 9
          ? { ...order, quantity: order.quantity + 1 }
          : order
      );
      console.log(state.order)
      console.log(NewOrder)
      return {
        ...state,
        order: NewOrder,
      };
    case DECREASE_QUANTITY:
      var decreaseOrder = [];
      state.order.forEach((order, index) => {
        if (order.item._id === action.payload) {
          order.quantity = order.quantity - 1;
          if (order.quantity === 0) {
            return delete decreaseOrder[index];
          }
          return decreaseOrder.push(order);
        } else {
          decreaseOrder.push(order);
        }
      });
      return {
        ...state,
        order: decreaseOrder,
      };
    case ORDER_POSTED:
      return {
        ...state,
        order: [],
        msg: action.payload,
      };
    case ORDER_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_MSG_ERROR:
      return {
        ...state,
        msg: null,
        error: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        msg: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        order: [],
        msg: null,
        error: null,
      };
    default:
      return state;
  }
}
