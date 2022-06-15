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
import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { login } from "../redux/actions";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

/**
 * For user login
 * @param {props} props
 */
const Login = (props) => {
  const user = useSelector((state) => state.user);
  const logError = useSelector((state) => state.user.loginError);
  const fetchError = useSelector((state) => state.user.fetchError);

  useEffect(() => {
    if (user.user) {
      props.history.push("/");
    }
  }, [user, props.history]);

  const [initialErrorState, setInitialErrorState] = React.useState({
    nameError: "",
    passwordError: "",
  });

  const backToInitial = () => {
    initialErrorState.nameError = "";
    setInitialErrorState({ ...initialErrorState, nameError: "" });
    initialErrorState.passwordError = "";
    setInitialErrorState({ ...initialErrorState, passwordError: "" });
  };

  const validate = () => {
    if (name === "") {
      setInitialErrorState({
        ...initialErrorState,
        nameError: "Please enter a username",
      });
      initialErrorState.nameError = "Please enter a username";
    }
    if (password === "") {
      setInitialErrorState({
        ...initialErrorState,
        passwordError: "Please enter a password",
      });
      initialErrorState.passwordError = "Please enter a password";
    }
    if (initialErrorState.nameError || initialErrorState.passwordError) {
      return false;
    }
    return true;
  };

  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginError, setLoginError] = React.useState("");

  useEffect(() => {
    if (user.error) {
      setLoginError(user.error);
    } else {
      setLoginError("");
    }
  }, [user]);

  const onLogin = (e) => {
    backToInitial();
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      props.dispatch(login(name, password));
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
    setLoginError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setLoginError("");
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    value={name}
                    onChange={onChangeName}
                    error={loginError !== ""}
                    required
                  />
                </InputGroup>
                <div style={{ fontSize: 12, color: "red" }}>
                  {initialErrorState.nameError}
                </div>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    error={loginError !== ""}
                    required
                  />
                </InputGroup>
                <div style={{ fontSize: 12, color: "red" }}>
                  {initialErrorState.passwordError}
                </div>
              </FormGroup>
              <div className="text-center">
                {logError && <p style={{ color: "red" }}>{logError}</p>}
                {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
                <Button
                  className="my-4"
                  color="primary"
                  type="submit"
                  onClick={onLogin}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-right" xs="12">
            <a className="text-light" onClick={(e) => e.preventDefault()}>
              <Link to="/register">
                <small>Create Account</small>
              </Link>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default connect()(withRouter(Login));
