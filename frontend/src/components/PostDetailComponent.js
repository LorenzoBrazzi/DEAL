import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { Image } from "cloudinary-react";

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Loading from "./Loading";

function PostDetailComponent(props) {
  const { post } = props;
  const selectedPost = post.post;

  const [value, setValue] = React.useState("ask");
  const [title, setTitle] = React.useState("");
  const [adresse, setAdresse] = React.useState("");
  const [postCode, setPostCode] = React.useState("");
  const [town, setTown] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [creatorID, setCreatorID] = React.useState("");

  const [userName, setUserName] = React.useState();
  const [rating, setRating] = React.useState();
  const [userImage, setUserImage] = React.useState();

  useEffect(() => {
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }
    let unmounted = false;
    fetch(`http://localhost:3001/auth/rating/${post.post.creatorID}`, {
      method: "GET",
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => !unmounted && setRating(data))
      .catch(console.error);

    fetch(`http://localhost:3001/auth/name/${post.post.creatorID}`, {
      method: "GET",
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => !unmounted && setUserName(data))
      .catch(console.error);

    fetch(`http://localhost:3001/auth/image/${post.post.creatorID}`, {
      method: "GET",
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => !unmounted && setUserImage(data))
      .catch(console.error);

    return () => (unmounted = true);
  }, []);

  const extractpost = () => {
    if (!post) {
      console.log("could not extract post");
      return;
    }

    setTitle(selectedPost.title);
    setValue(selectedPost.offerOrRequest);
    setAdresse(selectedPost.address);
    setPostCode(selectedPost.postCode);
    setTown(selectedPost.town);
    setPrice(selectedPost.price);
    setDescription(selectedPost.description);
    setCategory(selectedPost.category);
    setSelectedDate(selectedPost.date);
    setCreatorID(selectedPost.creatorID);
  };

  useEffect(() => {
    extractpost();
  }, [post]);

  function createDate(date1) {
    let year = date1.split("-")[0];
    let month = date1.split("-")[1];
    let day = date1.split("-")[2].split("T")[0];
    let time = date1.split("-")[2].split("T")[1];
    let hour = time.split(":")[0];
    let minute = time.split(":")[1].split(":")[0];
    switch (month) {
      case "01":
        month = "January";
        break;
      case "02":
        month = "February";
        break;
      case "03":
        month = "March";
        break;
      case "04":
        month = "April";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "June";
        break;
      case "07":
        month = "July";
        break;
      case "08":
        month = "August";
        break;
      case "09":
        month = "September";
        break;
      case "10":
        month = "October";
        break;
      case "11":
        month = "November";
        break;
      case "12":
        month = "december";
        break;
      default:
        break;
    }
    date1 = day.concat(".", month, " ", year, " TIME: ", hour, ":", minute);
    return date1;
  }

  return rating && userName && userImage ? (
    <Card className="card-profile shadow">
      <Row className="justify-content-center">
        <Col className="order-lg-2" lg="3">
          <div className="card-profile-image">
            <a onClick={(e) => e.preventDefault()}>
              {!userImage.imageUrl || userImage.imageUrl === "nopic" ? (
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
                  publicId={userImage.imageUrl}
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
              {!rating.avgRating || rating.avgRating === 0 ? (
                "User has no ratings yet."
              ) : (
                <Rating
                  name="half-rating-read"
                  value={rating.avgRating}
                  precision={0.5}
                  readOnly
                />
              )}{" "}
            </div>
          </div>
        </Row>
        <div className="text-center">
          <h3>
            {!userName.name ? "Name not available" : userName.name}
            {value === "ask" ? (
              <span className="font-weight-light">, requests help</span>
            ) : (
              <span className="font-weight-light">, offers help</span>
            )}
          </h3>
          <div className="h5 font-weight-300"></div>
          <hr className="my-4" />
          <div className="h2 mt-4">
            <i className="ni business_briefcase-24 mr-2" />
            {title}
          </div>
          <div>
            <span className="font-weight-light">DATE:</span>{" "}
            {createDate(selectedDate)}
          </div>
          <div>
            <span className="font-weight-light">ADDRESS:</span> {adresse},{" "}
            {town} {postCode}
          </div>
          <div>
            <span className="font-weight-light">PRICE:</span> €{price}
          </div>
          <hr className="my-4" />
          <p>
            <div className="h4 font-weight-500">Description:</div>
            {description}
          </p>
        </div>
      </CardBody>
    </Card>
  ) : (
    <Loading />
  );
}

PostDetailComponent.propTypes = {
  post: PropTypes.object,
};

export default connect()(withRouter(PostDetailComponent));
