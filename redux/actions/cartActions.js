import cookie from "react-cookies";
import {
  CART_MESSAGE,
  CART_ERROR,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/cartConstants";
import { enCodeCart, deCodeCart } from "../../utils/tokenizer";

export const addtoCart =
  (id, quantity, addrId, preview, title, unitCost, dCost) =>
  async (dispatch) => {
    let cart = cookie.load("cart"),
      visibleCart = [],
      afterAdd = 0;
    const decData = deCodeCart(cart);
    if (decData.success) cart = decData.cart;
    else cart = [];
    if (!cart || cart.length === 0) {
      afterAdd = 1;
      cart = [{ _id: id, quantity, addrId, preview, title, unitCost, dCost }];
      visibleCart = cart;
      cart = enCodeCart(cart);
      cookie.save("cart", cart, { path: "/" });
    } else if (cart.length === 4) {
      return dispatch({
        type: CART_ERROR,
        payload: "Sorry, Already 4 items pending in cart.",
      });
    } else {
      let got = false;
      cart.forEach((itm) => {
        if (itm._id === id) {
          got = true;
          afterAdd = Number(itm.quantity) + Number(quantity);
          afterAdd = Math.min(afterAdd, 10);
          itm.quantity = afterAdd;
        }
      });
      if (!got) {
        cart.push({
          _id: id,
          quantity,
          addrId,
          preview,
          title,
          unitCost,
          dCost,
        });
      }
      visibleCart = cart;
      cart = enCodeCart(cart);
      cookie.save("cart", cart, { path: "/" });
    }
    dispatch({
      type: CART_MESSAGE,
      payload: {
        cart: visibleCart,
        message: `Added, Now Quantity: ${afterAdd}.`,
      },
    });
  };
export const loadCart = () => async (dispatch) => {
  let cart = cookie.load("cart");
  if (!cart) cart = [];
  else {
    const decData = deCodeCart(cart);
    if (decData.success) cart = decData.cart;
    else cart = [];
  }
  dispatch({
    type: CART_MESSAGE,
    payload: { cart },
  });
};

export const decreaseCart = (id) => async (dispatch) => {
  let cart = cookie.load("cart"),
    visibleCart = [];
  const decData = deCodeCart(cart);
  if (decData.success) cart = decData.cart;
  else cart = [];
  cart.forEach((itm) => {
    if (itm._id === id) {
      itm.quantity = Number(itm.quantity) - 1;
    }
  });
  visibleCart = cart;
  cart = enCodeCart(cart);
  cookie.save("cart", cart, { path: "/" });
  dispatch({
    type: CART_MESSAGE,
    payload: { cart: visibleCart },
  });
};
export const increaseCart = (id) => async (dispatch) => {
  let cart = cookie.load("cart"),
    visibleCart = [];
  const decData = deCodeCart(cart);
  if (decData.success) cart = decData.cart;
  else cart = [];
  cart.forEach((itm) => {
    if (itm._id === id) {
      itm.quantity = Number(itm.quantity) + 1;
    }
  });
  visibleCart = cart;
  cart = enCodeCart(cart);
  cookie.save("cart", cart, { path: "/" });
  dispatch({
    type: CART_MESSAGE,
    payload: { cart: visibleCart },
  });
};
export const removeFromCart = (id) => async (dispatch) => {
  let cart = cookie.load("cart"),
    visibleCart = [];
  const decData = deCodeCart(cart);
  if (decData.success) cart = decData.cart;
  else cart = [];
  cart = cart.filter((itm) => itm._id !== id);
  visibleCart = cart;
  cart = enCodeCart(cart);
  cookie.save("cart", cart, { path: "/" });
  dispatch({
    type: CART_MESSAGE,
    payload: { cart: visibleCart },
  });
};
export const clearCartErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearCartMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
