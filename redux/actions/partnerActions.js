import cookie from "react-cookies";
import {
  PARTNER_LOGIN_REQUEST,
  PARTNER_LOGIN_SUCCESS,
  PARTNER_LOGIN_FAIL,
  PARTNER_REGISTER_REQUEST,
  PARTNER_REGISTER_SUCCESS,
  PARTNER_REGISTER_FAIL,
  PARTNER_CREATE_POST_REQUEST,
  PARTNER_CREATE_POST_SUCCESS,
  PARTNER_CREATE_POST_FAIL,
  PARTNER_DETAILS,
  NO_PARTNER,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/partnerConstants";
const token = cookie.load("token");
import { LOAD_USER_SUCCESS } from "../constants/userConstants";
import { uploadSingleImage } from "../../utils/cloudinary";

export const signup =
  (name, email, phone, password, state, city, delivcosts) =>
  async (dispatch) => {
    dispatch({ type: PARTNER_REGISTER_REQUEST });
    let partSavedDelivs = window.localStorage.getItem("partSavedDelivs");
    if (partSavedDelivs) {
      delivcosts = JSON.parse(partSavedDelivs);
    } else {
      window.localStorage.setItem(
        "partSavedDelivs",
        JSON.stringify(delivcosts)
      );
    }
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        state,
        city,
        delivcosts,
      }),
    };

    await fetch(`/api/v1/partner/signup`, config)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: LOAD_USER_SUCCESS,
          });
          dispatch({
            type: PARTNER_REGISTER_SUCCESS,
            payload: {
              partner: data.user,
              message: "Registered Successfully.",
            },
          });
          cookie.save("token", data.token, { path: "/" });
          window.localStorage.removeItem("partSavedDelivs");
        } else
          dispatch({
            type: PARTNER_REGISTER_FAIL,
            payload: data.message,
          });
      })
      .catch((err) => {
        dispatch({
          type: PARTNER_REGISTER_FAIL,
          payload: "Please Try Again.",
        });
      });
  };

export const login = (ID, password) => async (dispatch) => {
  dispatch({ type: PARTNER_LOGIN_REQUEST });

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ID, password }),
  };

  await fetch(`/api/v1/partner/login`, config)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: LOAD_USER_SUCCESS,
        });
        dispatch({
          type: PARTNER_LOGIN_SUCCESS,
          payload: { partner: data.user, message: "Logged In." },
        });
        cookie.save("token", data.token, { path: "/" });
      } else
        dispatch({
          type: PARTNER_LOGIN_FAIL,
          payload: data.message,
        });
    })
    .catch((err) => {
      dispatch({
        type: PARTNER_LOGIN_FAIL,
        payload: "Please Try Again.",
      });
    });
};

export const createFoodItem =
  (title, category, subcategory, costByDeps, description, imageFiles) =>
  async (dispatch) => {
    dispatch({ type: PARTNER_CREATE_POST_REQUEST });
    let images = [],
      len = imageFiles.length;
    let alreadyUploaded = window.localStorage.getItem("partItmCrtImgs");
    if (alreadyUploaded) {
      alreadyUploaded = JSON.parse(alreadyUploaded);
      images = alreadyUploaded;
    } else {
      for (let i = 0; i < len; ++i) {
        const imgData = await uploadSingleImage(imageFiles[i], "items");
        const { public_id, url } = imgData;
        images.push({ public_id, url });
      }
      window.localStorage.setItem("partItmCrtImgs", JSON.stringify(images));
    }
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        description,
        costByDeps,
        category,
        subcategory,
        images,
      }),
    };

    await fetch(`/api/v1/partner/item`, config)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: PARTNER_CREATE_POST_SUCCESS,
            payload: "Added Successfully.",
          });
          window.localStorage.removeItem("partItmCrtImgs");
        } else
          dispatch({
            type: PARTNER_CREATE_POST_FAIL,
            payload: data.message,
          });
      })
      .catch((err) => {
        dispatch({
          type: PARTNER_CREATE_POST_FAIL,
          payload: "Please Try Again.",
        });
      });
  };
export const createDecorItem =
  (title, category, subcategory, costByDeps, imageFiles) =>
  async (dispatch) => {
    dispatch({ type: PARTNER_CREATE_POST_REQUEST });
    let images = [],
      len = imageFiles.length;
    let alreadyUploaded = window.localStorage.getItem("partItmCrtImgs");
    if (alreadyUploaded) {
      alreadyUploaded = JSON.parse(alreadyUploaded);
      images = alreadyUploaded;
    } else {
      for (let i = 0; i < len; ++i) {
        const imgData = await uploadSingleImage(imageFiles[i], "items");
        const { public_id, url } = imgData;
        images.push({ public_id, url });
      }
      window.localStorage.setItem("partItmCrtImgs", JSON.stringify(images));
    }
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        costByDeps,
        category,
        subcategory,
        images,
      }),
    };

    await fetch(`/api/v1/partner/item`, config)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: PARTNER_CREATE_POST_SUCCESS,
            payload: "Added Successfully.",
          });
          window.localStorage.removeItem("partItmCrtImgs");
        } else
          dispatch({
            type: PARTNER_CREATE_POST_FAIL,
            payload: data.message,
          });
      })
      .catch((err) => {
        dispatch({
          type: PARTNER_CREATE_POST_FAIL,
          payload: "Please Try Again.",
        });
      });
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
