import { Fragment, useState, useEffect } from "react";
import MetaData from "../utils/MetaData";
import HomeSlider from "../components/sliders/HomeSlider";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Index = () => {
  const router = useRouter();
  const { client } = useSelector((state) => state.client);
  const handleCatClick = (arg) => {
    if (!client) {
      let url = `/c/login?guide=/i/cakes`;
      if (arg === "parFood") url = "/c/login?guide=/i/partyFood";
      else if (arg === "birthD")
        url = "/c/login?guide=/i/birthday-decorators";
      else if (arg === "anniv")
        url = "/c/login?guide=/i/anniversary-decorators";
      else if (arg === "wedd")
        url = "/c/login?guide=/i/wedding-decorators";
      else if (arg === "partd")
        url = "/c/login?guide=/i/party-decorators";
      else if (arg === "offd")
        url = "/c/login?guide=/i/office-decorators";
      else if (arg === "devd")
        url = "/c/login?guide=/i/devotional-decorators";
      else if (arg === "cater")
        url = "/c/login?guide=/i/cateringService";
      router.push(url);
      Swal.fire({
        title: "Please",
        text: "Login OR Signup.",
        imageUrl:
          "https://res.cloudinary.com/partyondoor/image/upload/v1637965257/assets/Register_Now_kisdca.png",
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    } else {
      if (arg === "Cakes") router.push(`/i/cakes`);
      else if (arg === "WeddingDecors") router.push("/i/wedding-decorators");
    }
  };
  return (
    <Fragment>
      <MetaData title="Home | www.partyondoor.com" />
      <HomeSlider />
      <div className="indCatsDiv mt-1">
        <div onClick={() => handleCatClick("Cakes")}>
          <img src="/others/cakeImg.jpg" alt="" className="indCatImg" />
          <p>Cakes near me on exclusive price.</p>
        </div>
        <div onClick={() => handleCatClick("parFood")}>
          <img src="/others/partyF.png" alt="" className="indCatImg" />
          <p>Party Food near me</p>
        </div>
        <div onClick={() => handleCatClick("birthD")}>
          <img src="/others/birthdecpr.png" alt="" className="indCatImg" />
          <p>Birthday Decorators near me</p>
        </div>
        <div onClick={() => handleCatClick("anniv")}>
          <img src="/others/anivDecor.jpg" alt="" className="indCatImg" />
          <p>Anniversary Decorators near me</p>
        </div>
        <div onClick={() => handleCatClick("wedd")}>
          <img src="/others/wedDecor.jpg" alt="" className="indCatImg" />
          <p>Wedding Decorators near me</p>
        </div>
        <div onClick={() => handleCatClick("partd")}>
          <img src="/others/partyDecor.jpg" alt="" className="indCatImg" />
          <p>Party Decorators near me</p>
        </div>
        <div onClick={() => handleCatClick("offd")}>
          <img src="/others/officedec.jpg" alt="" className="indCatImg" />
          <p>Office Decorators near me</p>
        </div>
        <div onClick={() => handleCatClick("devd")}>
          <img src="/others/devdec.jpg" alt="" className="indCatImg" />
          <p>Devotional Decorators near me</p>
        </div>
        <div onClick={() => handleCatClick("cater")}>
          <img src="/others/caterImg.jpg" alt="" className="indCatImg" />
          <p>Catering Service near me</p>
        </div>
      </div>
      <div className="dFlex justfyeven indWhyUsDiv">
        <div className="indWhyUsDiv-2">
          <img src="/tmp/hygeine.png" alt="..." className="indWhyUsImg" />
          <p>Safe &amp; Hygienic Services</p>
        </div>
        <div className="indWhyUsDiv-2">
          <img src="/tmp/homedeliv.png" alt="..." className="indWhyUsImg" />
          <p>Services in 650+ cities</p>
        </div>
        <div className="indWhyUsDiv-2">
          <img
            src="/tmp/trustedbymillions.jpg"
            alt="..."
            className="indWhyUsImg"
          />
          <p>Trusted By 20 millions</p>
        </div>
        <div className="indWhyUsDiv-2">
          <img src="/tmp/pincodes.png" alt="..." className="indWhyUsImg" />
          <p>Support in 10000+ pincodes</p>
        </div>
      </div>
    </Fragment>
  );
};
export async function getServerSideProps(context) {
  const { req, res } = context;
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default Index;
