import cookie from "react-cookies";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "../constants/userConstants";
import { PARTNER_DETAILS, NO_PARTNER } from "../constants/partnerConstants";
import { CLIENT_DETAILS, NO_CLIENT } from "../constants/clientConstants";
const token = cookie.load("token");

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });
  const config = {
    method: "GET",
    headers: { Authorization: token },
  };
  await fetch(`/api/v1/common/loadUser`, config)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        if (data.user.type === "partner")
          dispatch({
            type: PARTNER_DETAILS,
            payload: data.user,
          });
        if (data.user.type === "client")
          dispatch({
            type: CLIENT_DETAILS,
            payload: data.user,
          });
        dispatch({
          type: LOAD_USER_SUCCESS,
        });
      } else {
        cookie.remove("token", { path: "/" });
        dispatch({ type: LOAD_USER_FAIL });
      }
    })
    .catch((err) => {
      dispatch({ type: LOAD_USER_FAIL });
    });
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  const config = {
    method: "GET",
    headers: { Authorization: token },
  };
  await fetch(`/api/v1/common/logout`, config)
    .then((response) => response.json())
    .then((data) => {
      cookie.remove("token", { path: "/" });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      if (data.type === "partner")
        dispatch({
          type: NO_PARTNER,
        });
      if (data.type === "client")
        dispatch({
          type: NO_CLIENT,
        });
    });
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
