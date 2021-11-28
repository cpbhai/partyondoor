const jwt = require("jsonwebtoken");
import cookie from "react-cookies";

export const enCodeCart = (cart) => {
  return jwt.sign({ cart }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });
};
export const deCodeCart = (token) => {
  try {
    const resp = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { cart } = resp;
    return { success: true, cart };
  } catch (err) {
    cookie.remove("cart", { path: "/" });
    return { success: false };
  }
};
