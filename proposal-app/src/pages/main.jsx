import "../assets/css/main.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function Main() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div
      className="pannel panel-default"
      style={{
        width: "100%",
        padding: "50px 50px 50px 30px",
        align: "center",
      }}
    >
      <section className="py-7">
        <div className="container">
          <div className="col-md-4">
            <Link
              onClick={() =>
                loginWithRedirect({
                  appState: {
                    returnTo: "/submission",
                  },
                })
              }
            >
              <div className="main-box mb-blue simple-table">
                <i className="fa fa-users fa-5x"></i>
                <h5>Chapter / APS President Login</h5>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <a href="/admin/login.php">
              <div className="main-box mb-dull simple-table">
                <i className="fa fa-user fa-5x"></i>
                <h5>EC / Admin Login</h5>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div>
          <h1>Proposal Guidelines</h1>
          <ul className="fa-ul mb-0">
            <li>
              <i className="fa-li fa fa-check"></i>
              Projects supporting the development of science and technology
            </li>
            <li>
              <i className="fa-li fa fa-check"></i>
              Projects contributing significantly to the development of science
              and technology
            </li>
            <li>
              <i className="fa-li fa fa-check"></i>
              Scholarly activities and public relations
            </li>
            <li>
              <i className="fa-li fa fa-check"></i>
              Cultural and fellowship activities for KSEA members
            </li>
            <li>
              <i className="fa-li fa fa-check"></i>
              Projects supporting student member activities
            </li>
          </ul>
        </div>
      </section>
      <section className="py-1">
        <div className="container">
          <h1>Eligible Projects</h1>
          <p>
            Any KSEA Chapter or a Korean-American Professional Society which
            wishes to apply for financial support should submit a proposal using
            this proposal submission system. No proposals will be accepted
            unless it conforms to these guidelines. All proposals should be
            submitted at least two months in advance of the prospective event
            date.
          </p>
          <p>
            The proposal will be evaluated and the size of funding will be
            determined by considering the following;
          </p>
          <p>1.Technical excellences of the program</p>

          <p>2.KSEA membership status</p>
          <ul className="fa-ul mb-0">
            <li>
              <i className="fa-li fa"></i>a. The number of paid members in the
              previous (46th admin) term*
            </li>
            <li>
              <i className="fa-li fa"></i>b. The number of paid members in the
              current (47th admin) term*
            </li>
            <li>
              <i className="fa-li fa"></i>c. The number of paid members that
              will be derived by the event
            </li>
            <li>
              <i className="fa-li fa"></i>d. Previous KSEA support (if there was
              any) in the current term to the requesting organization
            </li>
            <li>
              <i className="fa-li fa"></i>e. Projects supporting student member
              activities
            </li>
          </ul>

          <p>
            To encourage the membership drive efforts, additional bonus funding
            will be provided when 2.c or more new or renewal KSEA members are
            observed upon the conclusion of the event.
          </p>
          <p>
            * 2.a and 2.b can be verified by CPs and APS presidents at their
            KSEA member page.
          </p>
          <p>
            ** Regional conferences require to show that at least 30% of
            participants are from outside of the hosting chapter.
          </p>
          <p>
            Once the funding is approved,75% of the approved amount will be
            supported in advance and the remaining 25% will be provided after
            submission of the report (along with itemized receipts) within 2
            weeks after the event. An article of the event (if supported equal
            to or more than $1,000) is requested.
          </p>
          <p>
            The article (summary and photo) regarding the event which is
            supported equal to or more than $1,000 should be published in the
            KSEA Newsletter. However, the article submission would be optional
            for the smaller event which is supported less than $1,000.
          </p>
          <p>
            For further details, please contact - ED (ksea47ednam@gmail.com)
          </p>
        </div>
      </section>

      <section className="py-1">
        <div className="container">
          <p>Membership Drive Events Proposal Form</p>

          <p>
            <a
              href="./doc/KSEA_Proposal_Chapter_APS_Activities.doc"
              className="text_link"
            >
              Download KSEA Proposal for Chapter and APS Activities (doc format)
            </a>
          </p>
          <p>
            <a
              href="./doc/KSEA_Proposal_for_Regional_Conference_and_APS_Meeting_2010.doc"
              className="text_link"
            >
              Download KSEA Proposal for Regional Conference (doc format)
            </a>
          </p>
          <p>
            Once logged-in, every proposal is reviewed by the Executive
            Committee of KSEA.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Main;
