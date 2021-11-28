import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {
  newSubCategory,
  clearErrors,
  clearMessages,
} from "../../../redux/actions/adminActions";
import MetaData from "../../../utils/MetaData";
import Loading from "../../../components/design/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SendNotif from "../../../utils/SendNotif";

const SubCategoryComp = () => {
  const loadCats = async () => {
    await fetch("/api/v1/category/gtone")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) setAllCats(data.categories);
      });
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.admin);
  useEffect(() => {
    loadCats();
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
    }
    if (message) {
      dispatch(SendNotif("success", message));
      dispatch(clearMessages());
      router.push("/");
    }
  }, [dispatch, error, message, router]);
  const [allCats, setAllCats] = useState([]);
  const [values, setValues] = useState({
    name: "",
    category: "",
  });
  const { name, category } = values;
  const handleSelect = (e) => {
    const { value } = e.props;
    setValues({ ...values, ["category"]: value });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    if (!name) return dispatch(SendNotif("error", "Name can't be empty."));
    if (name.length > 25)
      return dispatch(
        SendNotif("error", "Name length can't exceed 30 letters.")
      );
    if (!category) return dispatch(SendNotif("error", "Category is missing."));
    dispatch(newSubCategory(name, category));
  };
  return (
    <Fragment>
      <MetaData title="Admin New Sub Category" />
      <Loading show={loading} />
      <div style={{ height: "2vh" }}></div>
      <Typography
        variant="h6"
        display="block"
        sx={{ textAlign: "center", marginBottom: "20px" }}
        gutterBottom
      >
        New Sub Category
      </Typography>
      <div className="aNewSubCatmainDiv">
        <Stack>
          <FormControl className="aNewSubCatformControl">
            <Input
              type="text"
              placeholder="Name"
              className="aNewSubCatinput"
              name="name"
              value={name}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <CategoryIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className="aNewSubCatformControl">
            <InputLabel id="demo-simple-select-label-1">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label-1"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e, v) => handleSelect(v)}
            >
              {allCats.map((ctg, idx) => (
                <MenuItem key={idx} value={ctg._id}>
                  {ctg.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            sx={{ marginTop: "10px" }}
            onClick={handleSubmit}
          >
            Add
          </Button>
          <Link href="/">
            <a
              className="aNewSubCatLink mt-2 textCenter fontwb"
              style={{ color: "red" }}
            >
              Cancel
            </a>
          </Link>
        </Stack>
      </div>
      <div style={{ height: "120px" }}></div>
    </Fragment>
  );
};

export default SubCategoryComp;
