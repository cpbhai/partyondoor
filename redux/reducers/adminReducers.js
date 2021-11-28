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

export const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_NEW_CATEGORY_REQUEST:
    case ADMIN_NEW_SUBCATEGORY_REQUEST:
      return { ...state, loading: true };

    case ADMIN_NEW_CATEGORY_SUCCESS:
    case ADMIN_NEW_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case ADMIN_NEW_CATEGORY_FAIL:
    case ADMIN_NEW_SUBCATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};
