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
import { Country, State, City } from "country-state-city";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {
  signup,
  clearErrors,
  clearMessages,
} from "../../redux/actions/partnerActions";
import MetaData from "../../utils/MetaData";
import Loading from "../../components/design/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SendNotif from "../../utils/SendNotif";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, partner, message, error } = useSelector(
    (state) => state.partner
  );
  const loadSavedDelivs = () => {
    let savedDs = window.localStorage.getItem("partSavedDelivs");
    if (savedDs) {
      savedDs = JSON.parse(savedDs);
      setDelivCosts(savedDs);
    }
  };
  useEffect(() => {
    loadSavedDelivs();
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
    }
    if (partner) {
      if (message) {
        dispatch(SendNotif("success", message));
        dispatch(clearMessages());
      }
      router.push("/p/dashboard");
    }
  }, [dispatch, error, message, partner, router]);
  const [allStates, setAllStates] = useState(State.getStatesOfCountry("IN"));
  const [allCities, setAllCities] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    area: "",
    cost: "",
  });
  const [delivcosts, setDelivCosts] = useState([]);
  const { name, email, phone, password, area, cost } = values;
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
    if (name === "cost" && value < 0)
      return dispatch(SendNotif("warning", "Invalid Cost Value."));
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
    if (delivcosts.length === 0)
      return dispatch(
        SendNotif("error", "At least 1 delivery area is mandatory.")
      );
    if (phone.length !== 10)
      return dispatch(SendNotif("error", "Phone must be 10 digit long."));
    if (password.length < 8)
      return dispatch(
        SendNotif("error", "Password must be atleast 8 letters.")
      );
    dispatch(
      signup(name, email, phone, password, state, city, delivcosts)
    );
  };
  const handleAddDeliv = () => {
    if (!area || cost === "")
      return dispatch(SendNotif("warning", "Invalid Area OR Cost."));
    setDelivCosts([...delivcosts, { area, cost: Number(cost) }]);
    setValues({ ...values, ["area"]: "", ["cost"]: "" });
  };
  const handleDelete = (arg) => {
    arg = arg.toLowerCase();
    setDelivCosts(delivcosts.filter((ech) => ech.area.toLowerCase() !== arg));
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
        New Partner
      </Typography>
      <div className="pSignuPmainDiv">
        <Stack>
          <FormControl className="pSignuPformControl">
            <Input
              type="text"
              placeholder="Your Name"
              className="pSignuPinput"
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
          <FormControl className="pSignuPformControl">
            <Input
              type="email"
              placeholder="Your Email"
              className="pSignuPinput"
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
          <FormControl className="pSignuPformControl">
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
          <FormControl className="pSignuPformControl">
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

          {delivcosts.length !== 0 ? (
            <div className="dFlexWrap justfyeven pSignuPWidth">
              {delivcosts.map((data, idx) => (
                <Chip
                  key={idx}
                  label={`${data.area}: ₹ ${data.cost}`}
                  color="primary"
                  sx={{ marginBottom: "15px", width: "fit-content" }}
                  onDelete={() => handleDelete(data.area)}
                />
              ))}
            </div>
          ) : (
            <Typography
              variant="caption"
              display="block"
              sx={{ textAlign: "center", marginBottom: "15px" }}
              gutterBottom
            >
              Add Delivery Areas &amp; Cost for delivery, below.
            </Typography>
          )}
          <FormControl className="pSignuPformControl">
            <Input
              type="text"
              placeholder={`Delivery Area ${delivcosts.length + 1}`}
              className="pSignuPinput"
              sx={{ marginBottom: "9px" }}
              name="area"
              value={area}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <AddLocationIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className="pSignuPformControl">
            <Input
              type="number"
              placeholder={
                `Delivery Cost` + (area.length !== 0 ? ` For: ${area}` : ``)
              }
              className="pSignuPinput"
              name="cost"
              value={cost}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <AttachMoneyIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>
          <div className="dFlex justfycent">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{ marginTop: "10px", width: "fit-content" }}
              onClick={handleAddDeliv}
            >
              Add to Delivery List
            </Button>
          </div>
          <FormControl
            className="pSignuPformControl"
            sx={{ marginTop: "20px" }}
          >
            <Input
              type="text"
              placeholder="Your Phone"
              className="pSignuPinput"
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
          <FormControl className="pSignuPformControl">
            <Input
              type="password"
              placeholder="Password"
              className="pSignuPinput"
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
          <Link href="/p/login">
            <a
              className="pSignuPLink mt-2 textCenter fontwb"
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
export default Signup;
