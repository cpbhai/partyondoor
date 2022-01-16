import { Fragment } from "react";
import MetaData from "../utils/MetaData";

const AboutUs = () => {
  return (
    <Fragment>
      <MetaData title="About Us | www.partyondoor.com" />
      <div className="textCenter">
        <p className="aboutparaWhyF">
          We started PartyOnDoor with a vision to give more options to the
          people looking for party stuff, and settle by choosing less optimal
          options, many times, because of less options or less professionals.
          Either they find the local less optimal suppliers or vendors nearby
          them or through previous connections. What we do for them, is that, we
          provide the entire list of such suppliers or vendors with all details.
          So that the people could get their details nearby. And could appoint
          the professionals as per best of their choice.
          <br></br>Another problem is that the some suppliers or vendors get
          only limited clients which come to them either offline or through
          previous connections. So, most of the time, their land up making loss
          to their work and business by remaining idle, because of no
          appointments or limited appointments. We provide suppliers or vendors
          more opportunities to get and attract the client with their services.
          So that their business could grow better.
        </p>

        <h5 className="aboutwhyFounded">
          So, with this vision and mission to helping the people and the
          businesses.<br></br>We founded PartyOnDoor, a platform where user can
          easily get the list of all suppliers near them.
        </h5>
        <h3 className="mt-5 fontwb">Founder:</h3>
        <h5 className="mt-1">Mr. Arpit Jadon</h5>
        <div className="aboutHM2"></div>
      </div>
    </Fragment>
  );
};

export default AboutUs;
