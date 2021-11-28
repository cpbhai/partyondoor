const jwt = require("jsonwebtoken");
const Partner = require("../models/partnerModel.js");
const Client = require("../models/clientModel.js");

const Auth = async (token) => {
  if (!token || token === "undefined") {
    return { success: false, message: "Please Login first." };
  }
  let decodedData = null,
    user = null;
  try {
    decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return { success: false, message: "Please, Login Again." };
  }

  if (decodedData.type === "admin") {
    //user = await Admin.findById(decodedData.id);
  } else if (decodedData.type === "partner") {
    user = await Partner.findById(decodedData.id);
  } else if (decodedData.type === "client") {
    user = await Client.findById(decodedData.id);
  }
  if (!user) return { success: false, message: "Please, Login Again." };
  return { success: true, user };
};
export default Auth;
