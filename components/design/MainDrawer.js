import { Fragment, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MAIN_DRAWER } from "../../redux/constants/designConstants";
import Link from "next/link";

const MainDrawer = () => {
  const dispatch = useDispatch();
  const { mainDrawer } = useSelector((state) => state.design);
  const { partner } = useSelector((state) => state.partner);
  const { client } = useSelector((state) => state.client);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const open = useRef(null);
  useEffect(() => {
    if (mainDrawer) {
      let v = open.current.classList;
      if (v.value.includes("mdanimateclose")) v.remove("mdanimateclose");
      v.add("mdanimateopen");
    }
    if (!mainDrawer) {
      let v = open.current.classList;
      if (v.value.includes("mdanimateopen")) v.remove("mdanimateopen");
      v.add("mdanimateclose");
    }
  }, [mainDrawer, open]);
  return (
    <Fragment>
      <div
        className="mainDrawer"
        ref={open}
        onClick={() => dispatch({ type: HIDE_MAIN_DRAWER })}
      >
        {partner && (
          <Link href="/p/dashboard">
            <a>
              <div className="mdNormal">
                Welcome
                <div style={{ marginBottom: "10px" }}>{partner.name}</div>
              </div>
            </a>
          </Link>
        )}
        {client && (
          <Link href="/c/dashboard">
            <a>
              <div className="mdNormal">
                Welcome
                <div style={{ marginBottom: "10px" }}>{client.name}</div>
              </div>
            </a>
          </Link>
        )}
        <Link href="/">
          <a>
            <div className="mdNormal">
              <Grid container alignItems="center" className="mdItem" gap={0.3}>
                <HomeIcon />
                Home
              </Grid>
            </div>
          </a>
        </Link>
        <Link href="/p/signup">
          <a>
            <div className="mdNormal">
              <Grid container alignItems="center" className="mdItem" gap={0.3}>
                <GroupWorkIcon />
                Register as Partner
              </Grid>
            </div>
          </a>
        </Link>
      </div>
    </Fragment>
  );
};

export default MainDrawer;
