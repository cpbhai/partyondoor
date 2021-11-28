import connectDB from "../../../../utils/connectDB";
import Auth from "../../../../utils/auth";

connectDB();

const LoadUser = async (req, res) => {
  const midwr = await Auth(req.headers.authorization);
  if (midwr.success) {
    res.status(200).json({ success: true, user: midwr.user });
  } else res.status(422).json(midwr);
};

export default LoadUser;
