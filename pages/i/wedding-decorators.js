import { Fragment, useState, useEffect, useRef } from "react";
import MetaData from "../../utils/MetaData";
import Pagination from "@mui/material/Pagination";
import { RedirectTo } from "../../utils/RouteHandling";
import FilterListIcon from "@mui/icons-material/FilterList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { itemsLoad, clearErrors } from "../../redux/actions/itemActions";
import SendNotif from "../../utils/SendNotif";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/design/Loading";
import { ProtectedRoute } from "../../utils/RouteHandling";

const Index = ({ w, subCats }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, items, totalPages, error } = useSelector(
    (state) => state.itemFetch
  );
  const { client } = useSelector((state) => state.client);
  const custBar = useRef(null);
  const flipCustBar = () => {
    let v = custBar.current.classList;
    if (v.value.includes("cakesHideCustBar")) {
      v.remove("cakesHideCustBar");
      v.add("cakesShowCustBar");
    } else {
      v.remove("cakesShowCustBar");
      v.add("cakesHideCustBar");
    }
  };
  useEffect(() => {
    dispatch(itemsLoad(keyword, w, subcategory, page));
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
      router.push("/");
    }
  }, [dispatch, error, router]);
  const [subcategories, setSubcats] = useState(subCats);
  const [subcategory, setSubCt] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const handleSubcat = (id) => {
    setSubCt(id);
    setPage(1);
    dispatch(itemsLoad(keyword, w, id, 1));
  };
  const handleSearch = () => {
    setPage(1);
    dispatch(itemsLoad(keyword, w, subcategory, 1));
  };
  const handlePage = (pg) => {
    setPage(pg);
    dispatch(itemsLoad(keyword, w, subcategory, pg));
  };
  return (
    <Fragment>
      {loading ? (
        <>
          <MetaData title="Loading..." />
          <h2
            className="textCenter cakesPleaseWait"
            style={{ marginTop: "30vh" }}
          >
            Please Wait:)
          </h2>
          <Loading show={loading} />
        </>
      ) : (
        <Fragment>
          {client && (
            <MetaData
              title={`Wedding Decorations near ${client.city} | www.partyondoor.com`}
            />
          )}
          <div>
            <div className="cakesCustBtn" onClick={() => flipCustBar()}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgb(247, 7, 147)",
                  "&:hover": {
                    backgroundColor: "rgb(247, 7, 147)",
                  },
                }}
                startIcon={<FilterListIcon />}
              >
                filter
              </Button>
            </div>
            <div className="cakesCustBar cakesHideCustBar" ref={custBar}>
              <div className="dFlexWrap justfyeven cakesSubCatsDiv">
                <Chip
                  color={subcategory === "" ? "success" : "primary"}
                  label="Any Type"
                  sx={{ marginTop: "5px" }}
                  onClick={() => {
                    handleSubcat("");
                  }}
                />
                {subcategories.map((sbct, idx) => (
                  <Chip
                    key={idx}
                    color={subcategory === sbct._id ? "success" : "primary"}
                    sx={{ marginTop: "5px" }}
                    label={`${sbct.name}`}
                    onClick={() => {
                      handleSubcat(sbct._id);
                    }}
                  />
                ))}
              </div>
              <div className="cakesSearchBDiv">
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    sx={{ width: "280px" }}
                    name="search"
                    InputLabelProps={{
                      style: { color: "#000" },
                    }}
                    value={keyword}
                    label="Enter keyword like: Chocolate"
                    onChange={(e) => setKeyword(e.target.value)}
                    variant="standard"
                  />
                </Box>
                <div className="dFlex justfycent mt-1">
                  <Button variant="contained" onClick={() => handleSearch()}>
                    Search
                  </Button>
                </div>
              </div>
            </div>
            <div className="cakesGridAbove-1"></div>
            {!items || items.length === 0 ? (
              <h2 className="textCenter itemsNoMatch">
                No Matching Items Found
              </h2>
            ) : (
              <Grid
                container
                direction="row"
                sx={{ display: "flex", justifyContent: "space-evenly" }}
                gap={2}
              >
                {items.map((itm, idx) => (
                  <ProductCard itm={itm} key={idx} />
                ))}
              </Grid>
            )}
            <div className="dFlex justfycent mt-5">
              <Pagination
                color="secondary"
                shape="rounded"
                showFirstButton
                showLastButton
                onChange={(e, v) => {
                  handlePage(v);
                }}
                page={page}
                count={totalPages}
              />
            </div>
          </div>
        </Fragment>
      )}
      <div style={{ height: "100px" }}></div>
    </Fragment>
  );
};
export async function getServerSideProps(context) {
  const { req } = context;
  const isProtected = ProtectedRoute(req.cookies.token, "client", "/c/login");
  if (isProtected.status) {
    return isProtected.newRoute;
  }
  const resp = await fetch(
    `${process.env.baseUrl}/api/v1/subcategory/specific?category=61a3803dcae560bc3937de20`
  );
  const data = await resp.json();
  if (!data.success) {
    return RedirectTo("/");
  }
  return {
    props: { w: "61a3803dcae560bc3937de20", subCats: data.subcategories }, // will be passed to the page component as props
  };
}
export default Index;
