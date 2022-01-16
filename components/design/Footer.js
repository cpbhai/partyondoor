import { Fragment } from "react";
import Link from "next/link";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BusinessIcon from "@mui/icons-material/Business";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Grid from "@mui/material/Grid";

const Footer = () => {
  return (
    <Fragment>
      <div className="footerMainDiv dFlexWrap justfyeven">
        <div>
          <Link href="/cancellation_refund_policy">
            <a>
              <Grid container alignItems="center" gap={0.3}>
                <AccountBalanceIcon />
                Cancellation &amp; Refund Policy
              </Grid>
            </a>
          </Link>
          <br></br>
          <Link href="/privacy_policy">
            <a>
              <Grid container alignItems="center" gap={0.3}>
                <PrivacyTipIcon />
                Privacy Policy
              </Grid>
            </a>
          </Link>
          <br></br>
          <Link href="/terms_conditions">
            <a>
              <Grid container alignItems="center" gap={0.3}>
                <ReceiptIcon />
                Terms &amp; Conditions
              </Grid>
            </a>
          </Link>
          <br></br>
          <Link href="/about_us">
            <a>
              <Grid container alignItems="center" gap={0.3}>
                <BusinessIcon />
                About Us
              </Grid>
            </a>
          </Link>
        </div>
        <div>
          <Grid container alignItems="center" gap={0.3}>
            <AddBusinessIcon />
            New Delhi, India
          </Grid>
          <br></br>
          <Link href="tel:+918077015752">
            <a>
              <Grid container alignItems="center" gap={0.3}>
                <PhoneIcon />
                +91-8077015752
              </Grid>
            </a>
          </Link>
          <br></br>
          <Link href="tel:+916398188216">
            <a>
              <Grid container alignItems="center" gap={0.3}>
                <PhoneIcon />
                +91-6398188216
              </Grid>
            </a>
          </Link>
          <br></br>
          <Link href="mailto:partyondoor@gmail.com">
            <a>
              <Grid container alignItems="center" gap={0.3}>
                <EmailIcon />
                partyondoor@gmail.com
              </Grid>
            </a>
          </Link>
        </div>
      </div>
      <div className="textCenter">
        <p>www.partyondoor.com</p>
        <p>&copy; 2021 PartyOnDoor</p>
      </div>
    </Fragment>
  );
};

export default Footer;
