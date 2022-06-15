/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import routes from "routes.js";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return <Route path={prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <AuthNavbar />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">DEAL</h1>
                  <p className="text-lead text-light">
                    If you can't do great things, small ones count even more.
                  </p>
                  {/* <p className="text-lead text-light">
                    Everyone needs a little bit of help sometimes, but finding
                    someone who can help is not always that easy. On the other
                    hand, people struggle to offer help. DEAL helps to solve
                    this problem by connecting both sides. We enable you to
                    create and browse posts in order to support you in finding
                    and offering help. Come to an agreement by sending and
                    accepting requests and pay the one helping you directly
                    online.
                  </p> */}
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/login" />
            </Switch>
          </Row>
        </Container>
        <Container>
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <p className="text-lead text-light">
                  Everyone needs a little bit of help sometimes, but finding
                  someone who can help is not always that easy. On the other
                  hand, people struggle to offer help. DEAL helps to solve this
                  problem by connecting both sides. We enable you to create and
                  browse posts in order to support you in finding and offering
                  help. Come to an agreement by sending and accepting requests
                  and pay the one helping you directly online.
                </p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Auth;
