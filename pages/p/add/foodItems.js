import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import LabelIcon from "@mui/icons-material/Label";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  createFoodItem,
  clearErrors,
  clearMessages,
} from "../../../redux/actions/partnerActions";
import MetaData from "../../../utils/MetaData";
import Loading from "../../../components/design/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ProtectedRoute } from "../../../utils/RouteHandling";
import SendNotif from "../../../utils/SendNotif";

const Create = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.partner);
  const getAllCats = async () => {
    await fetch("/api/v1/category/gtone")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          const { categories } = data;
          categories = categories.filter(
            ({ general }) => general == "foodItems"
          );
          setAllCats(categories);
        }
      });
  };
  const getSubsOfCat = async (catId) => {
    await fetch(`/api/v1/subcategory/specific?category=${catId}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setAllSubCats(data.subcategories);
        }
      });
  };
  useEffect(() => {
    getAllCats();
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
    }
    if (message) {
      dispatch(SendNotif("success", message));
      dispatch(clearMessages());
      router.push("/p/dashboard");
    }
  }, [dispatch, error, message, router]);
  const [allCats, setAllCats] = useState([]);

  const [allSubcats, setAllSubCats] = useState([]);
  const [category, setCategory] = useState("");

  const [subcategory, setSubCategory] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [values, setValues] = useState({
    title: "",
    description: "",
    unit: "",
    cost: "",
  });
  const { title, description, unit, cost } = values;
  const [costByDeps, setCostByDeps] = useState([]);
  const handleAddCost = () => {
    if (!unit || cost === "")
      return dispatch(SendNotif("warning", "Invalid Unit OR Cost."));
    setCostByDeps([...costByDeps, { unit, cost: Number(cost) }]);
    setValues({ ...values, ["unit"]: "", ["cost"]: "" });
  };
  const handleDelCost = (arg) => {
    arg = arg.toLowerCase();
    setCostByDeps(costByDeps.filter((ech) => ech.unit.toLowerCase() !== arg));
  };
  const handleSelect = (e, which) => {
    const { value } = e.props;
    if (which === "Category") {
      setCategory(value);
      getSubsOfCat(value);
    } else {
      setSubCategory(value);
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    let approvedImgs = [],
      approvedUrls = [],
      len = files.length,
      overflow = false;
    for (let i = 0; i < len && !overflow; ++i) {
      const file = files[i];
      if (file.type.match(/image\/*/)) {
        if (file.size <= 2097152) {
          if (approvedImgs.length === 3) {
            overflow = true;
            dispatch(SendNotif("warning", "Maximum 3 images are allowed."));
          } else {
            approvedUrls.push(URL.createObjectURL(file));
            approvedImgs.push(file);
          }
        } else
          dispatch(SendNotif("warning", "Image size > 2 MB is not allowed."));
      } else dispatch(SendNotif("warning", "Only images are allowed."));
    }
    setImages(approvedImgs);
    setPreviews(approvedUrls);
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "description") {
      value = value.replace(/\s+/g, " "); //remove multiple spaces
      if (value.length > 550)
        return dispatch(
          SendNotif("warning", "Description length limit is 550.")
        );
    }
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    if (!title) return dispatch(SendNotif("error", "Title can't be empty."));
    if (title.length > 80)
      return dispatch(SendNotif("error", "Title length limit is 80."));
    if (!category)
      return dispatch(SendNotif("error", "Category can't be empty."));
    if (!subcategory)
      return dispatch(SendNotif("error", "Sub-Category can't be empty."));
    if (costByDeps.length === 0)
      return dispatch(SendNotif("error", "weight 1 & cost is must."));
    if (!description)
      return dispatch(SendNotif("error", "Description can't be empty."));
    if (images.length === 0)
      return dispatch(SendNotif("error", "Please, select at least 1 image."));
    dispatch(
      createFoodItem(title, category, subcategory, costByDeps, description, images)
    );
  };
  return (
    <Fragment>
      <MetaData title="New Food Item | www.partyondoor.com" />
      <Loading show={loading} />
      <div style={{ height: "2vh" }}></div>
      <Typography
        variant="h6"
        display="block"
        sx={{ textAlign: "center", marginBottom: "20px" }}
        gutterBottom
      >
        New Food Item
      </Typography>
      <div className="pCreateItmmainDiv">
        <Stack>
          <FormControl className="pCreateItmformControl">
            <Input
              type="text"
              placeholder="Title"
              className="pCreateItminput"
              name="title"
              value={title}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <LabelIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className="pCreateItmformControl">
            <InputLabel id="demo-simple-select-label-1">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label-1"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e, v) => handleSelect(v, "Category")}
            >
              {allCats.map((ctg, idx) => (
                <MenuItem key={idx} value={ctg._id}>
                  {ctg.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="mt-1"></div>
          <FormControl className="pCreateItmformControl">
            <InputLabel id="demo-simple-select-label-2">
              Sub-Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label-2"
              id="demo-simple-select"
              value={subcategory}
              label="Sub-Category"
              onChange={(e, v) => handleSelect(v, "SubCategory")}
            >
              {allSubcats.map((sbct, idx) => (
                <MenuItem key={idx} value={sbct._id}>
                  {sbct.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="mt-1"></div>
          {costByDeps.length !== 0 ? (
            <div className="dFlexWrap justfyeven pCreateItmWidth">
              {costByDeps.map((data, idx) => (
                <Chip
                  key={idx}
                  label={`${data.unit}: ₹ ${data.cost}`}
                  color="primary"
                  sx={{ marginBottom: "15px", width: "fit-content" }}
                  onDelete={() => handleDelCost(data.unit)}
                />
              ))}
            </div>
          ) : (
            <div className="foodItmUnitTipDiv"
            >
              <Typography
                variant="p"
                display="block"
                sx={{ textAlign: "center", marginBottom: "15px" }}
                className='foodItmUnitTip'
                gutterBottom
              >
                Add Unit wise cost like:
              </Typography>
              <Typography
                variant="caption"
                display="block"
                className='foodItmUnitEx'
                sx={{ textAlign: "center", marginBottom: "15px" }}
                gutterBottom
              >
                gm, Kg, ml, L, small, medium, large, Pair, Combo, etc...
              </Typography>
            </div>
          )}
          <FormControl className="pCreateItmformControl">
            <Input
              type="text"
              placeholder={`Like 50gm,100ml, 1 pair, combo of 3`}
              className="pCreateItminput"
              sx={{ marginBottom: "9px" }}
              name="unit"
              value={unit}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <LineWeightIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className="pCreateItmformControl">
            <Input
              type="number"
              placeholder={`Cost` + (unit.length !== 0 ? ` For: ${unit}` : ``)}
              className="pCreateItminput"
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
              onClick={handleAddCost}
            >
              Add to Cost List
            </Button>
          </div>
          <div style={{ margin: "10px 0" }}></div>
          <FormControl className="pCreateItmformControl">
            <TextareaAutosize
              className="pCreateItmTextArea"
              placeholder="Description of Food Item"
              name="description"
              onChange={handleChange}
              value={description}
              minRows={8}
            />
          </FormControl>
          <FormControl className="pCreateItmformControl">
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                name="images"
                id="icon-button-file"
                multiple
                type="file"
                onChange={(e) => handleFileChange(e)}
              />
              <IconButton
                color="secondary"
                aria-label="upload picture"
                sx={{ marginLeft: "-9px" }}
                component="span"
              >
                <PhotoCamera />
              </IconButton>
              {previews.length ? (
                <div className="dFlex justfycent pCreateItmDivPreviews">
                  {previews.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="..."
                      className="pCreateItmimgPreview"
                    />
                  ))}
                </div>
              ) : (
                <span style={{ color: "darkgray" }}>
                  Add Images of Item(max. 3)
                </span>
              )}
            </label>
          </FormControl>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            sx={{ marginTop: "10px" }}
            onClick={handleSubmit}
          >
            Post
          </Button>
          <Link href="/p/dashboard">
            <a
              className="pCreateItmLink mt-2 textCenter fontwb"
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
export async function getServerSideProps(context) {
  const { req, res } = context;
  const isProtected = ProtectedRoute(req.cookies.token, "partner", "/p/login");
  if (isProtected.status) {
    return isProtected.newRoute;
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default Create;
