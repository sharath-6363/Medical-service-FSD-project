import React from "react";
import "../ComponentsCSS/AboutClinic.css";

export default function AboutClinic() {
  return (
    <div className="aboutclinic">
      <h3 className="text-center text-primary fw-bolder">About My Clinic</h3>
      <p id="cli-p">
        We are a private family-style clinic offering professional healthcare
        across a broad range of specializations for all age categories – from
        newborns to grandparents. Our clinic is inspired by the tradition of the
        family physician in whom medical expertise meets personal relationship
        building and a high degree of empathy. We set aside plenty of time,
        understanding, and respect for each patient. Professionalism, trust, a
        friendly environment, and the satisfaction of our clients are of
        fundamental importance to us.
      </p>
      <h5 className="m-2 text-primary fw-bolder fs-small">
        At My Clinic you always come first
      </h5>
      <p id="cli-p">
        Our philosophy is holistic: we perceive each individual and their
        ailments in their entire complexity. We are bringing back an
        oft-neglected aspect of how medicine should be practiced in examination
        and consulting rooms: that of taking enough time for each patient, and
        of creating a friendly environment. We build a relationship with our
        clients that centers on reliability and trust. The basis for successful
        treatment is to establish the true cause of disease and to be mindful of
        the greater context. Our treatment proposals are always as little
        invasive as possible, taking into account the individual needs of each
        client.
      </p>

      <h5 className="m-2 text-primary fw-bolder fs-small">
        At My Clinic you receive the best imaginable care
      </h5>
      <p id="cli-p">
        {" "}
        A modern office, comfortable surroundings, and state-of-the-art
        equipment are par for the course at My Clinic. We take pride in our team
        of renowned practitioners and experienced nurses. Our medical doctors
        rank among the recognized experts in their respective fields. Working
        hand in hand, they establish the most efficient path towards improving
        the physical and mental health of our clients. At My Clinic we promote
        lifelong learning and personal development, in service of our goal to
        always remain at the top of the profession. If you have been looking for
        a family doctor who is always close to you on your journey toward
        lasting health and great quality of life, pay us a visit at My Clinic.
      </p>
    </div>
  );
}
