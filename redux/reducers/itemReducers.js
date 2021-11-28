import {
  ITEM_REQUEST,
  ITEM_SUCCESS,
  ITEM_FAIL,
  PARTCU_ITEM_REQUEST,
  PARTCU_ITEM_SUCCESS,
  PARTCU_ITEM_FAIL,
  CLEAR_ERRORS,
} from "../constants/itemConstants";

export const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_REQUEST:
    case PARTCU_ITEM_REQUEST:
      return { loading: true };

    case ITEM_SUCCESS:
      return {
        loading: false,
        items: action.payload.items,
        totalPages: action.payload.totalPages,
      };
    case PARTCU_ITEM_SUCCESS:
      return {
        loading: false,
        partItem: action.payload,
      };

    case ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PARTCU_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};
