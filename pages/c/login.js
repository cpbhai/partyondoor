import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/router";
import {
  login,
  clearErrors,
  clearMessages,
} from "../../redux/actions/clientActions";
import MetaData from "../../utils/MetaData";
import Loading from "../../components/design/Loading";
import { useDispatch, useSelector } from "react-redux";
import SendNotif from "../../utils/SendNotif";

const Login = ({ guide }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, client, message, error } = useSelector(
    (state) => state.client
  );
  useEffect(() => {
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
    }
    if (client) {
      if (message) {
        dispatch(SendNotif("success", message));
        dispatch(clearMessages());
      }
      if (guide !== "") router.push(guide);
      else router.push("/");
    }
  }, [dispatch, error, message, client, router]);
  const [values, setValues] = useState({
    ID: "",
    password: "",
  });
  const { ID, password } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    if (!ID)
      return dispatch(SendNotif("error", "Email or Phone can't be empty."));
    if (!password)
      return dispatch(SendNotif("error", "Password can't be empty."));
    dispatch(login(ID, password));
  };
  return (
    <Fragment>
      <MetaData title="Login | www.partyondoor.com" />
      <Loading show={loading} />
      <div style={{ height: "6vh" }}></div>
      <Typography
        variant="h6"
        display="block"
        sx={{ textAlign: "center", marginBottom: "32px" }}
        gutterBottom
      >
        Login
      </Typography>
      <div className="cLogiNmainDiv">
        <Stack>
          <FormControl className="cLogiNformControl">
            <Input
              type="text"
              placeholder="Email or Phone"
              className="cLogiNinput"
              name="ID"
              value={ID}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl className="cLogiNformControl">
            <Input
              type="password"
              placeholder="Password"
              className="cLogiNinput"
              sx={{ marginBottom: "9px" }}
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <VpnKeyIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>
          <Typography
            variant="caption"
            display="block"
            sx={{ textAlign: "center", marginBottom: "41px" }}
            gutterBottom
          >
            Your information is always safe with us :)
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            endIcon={<LoginIcon />}
            sx={{ marginTop: "10px" }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Link href={`/c/signup?guide=${guide}`}>
            <a
              className="cLogiNLink mt-2 textCenter fontwb"
              style={{ color: "tomato" }}
            >
              New User? Signup
            </a>
          </Link>
        </Stack>
      </div>
      <div style={{ height: "150px" }}></div>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  let { guide } = context.query;
  if (!guide) guide = "";
  return {
    props: { guide }, // will be passed to the page component as props
  };
}
export default Login;
