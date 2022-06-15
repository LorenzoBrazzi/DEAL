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
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CustomizedAlert from "./CustomizedAlert";
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
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Header from "./Headers/Header";

const FormComponent = (props) => {
  const onCancel = () => {
    if (props.new) {
      props.history.push("/");
    } else {
      props.history.goBack();
    }
  };

  const [value, setValue] = React.useState("ask");
  const handleOfferAskChange = (val) => {
    setValue(val);
  };
  const [title, setTitle] = React.useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const [address, setAddress] = React.useState("");
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const [postCode, setPostCode] = React.useState("");
  const handlePostCodeChange = (event) => {
    setPostCode(event.target.value);
  };
  const [town, setTown] = React.useState("");
  const handleTownChange = (event) => {
    setTown(event.target.value);
  };
  const [price, setPrice] = React.useState("");
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const [description, setDescription] = React.useState("");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const [category, setCategory] = React.useState("Grocery Shopping");
  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };
  const [date, setDate] = React.useState(+new Date());
  const handleDateChange = (date) => {
    setDate(date);
  };

  const [initialErrorState, setInitialErrorState] = React.useState({
    titleError: "",
    descriptionError: "",
    priceError: "",
    addressError: "",
    postCodeError: "",
    townError: "",
  });

  const backToInitial = () => {
    initialErrorState.titleError = "";
    setInitialErrorState({ ...initialErrorState, titleError: "" });
    initialErrorState.descriptionError = "";
    setInitialErrorState({ ...initialErrorState, descriptionError: "" });
    initialErrorState.priceError = "";
    setInitialErrorState({ ...initialErrorState, priceError: "" });
    initialErrorState.addressError = "";
    setInitialErrorState({ ...initialErrorState, addressError: "" });
    initialErrorState.postCodeError = "";
    setInitialErrorState({ ...initialErrorState, postCodeError: "" });
    initialErrorState.townError = "";
    setInitialErrorState({ ...initialErrorState, townError: "" });
  };
  const validate = () => {
    if (title === "") {
      setInitialErrorState({
        ...initialErrorState,
        titleError: "Your post should have a title",
      });
      initialErrorState.titleError = "Your post should have a title";
    }
    if (description === "") {
      setInitialErrorState({
        ...initialErrorState,
        descriptionError: "Your post should have a short description!",
      });
      initialErrorState.descriptionError =
        "Your post should have a short description!";
    }
    if (price <= 5) {
      setInitialErrorState({
        ...initialErrorState,
        priceError: "The price should be at least 5€!",
      });
      initialErrorState.priceError = "The price should be at least 5€!";
    }
    if (address === "") {
      setInitialErrorState({
        ...initialErrorState,
        addressError: "Your post should have an address!",
      });
      initialErrorState.addressError = "Your post should have an address!";
    }
    if (postCode <= 0 || postCode === "" || postCode > 99999999999) {
      setInitialErrorState({
        ...initialErrorState,
        postCodeError: "Invalid post code",
      });
      initialErrorState.postCodeError = "Invalid post code";
    }
    if (town === "") {
      setInitialErrorState({
        ...initialErrorState,
        townError: "Your post should have a town!",
      });
      initialErrorState.townError = "Your post should have a town!";
    }

    if (
      initialErrorState.titleError ||
      initialErrorState.descriptionError ||
      initialErrorState.priceError ||
      initialErrorState.addressError ||
      initialErrorState.postCodeError ||
      initialErrorState.townError
    ) {
      return false;
    }
    return true;
  };

  // triggers when a new post is given to this component or the new parameter is changed
  // for extracting the attributes of the given post to the approriate state variables
  useEffect(() => {
    if (!!props.post) {
      setValue(props.post.offerOrRequest);
      setTitle(props.post.title);
      setDescription(props.post.description);
      setCategory(props.post.category);
      setPrice(props.post.price);
      setAddress(props.post.address);
      setPostCode(props.post.postCode);
      setTown(props.post.town);
      setDate(props.post.date);
    }
  }, [props.post, props.new, initialErrorState]);

  function handleClick(event) {
    backToInitial();
    if (props.new) {
      event.preventDefault();
      const newPost = {
        offerOrRequest: value,
        title: title,
        creatorID: props.user.user._id,
        description: description,
        category: category,
        price: price,
        address: address,
        postCode: postCode,
        town: town,
        status: "open",
        date: date,
        matchedUserID: null,
        requestingUsers: [],
        matchedUserComment: null,
        creatorComment: null,
      };
      const isValid = validate();

      if (isValid) {
        props.onCreate(newPost);
      }
    } else {
      const newPost = {
        _id: props.post._id,
        offerOrRequest: value,
        title: title,
        description: description,
        category: category,
        price: price,
        address: address,
        postCode: postCode,
        town: town,
        date: date,
      };
      const isValid = validate();

      if (isValid) {
        props.onSave(newPost);
      }
    }
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Fill in Post Information</h3>
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
                    <Button color="success" onClick={handleClick}>
                      {props.new ? "Create" : "Save"}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CustomizedAlert
                message={props.message}
                errors={props.hasError}
                visible={props.visible}
                onDismiss={props.onDismiss}
                formComponentActive={true}
              />
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Choose Post Type
                      </label>
                      <div className="custom-control custom-radio mb-3">
                        <input
                          className="custom-control-input"
                          id="customRadio5"
                          name="custom-radio-2"
                          type="radio"
                          value={value}
                          defaultChecked
                          onChange={() => handleOfferAskChange("ask")}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customRadio5"
                        >
                          I ask
                        </label>
                      </div>
                      <div className="custom-control custom-radio mb-3">
                        <input
                          className="custom-control-input"
                          id="customRadio6"
                          name="custom-radio-2"
                          type="radio"
                          value={value}
                          onChange={() => handleOfferAskChange("offer")}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customRadio6"
                        >
                          I offer
                        </label>
                      </div>
                    </>
                    <br />
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Post Title
                          </label>
                          <Input
                            value={title}
                            onChange={handleTitleChange}
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Title"
                            type="text"
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {initialErrorState.titleError}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
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
                            value={address}
                            onChange={handleAddressChange}
                            className="form-control-alternative"
                            id="input-address"
                            placeholder="Address"
                            type="text"
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
                            value={town}
                            onChange={handleTownChange}
                            className="form-control-alternative"
                            id="input-city"
                            placeholder="City"
                            type="text"
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {initialErrorState.townError}
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
                            value={postCode}
                            onChange={handlePostCodeChange}
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {initialErrorState.postCodeError}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Date and Time
                          </label>
                          <Grid container spacing={2}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <Grid item xs={3}>
                                <KeyboardDatePicker
                                  variant="inline"
                                  format="MM/dd/yyyy"
                                  margin="normal"
                                  id="date-picker-dialog"
                                  value={date}
                                  onChange={handleDateChange}
                                  KeyboardButtonProps={{
                                    "aria-label": "change date",
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <KeyboardTimePicker
                                  variant="inline"
                                  margin="normal"
                                  id="time-picker"
                                  value={date}
                                  onChange={handleDateChange}
                                  KeyboardButtonProps={{
                                    "aria-label": "change time",
                                  }}
                                />
                              </Grid>
                            </MuiPickersUtilsProvider>
                          </Grid>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Category
                          </label>
                          <br />
                          <br />
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <Button
                                color="secondary"
                                style={{ width: "1000%" }}
                                type="button"
                              >
                                {category} <i className="ni ni-bold-down" />
                              </Button>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCategoryChange("Grocery Shopping");
                                  setCategory("Grocery Shopping");
                                }}
                              >
                                Groceries
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCategoryChange("Child Care");
                                  setCategory("Child Care");
                                }}
                              >
                                Child Care
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCategoryChange("Elderly Care");
                                  setCategory("Elderly Care");
                                }}
                              >
                                Elderly Care
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCategoryChange("House And Garden");
                                  setCategory("House And Garden");
                                }}
                              >
                                House & Garden
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCategoryChange("Pets And Animals");
                                  setCategory("Pets And Animals");
                                }}
                              >
                                Pets & Animals
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Price
                      </label>
                      <Input
                        value={price}
                        onChange={handlePriceChange}
                        className="form-control-alternative"
                        id="input-username"
                        placeholder="Price"
                        type="number"
                      />
                      <div style={{ fontSize: 12, color: "red" }}>
                        {initialErrorState.priceError}
                      </div>
                    </FormGroup>
                  </div>
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Description
                      </label>
                      <Input
                        value={description}
                        onChange={handleDescriptionChange}
                        className="form-control-alternative"
                        placeholder="Describe your insertion"
                        rows="4"
                        type="textarea"
                      />
                      <div style={{ fontSize: 12, color: "red" }}>
                        {initialErrorState.descriptionError}
                      </div>
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect()(withRouter(FormComponent));
