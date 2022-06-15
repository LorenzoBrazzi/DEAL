import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { changePost } from "redux/actions";

import { Media, Modal, Button } from "reactstrap";
import PostDetail from "views/PostDetail";
import DialogButton from "components/MyPosts/DialogButton";
import CustomizedAlert from "components/CustomizedAlert";

export function createDate(date1) {
  let year = date1.split("-")[0];
  let month = date1.split("-")[1];
  let day = date1.split("-")[2].split("T")[0];
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
  date1 = day.concat(".", month, " ", year);
  return date1;
}

function PostListRow(props) {
  const user = useSelector((state) => state.user);
  const updatePostError = useSelector(
    (state) => state.selectedPosts.updatePostError
  );

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const [id, setID] = React.useState();
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
  const [status, setStatus] = React.useState();
  const [matchedUserID, setMatchedUserID] = React.useState();
  const [requestingUsers, setRequestingUsers] = React.useState();
  const [matchedUserComment, setMatchedUserComment] = React.useState();
  const [creatorComment, setCreatorComment] = React.useState();

  const extractpost = () => {
    if (!props.post) {
      console.log("could not extract post");
      return;
    }

    setID(props.post._id);
    setTitle(props.post.title);
    setValue(props.post.offerOrRequest);
    setAdresse(props.post.address);
    setPostCode(props.post.postCode);
    setTown(props.post.town);
    setPrice(props.post.price);
    setDescription(props.post.description);
    setCategory(props.post.category);
    setSelectedDate(props.post.date);
    setCreatorID(props.post.creatorID);
    setStatus(props.post.status);
    setMatchedUserID(props.post.matchedUserID);
    setRequestingUsers(props.post.requestingUsers);
    setMatchedUserComment(props.post.matchedUserComment);
    setCreatorComment(props.post.creatorComment);
  };

  const [state, setState] = React.useState({
    defaultModal: false,
  });

  const toggleModal = () => {
    setState({ defaultModal: !state["defaultModal"] });
  };

  const [userName, setUserName] = React.useState();
  const [userImage, setUserImage] = React.useState();
  const [isCurrentUserPost, setIsCurrentUserPost] = React.useState();

  const [reqUserIsAlreadyAdded, setReqUserIsAlreadyAdded] =
    React.useState(false);

  const sendRequest = () => {
    props.post.requestingUsers.unshift(user.user._id);
    setReqUserIsAlreadyAdded(true);

    const updatedPostWithRequest = {
      _id: id,
      offerOrRequest: value,
      title: title,
      creatorID: creatorID,
      description: description,
      category: category,
      price: price,
      address: adresse,
      postCode: postCode,
      town: town,
      status: "open",
      date: selectedDate,
      matchedUserID: null,
      requestingUsers: requestingUsers,
      matchedUserComment: null,
      creatorComment: null,
    };

    props.dispatch(changePost(updatedPostWithRequest));
    setVisible(true);
  };

  useEffect(() => {
    extractpost();
    if (props.post.creatorID === user.user._id) {
      setIsCurrentUserPost(true);
    } else {
      setIsCurrentUserPost(false);
    }
    if (props.post.requestingUsers.includes(user.user._id)) {
      setReqUserIsAlreadyAdded(true);
    } else {
      setReqUserIsAlreadyAdded(false);
    }
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }

    let unmounted = false;
    fetch(`http://localhost:3001/auth/name/${props.post.creatorID}`, {
      method: "GET",
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => !unmounted && setUserName(data))
      .catch(console.error);

    fetch(`http://localhost:3001/auth/image/${props.post.creatorID}`, {
      method: "GET",
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.imageUrl === "nopic") {
          !unmounted &&
            setUserImage({
              id: data.id,
              imageUrl:
                "https://res.cloudinary.com/dzk3apfy0/image/fetch/v1626854713/https://res.cloudinary.com/dzk3apfy0/image/upload/w_1000%2Cc_fill%2Car_1:1%2Cg_auto%2Cr_max%2Cbo_5px_solid_red%2Cb_rgb:262c35/v1626770636/hvgipo0ycfm96d2iukp6.png",
            });
        } else {
          !unmounted && setUserImage(data);
        }
      })
      .catch(console.error);

    return () => (unmounted = true);
  }, [props.post]);

  return userName && userImage ? (
    <tr>
      <th>{props.post.title}</th>
      <td>
        <Media className="align-items-center">
          <a className="avatar avatar-sm" onClick={(e) => e.preventDefault()}>
            <img
              alt="..."
              className="rounded-circle"
              src={userImage.imageUrl}
            />
          </a>
          &nbsp; - {userName.name}
        </Media>
      </td>
      <td>
        {props.post.address}
        <br />
        {props.post.postCode}, {props.post.town}
      </td>
      <td>{props.post.category}</td>
      <td>{createDate(props.post.date)}</td>
      <td>€{props.post.price}</td>
      <td className="text-right">
        <Button
          className="btn-icon-only text-light"
          role="button"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            toggleModal();
          }}
        >
          <i style={{ color: "white" }} className="ni ni-bold-right" />
        </Button>
        <Modal
          className="modal-dialog-centered"
          isOpen={state.defaultModal}
          toggle={() => toggleModal()}
        >
          <div className="modal-header">
            <div class="container">
              <CustomizedAlert
                message={
                  updatePostError
                    ? "Sorry. We faced problems in creating your request"
                    : "Request has been sent!"
                }
                errors={updatePostError}
                visible={visible}
                onDismiss={onDismiss}
                formComponentActive={false}
              />
            </div>
            <h1 className="modal-title" id="modal-title-default"></h1>
          </div>
          <div className="modal-body">
            <PostDetail post={props.post} />
          </div>
          <div className="modal-footer">
            {/* <Link to={`/myrequests/${user.user._id}`}> */}
            <DialogButton
              name={"Send Request"}
              //title={"Delete"}
              text={"Are you sure you want to send this request?"}
              handleYes={sendRequest}
              //outline={true}
              color="primary"
              //size="sm"
              disabled={reqUserIsAlreadyAdded || isCurrentUserPost}
            />
            {reqUserIsAlreadyAdded && !updatePostError ? (
              <div style={{ fontSize: 12, color: "green" }}>Request sent.</div>
            ) : undefined}
            <Button
              className="ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal("defaultModal")}
            >
              Close
            </Button>
          </div>
        </Modal>
      </td>
    </tr>
  ) : (
    <p>Loading...</p>
  );
}

export default connect()(withRouter(PostListRow));
