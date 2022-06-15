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
import { register } from "../redux/actions/userActions";

import validator from "validator";
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
 * For register new users
 * @param {props} props
 */
const Register = (props) => {
  const user = useSelector((state) => state.user);
  const fetchError = useSelector((state) => state.user.fetchError);

  useEffect(() => {
    if (user.user) {
      props.history.push("/");
    }
  }, [user, props.history]);

  useEffect(() => {
    if (user.error) {
      setRegisterError(user.error);
    } else {
      setRegisterError("");
    }
  }, [user]);

  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const [tel, setTel] = React.useState("");

  const [registerError, setRegisterError] = React.useState("");

  const [initialErrorState, setInitialErrorState] = React.useState({
    nameError: "",
    emailError: "",
    addressError: "",
    cityError: "",
    postCodeError: "",
    telError: "",
    imageError: "",
    passwordErr: "",
    passwordCheckingError: "",
  });

  const backToInitial = () => {
    initialErrorState.nameError = "";
    setInitialErrorState({ ...initialErrorState, nameError: "" });
    initialErrorState.emailError = "";
    setInitialErrorState({ ...initialErrorState, emailError: "" });
    initialErrorState.addressError = "";
    setInitialErrorState({ ...initialErrorState, addressError: "" });
    initialErrorState.cityError = "";
    setInitialErrorState({ ...initialErrorState, cityError: "" });
    initialErrorState.postCodeError = "";
    setInitialErrorState({ ...initialErrorState, postCodeError: "" });
    initialErrorState.telError = "";
    setInitialErrorState({ ...initialErrorState, telError: "" });
    initialErrorState.imageError = "";
    setInitialErrorState({ ...initialErrorState, imageError: "" });
    initialErrorState.passwordErr = "";
    setInitialErrorState({ ...initialErrorState, passwordErr: "" });
    initialErrorState.passwordCheckingError = "";
    setInitialErrorState({ ...initialErrorState, passwordCheckingError: "" });
  };

  const validate = () => {
    if (name === "") {
      setInitialErrorState({
        ...initialErrorState,
        nameError: "Your profile should have a username",
      });
      initialErrorState.nameError = "Your profile should have a username";
    }
    if (!validator.isEmail(email)) {
      setInitialErrorState({
        ...initialErrorState,
        emailError: "Please enter a valid email!",
      });
      initialErrorState.emailError = "Please enter a valid email!";
    }
    if (address === "") {
      setInitialErrorState({
        ...initialErrorState,
        addressError: "Your profile should have an address",
      });
      initialErrorState.addressError = "Your profile should have an address";
    }
    if (city === "") {
      setInitialErrorState({
        ...initialErrorState,
        cityError: "City is required",
      });
      initialErrorState.cityError = "City is required";
    }
    if (password === "" || password2 === "") {
      setInitialErrorState({
        ...initialErrorState,
        passwordErr: "Password is required",
      });
      initialErrorState.passwordErr = "Password is required";
    }
    if (postcode <= 0 || postcode > 99999999999) {
      setInitialErrorState({
        ...initialErrorState,
        postCodeError: "Invfalid post code",
      });
      initialErrorState.postCodeError = "Invalid post code";
    }
    if (tel <= 0) {
      setInitialErrorState({
        ...initialErrorState,
        telError: "Invalid phone number!",
      });
      initialErrorState.telError = "Invalid phone number!";
    }
    if (password !== "" && password2 !== "") {
      if (password !== password2) {
        setInitialErrorState({
          ...initialErrorState,
          passwordCheckingError: "Passwords do not match",
        });
        initialErrorState.passwordCheckingError = "Passwords do not match";
      }
    }
    if (
      initialErrorState.emailError ||
      initialErrorState.addressError ||
      initialErrorState.cityError ||
      initialErrorState.postCodeError ||
      initialErrorState.telError ||
      initialErrorState.nameError ||
      initialErrorState.imageError ||
      initialErrorState.passwordErr ||
      initialErrorState.passwordCheckingError
    ) {
      return false;
    }
    return true;
  };

  const onRegister = (e) => {
    backToInitial();
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      props.dispatch(
        register(name, password, email, address, city, postcode, tel)
      );
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
    setRegisterError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setRegisterError("");
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
    setRegisterError("");
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setRegisterError("");
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
    setRegisterError("");
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
    setRegisterError("");
  };

  const onChangePostcode = (e) => {
    setPostcode(e.target.value);
    setRegisterError("");
  };

  const onChangeTel = (e) => {
    setTel(e.target.value);
    setRegisterError("");
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Fill in your credentials credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
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
                    error={registerError !== ""}
                    required
                  />
                </InputGroup>
                <div style={{ fontSize: 12, color: "red" }}>
                  {initialErrorState.nameError}
                </div>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    error={registerError !== ""}
                  />
                </InputGroup>
                <div style={{ fontSize: 12, color: "red" }}>
                  {initialErrorState.emailError}
                </div>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <InputGroup className="input-group-alternative mb-1">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-building" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Address"
                        type="text"
                        value={address}
                        onChange={onChangeAddress}
                        error={registerError !== ""}
                      />
                    </InputGroup>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {initialErrorState.addressError}
                    </div>
                  </Col>
                  <Col>
                    <InputGroup className="input-group-alternative mb-1">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-building" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="City"
                        type="text"
                        value={city}
                        onChange={onChangeCity}
                        error={registerError !== ""}
                      />
                    </InputGroup>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {initialErrorState.cityError}
                    </div>
                  </Col>
                  <Col>
                    <InputGroup className="input-group-alternative mb-1">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-building" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Postcode"
                        type="number"
                        value={postcode}
                        onChange={onChangePostcode}
                        error={registerError !== ""}
                      />
                    </InputGroup>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {initialErrorState.postCodeError}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-chat-round" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Phone number"
                    type="tel"
                    value={tel}
                    onChange={onChangeTel}
                    error={registerError !== ""}
                    required
                  />
                </InputGroup>
                <div style={{ fontSize: 12, color: "red" }}>
                  {initialErrorState.telError}
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
                    error={registerError !== ""}
                    // onBlur={onBlurPassword}
                    required
                  />
                </InputGroup>
                <div style={{ fontSize: 12, color: "red" }}>
                  {initialErrorState.passwordErr}
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
                    placeholder="Repeat Password"
                    type="password"
                    value={password2}
                    onChange={onChangePassword2}
                    error={registerError !== ""}
                    required
                  />
                </InputGroup>
                <div style={{ fontSize: 12, color: "red" }}>
                  {initialErrorState.passwordErr}
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
                  {initialErrorState.passwordCheckingError}
                </div>
              </FormGroup>
              <div className="text-muted font-italic">
                {!!password ? (
                  <small>
                    password strength:{" "}
                    {password.length >= 6 ? (
                      <span className="text-success font-weight-700">
                        strong
                      </span>
                    ) : (
                      <span className="text-danger font-weight-700">weak</span>
                    )}
                  </small>
                ) : undefined}
              </div>
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="submit"
                  onClick={onRegister}
                >
                  Create account
                </Button>
                {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-right" xs="12">
            <a className="text-light" onClick={(e) => e.preventDefault()}>
              <Link to="/login">
                <small>Sign In</small>
              </Link>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default connect()(withRouter(Register));
