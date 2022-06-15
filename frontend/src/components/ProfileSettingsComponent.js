import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import UserService from "../services/UserService";
import validator from "validator";
import Rating from "@material-ui/lab/Rating";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import Header from "./Headers/Header";
import CustomizedAlert from "./CustomizedAlert";
import { Image } from "cloudinary-react";

const url = "https://api.cloudinary.com/v1_1/dzk3apfy0/image/upload";

function ProfileSettingsComponent(props) {
  const user = useSelector((state) => state.user.user);
  const updateError = useSelector((state) => state.user.updateError);

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const [visible2, setVisible2] = useState(false);
  const onDismiss2 = () => {
    setVisible2(false);
    setCloudinaryError(false);
  };

  const [cloudinaryError, setCloudinaryError] = React.useState();

  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postcode, setPostcode] = React.useState(0);
  const [tel, setTel] = React.useState(0);
  const [image, setImage] = React.useState();
  const [ratings, setRatings] = React.useState();

  const onRating = async () => {
    let avgRating = await UserService.getUserRating(user._id);
    setRatings(avgRating.avgRating);
  };

  const [initialErrorState, setInitialErrorState] = React.useState({
    nameError: "",
    emailError: "",
    addressError: "",
    cityError: "",
    postCodeError: "",
    telError: "",
    imageError: "",
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
    if (postcode <= 0 || postcode > 99999999999) {
      setInitialErrorState({
        ...initialErrorState,
        postCodeError: "Invalid post code",
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
    if (image === "") {
      setInitialErrorState({
        ...initialErrorState,
        cityError: "Your post should have an image!",
      });
      initialErrorState.cityError = "Your post should have an image!";
    }
    if (
      initialErrorState.emailError ||
      initialErrorState.addressError ||
      initialErrorState.cityError ||
      initialErrorState.postCodeError ||
      initialErrorState.telError ||
      initialErrorState.nameError ||
      initialErrorState.imageError
    ) {
      return false;
    }
    return true;
  };

  const extractUser = () => {
    setId(user.id);
    setName(user.name);
    setEmail(user.email);
    setAddress(user.address);
    setCity(user.city);
    setPostcode(user.postcode);
    setTel(user.tel);
    setImage(user.imageUrl);
    setRatings(user.ratings);
    onRating();
  };

  const onCancel = () => {
    extractUser();
  };

  useEffect(() => {
    extractUser();
  }, [user, initialErrorState]);

  const [imageSelected, setImageSelected] = useState("");
  const uploadImage = () => {
    const formdata = new FormData();
    formdata.append("file", imageSelected);
    formdata.append("upload_preset", "q8fl1ob1");
    Axios.post(
      "https://api.cloudinary.com/v1_1/dzk3apfy0/image/upload",
      formdata
    )
      .then((response) => {
        var publicID = String(response.data.public_id).trimLeft("/");
        var url =
          "https://res.cloudinary.com/dzk3apfy0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1626770636/" +
          publicID +
          ".png";
        return url;
      })
      .then((response) => {
        const updatedUser = {
          _id: user._id,
          imageUrl: response,
        };
        props.onSave(updatedUser);
        setImage(url);
      })
      .catch((error) => {
        setCloudinaryError(true);
      })
      .then((response) => {
        setVisible2(true);
      });
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const onChangePostcode = (e) => {
    setPostcode(e.target.value);
  };

  const onChangeTel = (e) => {
    setTel(e.target.value);
  };

  const packUser = () => {
    let back = {
      ...user,
    };
    back.name = name;
    back.email = email;
    back.address = address;
    back.city = city;
    back.postcode = postcode;
    back.tel = tel;
    back.imageUrl = image;

    return back;
  };

  const onSave = () => {
    backToInitial();
    const isValid = validate();

    if (isValid) {
      const newUser = packUser();
      props.onSave(newUser);
      setVisible(true);
    }
  };

  return image ? (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a onClick={(e) => e.preventDefault()}>
                      {image === "nopic" ? (
                        <Image
                          type="fetch"
                          className="rounded-circle"
                          cloudName="dzk3apfy0"
                          publicId={
                            "https://res.cloudinary.com/dzk3apfy0/image/fetch/v1626854713/https://res.cloudinary.com/dzk3apfy0/image/upload/w_1000%2Cc_fill%2Car_1:1%2Cg_auto%2Cr_max%2Cbo_5px_solid_red%2Cb_rgb:262c35/v1626770636/hvgipo0ycfm96d2iukp6.png"
                          }
                        />
                      ) : (
                        <Image
                          type="fetch"
                          className="rounded-circle"
                          cloudName="dzk3apfy0"
                          publicId={image}
                        />
                      )}
                    </a>
                  </div>
                </Col>
              </Row>

              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      {ratings == 0 ? (
                        "You have not been rated."
                      ) : (
                        <Rating
                          name="half-rating-read"
                          value={ratings}
                          precision={0.5}
                          readOnly
                        />
                      )}
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5"></div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>{name}</h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {postcode},{" "}
                    <span className="font-weight-light">{city}</span>
                  </div>

                  <hr className="my-4" />
                  <div>
                    <i className="ni education_hat mr-2" />
                    Contact Information
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Email: <span className="font-weight-light">{email}</span>
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Tel: <span className="font-weight-light">{tel}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Update Account Information</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="danger"
                      outline
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                    <Button color="success" onClick={onSave}>
                      Update
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CustomizedAlert
                visible={visible}
                onDismiss={onDismiss}
                errors={updateError}
                message={
                  !updateError
                    ? "Your Account information has been updated"
                    : "Sorry something went wrong. Please try to update again"
                }
                formComponentActive={false}
              />

              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            type="text"
                            value={name}
                            onChange={onChangeName}
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {initialErrorState.nameError}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            type="email"
                            value={email}
                            onChange={onChangeEmail}
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {initialErrorState.emailError}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            type="number"
                            value={tel}
                            onChange={onChangeTel}
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {initialErrorState.telError}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
                            value={address}
                            onChange={onChangeAddress}
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {initialErrorState.addressError}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            type="text"
                            value={city}
                            onChange={onChangeCity}
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {initialErrorState.cityError}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            type="number"
                            value={postcode}
                            onChange={onChangePostcode}
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {initialErrorState.postCodeError}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Update Profile Picture</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="success"
                      onClick={uploadImage}
                      disabled={!imageSelected}
                    >
                      Upload
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CustomizedAlert
                visible={visible2}
                onDismiss={onDismiss2}
                errors={cloudinaryError}
                message={
                  cloudinaryError
                    ? "Sorry something went wrong. Please try to upload again"
                    : "Your Picture has been updated"
                }
                formComponentActive={false}
              />
              <CardBody>
                <h6 className="heading-small text-muted mb-4">
                  Change profile picture
                </h6>
                <div className="pl-lg-4">
                  <FormGroup>
                    <Input
                      accept="image/*"
                      type="file"
                      name="image"
                      onChange={(e) => setImageSelected(e.target.files[0])}
                    />
                  </FormGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default connect()(withRouter(ProfileSettingsComponent));
