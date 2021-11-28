import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import Chip from "@mui/material/Chip";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { Country, State, City } from "country-state-city";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {
  signup,
  clearErrors,
  clearMessages,
} from "../../redux/actions/clientActions";
import MetaData from "../../utils/MetaData";
import Loading from "../../components/design/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SendNotif from "../../utils/SendNotif";

const Signup = ({ guide }) => {
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
  const [allStates, setAllStates] = useState(State.getStatesOfCountry("IN"));
  const [allCities, setAllCities] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { name, email, phone, password } = values;
  const handleSelect = (e, which) => {
    const { value } = e.props;
    if (which === "State") {
      setState(value);
      setAllCities(City.getCitiesOfState("IN", value));
    } else {
      setCity(value);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && phone.length >= 10)
      dispatch(SendNotif("warning", "Phone must be 10 digit long."));
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    if (!name) return dispatch(SendNotif("error", "Name can't be empty."));
    if (name.length > 30)
      return dispatch(
        SendNotif("error", "Name length can't exceed 30 letters.")
      );
    if (!email.includes("@"))
      return dispatch(SendNotif("error", "Invalid Email."));
    if (!state) return dispatch(SendNotif("error", "State is missing."));
    if (!city) return dispatch(SendNotif("error", "City is missing."));
    if (phone.length !== 10)
      return dispatch(SendNotif("error", "Phone must be 10 digit long."));
    if (password.length < 8)
      return dispatch(
        SendNotif("error", "Password must be atleast 8 letters.")
      );
    dispatch(signup(name, email, phone, password, state, city));
  };
  return (
    <Fragment>
      <MetaData title="Signup | www.partyondoor.com" />
      <Loading show={loading} />
      <div style={{ height: "2vh" }}></div>
      <Typography
        variant="h6"
        display="block"
        sx={{ textAlign: "center", marginBottom: "20px" }}
        gutterBottom
      >
        New User
      </Typography>
      <div className="cSignuPmainDiv">
        <Stack>
          <FormControl className="cSignuPformControl">
            <Input
              type="text"
              placeholder="Your Name"
              className="cSignuPinput"
              name="name"
              value={name}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className="cSignuPformControl mt-1">
            <Input
              type="email"
              placeholder="Your Email"
              className="cSignuPinput"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className="cSignuPformControl">
            <InputLabel id="demo-simple-select-label-1">State</InputLabel>
            <Select
              labelId="demo-simple-select-label-1"
              id="demo-simple-select"
              value={state}
              label="State"
              onChange={(e, v) => handleSelect(v, "State")}
            >
              {allStates.map((st, idx) => (
                <MenuItem key={idx} value={st.isoCode}>
                  {st.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="mt-1"></div>
          <FormControl className="cSignuPformControl">
            <InputLabel id="demo-simple-select-label-2">City</InputLabel>
            <Select
              labelId="demo-simple-select-label-2"
              id="demo-simple-select"
              value={city}
              label="City"
              onChange={(e, v) => handleSelect(v, "City")}
            >
              {allCities.map((city, idx) => (
                <MenuItem key={idx} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="mt-1"></div>
          <FormControl className="cSignuPformControl mt-1">
            <Input
              type="text"
              placeholder="Your Phone"
              className="cSignuPinput"
              sx={{ marginBottom: "9px" }}
              name="phone"
              value={phone}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <PhoneIphoneIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className="cSignuPformControl">
            <Input
              type="password"
              placeholder="Password"
              className="cSignuPinput"
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
            endIcon={<PersonAddIcon />}
            sx={{ marginTop: "10px" }}
            onClick={handleSubmit}
          >
            Register
          </Button>
          <Link href={`/c/login?guide=${guide}`}>
            <a
              className="cSignuPLink mt-2 textCenter fontwb"
              style={{ color: "tomato" }}
            >
              Already User? Login
            </a>
          </Link>
        </Stack>
      </div>
      <div style={{ height: "120px" }}></div>
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
export default Signup;
