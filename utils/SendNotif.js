import { SHOW_NOTIF } from "../redux/constants/designConstants";

const SendNotif = (bg, msg) => {
  return { type: SHOW_NOTIF, payload: { bg, msg } };
};

export default SendNotif;
