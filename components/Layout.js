import Navbar from "./design/Navbar";
import Head from "next/head";
import MainDrawer from "./design/MainDrawer";
import UFab from "./fabs/UFab";
import Footer from "./design/Footer";
import Loading from "./design/Loading";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/userActions";
import AddCartQuantity from "./modals/AddCartQuantity";
import Notify from "./design/Notify";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [routeChanged, setRouteChanged] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setRouteChanged(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setRouteChanged(false);
  });
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="WuMneMZI0pz9d_eVCH1E9PcEouzOqefep_hAR1CUKFc"
        />
        <link
          async
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap"
        />
        <link rel="shortcut icon" href="/logosm2.png" type="image/x-icon" />
      </Head>
      <Navbar />
      <AddCartQuantity />
      <Notify />
      <Loading show={routeChanged} />
      <MainDrawer />
      {children}
      <Footer />
      <UFab />
    </>
  );
};

export default Layout;
