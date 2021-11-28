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

export const partnerReducer = (state = {}, action) => {
  switch (action.type) {
    case PARTNER_LOGIN_REQUEST:
    case PARTNER_REGISTER_REQUEST:
    case PARTNER_CREATE_POST_REQUEST:
      return { ...state, loading: true };

    case PARTNER_LOGIN_SUCCESS:
    case PARTNER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        partner: action.payload.partner,
        message: action.payload.message,
      };

    case PARTNER_LOGIN_FAIL:
    case PARTNER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        partner: null,
        error: action.payload,
      };
    case PARTNER_DETAILS:
      return {
        ...state,
        partner: action.payload,
      };
    case NO_PARTNER:
      return {
        ...state,
        partner: null,
      };
    case PARTNER_CREATE_POST_SUCCESS:
      return { ...state, message: action.payload, loading: false };
    case PARTNER_CREATE_POST_FAIL:
      return { ...state, error: action.payload, loading: false };
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
