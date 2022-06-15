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
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Current</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Past</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
