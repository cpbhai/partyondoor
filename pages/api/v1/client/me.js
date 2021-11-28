import connectDB from "../../../../utils/connectDB";
import Client from "../../../../models/clientModel";

connectDB();

const Me = async (req, res) => {
  switch (req.method) {
    case "GET":
      await Me_get(req, res);
      break;
  }
};

const Me_get = async (req, res) => {
  try {
    const { w } = req.query;
    const user = await Client.findById(w);
    if (user) res.status(200).json({ success: true, user });
    else
      res.status(422).json({ success: false, message: "No such user found." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

export default Me;
