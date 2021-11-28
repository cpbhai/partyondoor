import cookie from "react-cookies";
import {
  ITEM_REQUEST,
  ITEM_SUCCESS,
  ITEM_FAIL,
  PARTCU_ITEM_REQUEST,
  PARTCU_ITEM_SUCCESS,
  PARTCU_ITEM_FAIL,
  CLEAR_ERRORS,
} from "../constants/itemConstants";
const token = cookie.load("token");

export const itemsLoad =
  (keyword, category, subcategory, page) => async (dispatch) => {
    dispatch({ type: ITEM_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    await fetch(
      `/api/v1/items/gtone?keyword=${keyword}&category=${category}&subcategory=${subcategory}&page=${page}&limit=2`,
      config
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: ITEM_SUCCESS,
            payload: {
              items: data.items,
              totalPages: data.totalPages,
            },
          });
        } else
          dispatch({
            type: ITEM_FAIL,
            payload: data.message,
          });
      })
      .catch((err) => {
        dispatch({
          type: ITEM_FAIL,
          payload: "Please, Reload again.",
        });
      });
  };

export const loadPartItem = (id) => async (dispatch) => {
  dispatch({ type: PARTCU_ITEM_REQUEST });
  await fetch(`/api/v1/items/specific?w=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: PARTCU_ITEM_SUCCESS,
          payload: data.item,
        });
      } else
        dispatch({
          type: PARTCU_ITEM_FAIL,
          payload: data.message,
        });
    })
    .catch((err) => {
      dispatch({
        type: PARTCU_ITEM_FAIL,
        payload: "Please, Reload again.",
      });
    });
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
