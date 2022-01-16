import Fab from "@mui/material/Fab";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import { Fragment } from "react";
import Link from "next/link";

const UFab = () => {
  const callStyle = {
    margin: 0,
    top: "auto",
    right: "auto",
    bottom: 10,
    left: 10,
    position: "fixed",
  };
  const whatsappStyle = {
    backgroundColor: "green",
    color: "#fff",
    margin: 0,
    top: "auto",
    right: 10,
    bottom: 10,
    left: "auto",
    position: "fixed",
  };
  return (
    <Fragment>
      <Link href="tel:+918077015752">
        <a target="_blank">
          <Fab color="primary" style={callStyle}>
            <CallIcon />
          </Fab>
        </a>
      </Link>
      <Link href="http://wa.me/+918077015752?text=Hey%20Partyondoor,%20I%20want%20to%20ask:%0A">
        <a target="_blank">
          <Fab style={whatsappStyle}>
            <WhatsAppIcon />
          </Fab>
        </a>
      </Link>
    </Fragment>
  );
};

export default UFab;
