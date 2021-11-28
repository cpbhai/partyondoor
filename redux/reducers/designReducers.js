import {
  SHOW_MAIN_DRAWER,
  HIDE_MAIN_DRAWER,
  SHOW_ADDCARTQTY_MODAL,
  HIDE_ADDCARTQTY_MODAL,
  SHOW_NOTIF,
  HIDE_NOTIF,
} from "../constants/designConstants";

export const designReducer = (
  state = {
    mainDrawer: false,
    notifbg: "",
    notifmsg: "",
    addCartQtModal: false,
  },
  action
) => {
  switch (action.type) {
    case SHOW_MAIN_DRAWER:
      return { mainDrawer: true };
    case HIDE_MAIN_DRAWER:
      return { mainDrawer: false };
    case SHOW_ADDCARTQTY_MODAL:
      return {
        addCartQtModal: true,
        id: action.payload.id,
        addrId: action.payload.addrId,
        preview: action.payload.prodDetails.preview,
        title: action.payload.prodDetails.title,
        unitCost: action.payload.prodDetails.unitCost,
        dCost: action.payload.dCost,
      };
    case HIDE_ADDCARTQTY_MODAL:
      return {
        addCartQtModal: false,
      };
    case SHOW_NOTIF:
      return {
        notif: true,
        notifbg: action.payload.bg,
        notifmsg: action.payload.msg,
      };
    case HIDE_NOTIF:
      return { notif: false };
    default:
      return state;
  }
};
