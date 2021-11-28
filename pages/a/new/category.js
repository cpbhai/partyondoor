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
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CategoryIcon from "@mui/icons-material/Category";
import {
  newCategory,
  clearErrors,
  clearMessages,
} from "../../../redux/actions/adminActions";
import MetaData from "../../../utils/MetaData";
import Loading from "../../../components/design/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SendNotif from "../../../utils/SendNotif";

const Category = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.admin);
  useEffect(() => {
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
  const [values, setValues] = useState({
    name: "",
    image: "",
  });
  const { name, image } = values;
  const [imgPreview, setPreview] = useState("#");
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0 && files[0].type.match(/image\/*/)) {
      if (files[0].size <= 2097152) {
        const [file] = files;
        setPreview(URL.createObjectURL(file));
        setValues({ ...values, [name]: files[0] });
      } else dispatch(SendNotif("warning", "Image size is greater than 2 MB."));
    } else dispatch(SendNotif("warning", "Only Image is allowed."));
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
    if (!image) return dispatch(SendNotif("error", "Please, Add Your Image."));
    dispatch(newCategory(name, image));
  };
  return (
    <Fragment>
      <MetaData title="Admin New Category" />
      <Loading show={loading} />
      <div style={{ height: "2vh" }}></div>
      <Typography
        variant="h6"
        display="block"
        sx={{ textAlign: "center", marginBottom: "20px" }}
        gutterBottom
      >
        New Category
      </Typography>
      <div className="aNewCatmainDiv">
        <Stack>
          <FormControl className="aNewCatformControl">
            <Input
              type="text"
              placeholder="Name"
              className="aNewCatinput"
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
          <FormControl className="aNewCatformControl">
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                name="image"
                id="icon-button-file"
                type="file"
                onChange={(e) => handleFileChange(e)}
              />
              <IconButton
                color="secondary"
                aria-label="upload picture"
                sx={{ marginLeft: "-9px" }}
                component="span"
              >
                <InsertPhotoIcon />
              </IconButton>
              {image ? (
                <>
                  {image.name}
                  <div>
                    <img
                      src={imgPreview}
                      alt="..."
                      className="aNewCatimgPreview"
                    />
                  </div>
                </>
              ) : (
                <span style={{ color: "darkgray" }}>Add Image</span>
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
            Add
          </Button>
          <Link href="/">
            <a
              className="aNewCatLink mt-2 textCenter fontwb"
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

export default Category;
