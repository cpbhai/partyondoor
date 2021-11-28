import { Fragment, useEffect, useState, useRef } from "react";
import { RedirectTo } from "../../../utils/RouteHandling";
import Loading from "../../../components/design/Loading";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Rating from "@mui/material/Rating";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { loadPartItem, clearErrors } from "../../../redux/actions/itemActions";
import { SHOW_ADDCARTQTY_MODAL } from "../../../redux/constants/designConstants";
import SendNotif from "../../../utils/SendNotif";
import MetaData from "../../../utils/MetaData";
import ReviewCard from "../../../components/ReviewCard";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Cake = ({ w }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, partItem, error } = useSelector((state) => state.itemFetch);
  const [addrId, setAdrId] = useState("");
  const [addrCost, setAdrCost] = useState(0);
  const [unitCost, setUnitCost] = useState({ unit: "", cost: 0, desc: "" });
  const { cost, desc } = unitCost;
  const [imgActive, setActiveImg] = useState(0);
  const [ucActive, setActiveUc] = useState(0);
  const itmDelivCost = useRef(null);
  useEffect(() => {
    if (!partItem) dispatch(loadPartItem(w));
    else {
      setUnitCost(partItem.costByDeps[0]);
    }
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
      router.push("/");
    }
  }, [dispatch, error, router, partItem]);
  const handleAddtoCart = () => {
    if (addrId === "") {
      dispatch(SendNotif("error", "Please, select nearby area below."));
      let v = itmDelivCost.current.classList;
      return v.add("isDecorAlert");
    }
    dispatch({
      type: SHOW_ADDCARTQTY_MODAL,
      payload: {
        id: w,
        addrId,
        prodDetails: {
          title: partItem.title,
          preview: partItem.images[0].url,
          unitCost,
        },
        dCost: addrCost,
      },
    });
  };
  const handleChange = (e) => {
    setAdrId(e.target.value);
    let v = itmDelivCost.current.classList;
    if (v.value.includes("isDecorAlert")) {
      v.remove("isDecorAlert");
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Great",
      html: "Now, Please<br>Add to Cart from above.",
      showConfirmButton: true,
      timer: 4500,
    });
  };
  const handlePrice = (unit, cost, desc, idx) => {
    setUnitCost({ unit, cost, desc });
    setActiveUc(idx);
  };
  const isimgActive = (arg) => {
    if (imgActive === arg) return " itmImgActive";
    return "";
  };
  const isUcActive = (arg) => {
    if (ucActive === arg) return " isDecorUcActive";
    return "";
  };
  return (
    <Fragment>
      {loading ? (
        <>
          <MetaData title="Loading..." />
          <h3 className="textCenter" style={{ marginTop: "30vh" }}>
            Please Wait:)
          </h3>
          <Loading show={loading} />
        </>
      ) : (
        <>
          {partItem && (
            <>
              <MetaData title={`${partItem.title} | www.partyondoor.com`} />
              <div className="isDecorHeight-1"></div>
              <div className="isDecorMainDiv">
                <div className="dFlexWrap justfyeven">
                  <div className="isDecorImgDiv">
                    <img
                      src={partItem.images[imgActive].url}
                      alt="..."
                      className="isDecorImgMain"
                    />
                    <div className="isDecorImagesList">
                      {partItem.images.map((imag, idx) => (
                        <img
                          key={idx}
                          src={imag.url}
                          onClick={() => setActiveImg(idx)}
                          alt="..."
                          className={"isDecorImagesListImg" + isimgActive(idx)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="isDecorDetailsDiv">
                    <p className="isDecorTitle">{partItem.title}</p>
                    <div className="isDecorCost">
                      <Typography variant="button">
                        <span className="tomato itmCostValue">₹ {cost}</span>
                      </Typography>
                    </div>
                    <div className="isDecorRating">
                      <Rating
                        name="half-rating-read"
                        value={partItem.ratings}
                        precision={0.5}
                        readOnly
                      />
                      <p className="isDecornumReviews-1">
                        {partItem.numOfReviews} Reviews Yet
                      </p>
                    </div>
                    <div className="isDecorAddCartDiv">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "rgb(247, 7, 147)",
                          "&:hover": {
                            backgroundColor: "rgb(247, 7, 147)",
                          },
                        }}
                        onClick={() => handleAddtoCart()}
                        startIcon={<AddShoppingCartIcon />}
                      >
                        Add to Cart
                      </Button>
                    </div>
                    <p className="isDecorUnitsPara">Units:</p>
                    <div className="isDecorUnitsDiv">
                      {partItem.costByDeps.map((uc, idx) => (
                        <Chip
                          key={idx}
                          sx={{ margin: "2.5px 2px" }}
                          label={uc.unit}
                          onClick={() =>
                            handlePrice(uc.unit, uc.cost, uc.desc, idx)
                          }
                          className={"isDecorUnitChip" + isUcActive(idx)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="isDecorDesc">{desc}</p>
                <div className="isDecorDelivCost" ref={itmDelivCost}>
                  <FormControl component="fieldset" sx={{ padding: "0 5px" }}>
                    <FormLabel
                      component="legend"
                      sx={{ fontWeight: "bold", color: "blueviolet" }}
                    >
                      From the following locations choose one which is,{" "}
                      <span style={{ color: "green" }}>
                        more near to your location.
                      </span>
                    </FormLabel>
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{
                        textAlign: "center",
                        color: "tomato",
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      We will ask Exact delivery location also.
                    </Typography>
                    <RadioGroup
                      aria-label="gender"
                      name="addrId"
                      value={addrId}
                      onChange={(e) => handleChange(e)}
                    >
                      {partItem.postedBy.delivcosts.map((ad, idx) => (
                        <FormControlLabel
                          key={idx}
                          value={ad._id}
                          onClick={() => setAdrCost(ad.cost)}
                          control={<Radio />}
                          label={ad.area}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="isDecorReviewsDiv">
                  {partItem.numOfReviews === 0 ? (
                    <h5 className="isDecornoreview">No Reviews Yet</h5>
                  ) : (
                    partItem.reviews.map((rv, idx) => (
                      <ReviewCard review={rv} key={idx} />
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
      <div style={{ height: "100px" }}></div>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const { w } = query;
  if (!w) return RedirectTo("/");
  return {
    props: { w }, // will be passed to the page component as props
  };
}

export default Cake;
