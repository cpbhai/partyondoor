import {
  CART_MESSAGE,
  CART_ERROR,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/cartConstants";

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_MESSAGE:
      return {
        cart_message: action.payload.message,
        cart: action.payload.cart,
      };

    case CART_ERROR:
      return {
        cart_error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        cart_error: null,
      };
    case CLEAR_MESSAGES:
      return {
        cart_message: null,
      };

    default:
      return state;
  }
};
