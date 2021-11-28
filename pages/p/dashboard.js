import { Fragment, useEffect } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CelebrationIcon from '@mui/icons-material/Celebration';
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ProtectedRoute } from "../../utils/RouteHandling";
import { RedirectTo } from "../../utils/RouteHandling";
import MetaData from "../../utils/MetaData";
import Add from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
const Dashboard = ({ analytics }) => {
  const { partner } = useSelector((state) => state.partner);
  return (
    <Fragment>
      {!partner ? (
        <h1 className="textCenter" style={{ margin: "30vh 0" }}>
          Loading...
        </h1>
      ) : (
        <>
          <MetaData title={`${partner.name} | www.partyondoor.com`} />
          <div>
            <h3 className="textCenter">Welcome {partner.name}</h3>
          </div>
          <div className="pDashMainDiv">
            <div className="pDashAnalytics">
              <div className="D-1 pDashStat-1">
                <h1>{analytics.itemsPosted.length}</h1>
                <p>Items Posted</p>
              </div>
              <div className="D-2 pDashStat-2">
                <h1>0</h1>
                <p>Orders Placed</p>
              </div>
              <div className="D-3 pDashStat-3">
                <h1>0</h1>
                <p>Orders Cancelled</p>
              </div>
              <div className="D-4 pDashStat-4">
                <h1>₹ 0</h1>
                <p>Payment Received</p>
              </div>
            </div>
            <div className="pDashnavigate">
              
              <Link href={`/p/itemsByMe`}>
                <a>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FormatListBulletedIcon />}
                  >
                    Items by me
                  </Button>
                </a>
              </Link>
              <Link href={`/p/add/foodItems`}>
                <a>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Add />}
                  >
                    Add Food Items
                  </Button>
                </a>
              </Link>
              <Link href={`/p/add/decoration`}>
                <a>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CelebrationIcon />}
                  >
                    Add Decoration Sample
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export async function getServerSideProps(context) {
  const { req, res } = context;
  const isProtected = ProtectedRoute(req.cookies.token, "partner", "/p/login");
  if (isProtected.status) {
    return isProtected.newRoute;
  }
  const resp = await fetch(`${process.env.baseUrl}/api/v1/partner/analytics`, {
    headers: { Authorization: req.cookies.token },
  });
  const data = await resp.json();
  if (!data.success) return RedirectTo("/");
  return {
    props: { analytics: data.analytics }, // will be passed to the page component as props
  };
}

export default Dashboard;
