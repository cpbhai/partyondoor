import { Fragment } from "react";
import Head from "next/head";
const MetaData = ({ title }) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="theme-color" content="rgb(247, 7, 147)" />
        <meta
          name="description"
          content="All cake suppliers, event, party &amp; wedding decoration services, catering services, DJ and sound services, cars for vidai, Photographers &amp; videographers, Hotels for receptions &amp; events, event planners near me"
        />
        <meta name="lang" content="en" />
        <meta
          name="keywords"
          content="cakes, decorators, wedding decorators, caterers, catering, dj, sound, car for vidai, private car, taxi car, videographer, photographer, hotels, event planner near me"
        />
      </Head>
    </Fragment>
  );
};

export default MetaData;
