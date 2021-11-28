import {
  ADMIN_NEW_CATEGORY_REQUEST,
  ADMIN_NEW_CATEGORY_SUCCESS,
  ADMIN_NEW_CATEGORY_FAIL,
  ADMIN_NEW_SUBCATEGORY_REQUEST,
  ADMIN_NEW_SUBCATEGORY_SUCCESS,
  ADMIN_NEW_SUBCATEGORY_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/adminConstants";
import { uploadSingleImage } from "../../utils/cloudinary";

export const newCategory = (name, image) => async (dispatch) => {
  dispatch({ type: ADMIN_NEW_CATEGORY_REQUEST });
  let alreadyUploaded = window.localStorage.getItem("admNewCatImg"),
    public_id = "/",
    url = "/";
  if (alreadyUploaded) {
    alreadyUploaded = JSON.parse(alreadyUploaded);
    public_id = alreadyUploaded.public_id;
    url = alreadyUploaded.url;
  } else {
    const cloudImg = await uploadSingleImage(image, "categories");
    public_id = cloudImg.public_id;
    url = cloudImg.url;
    window.localStorage.setItem(
      "admNewCatImg",
      JSON.stringify({ public_id, url })
    );
  }
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      public_id,
      url,
    }),
  };

  await fetch(`/api/v1/category/specific`, config)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: ADMIN_NEW_CATEGORY_SUCCESS,
          payload: "Added Successfully.",
        });
        window.localStorage.removeItem("admNewCatImg");
      } else
        dispatch({
          type: ADMIN_NEW_CATEGORY_FAIL,
          payload: data.message,
        });
    })
    .catch((err) => {
      dispatch({
        type: ADMIN_NEW_CATEGORY_FAIL,
        payload: "Please Try Again.",
      });
    });
};
export const newSubCategory = (name, category) => async (dispatch) => {
  dispatch({ type: ADMIN_NEW_SUBCATEGORY_REQUEST });
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      category,
    }),
  };

  await fetch(`/api/v1/subcategory/specific`, config)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: ADMIN_NEW_SUBCATEGORY_SUCCESS,
          payload: "Added Successfully.",
        });
      } else
        dispatch({
          type: ADMIN_NEW_SUBCATEGORY_FAIL,
          payload: data.message,
        });
    })
    .catch((err) => {
      dispatch({
        type: ADMIN_NEW_SUBCATEGORY_FAIL,
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
