import {
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import CommentRating from "./CommentRating";
import DialogButton from "./DialogButton";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import RequestsListItem from "./RequestsListItem";
import React from "react";
import { connect, useSelector } from "react-redux";
import { getOtherUser } from "../../redux/actions";

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  })
);
const ExtendCard = (props) => {
  const {
    post,
    updatePost,
    handleChange,
    isCreator,
    updateOtherUser,
    handleCancel,
  } = props;
  const classes = useStyles();
  const [requestingUsersArr, setRequestingUsersArr] = React.useState(
    post.requestingUsers
  );
  const [comment, setComment] = React.useState();
  const [rating, setRating] = React.useState();
  const [rateOnce, setRateOnce] = React.useState(false);
  const [otherUserName, setOtherUserName] = React.useState();
  const [otherUserTel, setOtherUserTel] = React.useState();
  const [creatorComment, setCreatorComment] = React.useState("No comment yet.");
  const [matchedUserComment, setMatchedUserComment] =
    React.useState("No comment yet.");
  const otherUser = useSelector((state) => state.entities.otherUser);
  const updatedOtherUser = useSelector(
    (state) => state.entities.updatedOtherUser
  );

  const handleYesPay = () => {
    const changedPost = { ...post, status: "paid", updatedAt: new Date() };
    updatePost(changedPost);
    handleChange();
  };
  const handleYesConfirm = () => {
    const changedPost = { ...post, status: "done", updatedAt: new Date() };
    updatePost(changedPost);
  };

  const handleCommentSend = () => {
    if (isCreator) {
      const changedPost = {
        ...post,
        creatorComment: comment,
        status: post.matchedUserComment != null ? "evaluated" : post.status,
        updatedAt: new Date(),
      };
      updatePost(changedPost);
      tryGetOtherUser(post.matchedUserID);
      setRateOnce(true);
    } else {
      const changedPost = {
        ...post,
        matchedUserComment: comment,
        status: post.creatorComment != null ? "evaluated" : post.status,
        updatedAt: new Date(),
      };
      updatePost(changedPost);
      tryGetOtherUser(post.creatorID);
      setRateOnce(true);
    }
    return;
  };

  React.useEffect(() => {
    if (isCreator) {
      tryGetOtherUser(post.matchedUserID);
    } else {
      tryGetOtherUser(post.creatorID);
    }
    if (post.creatorComment != null) {
      setCreatorComment(post.creatorComment);
    }
    if (post.matchedUserComment != null) {
      setMatchedUserComment(post.matchedUserComment);
    }
  }, [post]);

  React.useEffect(() => {
    if (!!otherUser && rating > 0 && rateOnce) {
      let updatedRatings = otherUser.ratings;
      updatedRatings.push(rating);
      const changedUser = { ...otherUser, ratings: updatedRatings };
      updateOtherUser(changedUser);
      setRateOnce(false);
    }
    if (!!otherUser) {
      if (
        (isCreator && otherUser._id === post.matchedUserID) ||
        (!isCreator && otherUser._id === post.creatorID)
      ) {
        setOtherUserName(otherUser.name);
        setOtherUserTel(otherUser.tel);
      }
    }
  }, [otherUser]);

  React.useEffect(() => {
    setRating(0);
    setComment(null);
  }, [updatedOtherUser]);

  const tryGetOtherUser = async (userId) => {
    props.dispatch(getOtherUser(userId));
  };

  React.useEffect(() => {
    setRequestingUsersArr(post.requestingUsers);
  }, [post.requestingUsers]);

  return (
    <div>
      {post.status === "open" && (
        <List className={classes.list}>
          {requestingUsersArr.length === 0 && (
            <div>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <AccessTimeIcon style={{ color: "#3f51b5", fontSize: 40 }} />
                </ListItemAvatar>
                <ListItemText
                  primary="This post hasn't got any request yet."
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Be patient. Your post can be seen by others in the posts
                        page.
                      </Typography>
                      {/* {" — some notes"} */}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          )}
          {isCreator ? (
            requestingUsersArr.map((id) => (
              <RequestsListItem
                userId={id}
                post={post}
                updatePost={updatePost}
                handleCancel={handleCancel}
                handleChange={handleChange}
              />
            ))
          ) : (
            <div>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <AccessTimeIcon style={{ color: "#3f51b5", fontSize: 40 }} />
                </ListItemAvatar>
                <ListItemText
                  primary="You've sent the request."
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Be patient. Your request will be answered soon.
                      </Typography>
                      {/* {" — some notes"} */}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          )}
        </List>
      )}

      {post.status === "matched" && (
        <div>
          <List className={classes.list}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <HowToRegIcon style={{ color: "#3f51b5", fontSize: 40 }} />
              </ListItemAvatar>
              <ListItemText
                primary="Your deal is matched."
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {otherUserName}
                    </Typography>
                    {` - Tel: ${otherUserTel}`}
                  </React.Fragment>
                }
              />
              {((post.offerOrRequest === "ask" && isCreator) ||
                (post.offerOrRequest === "offer" && !isCreator)) && (
                <DialogButton
                  name={"Pay"}
                  title={"Payment"}
                  text={
                    "You will go to an external payment website. Is the payemnt done?"
                  }
                  handleYes={handleYesPay}
                  outline={false}
                  color="primary"
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
      )}

      {post.status === "paid" && (
        <div>
          <List className={classes.list}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <AccessibilityIcon style={{ color: "#3f51b5", fontSize: 40 }} />
              </ListItemAvatar>
              <ListItemText
                primary="Successful payment."
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {otherUserName}
                    </Typography>
                    {" — Help in progess."}
                  </React.Fragment>
                }
              />
              {((post.offerOrRequest === "ask" && isCreator) ||
                (post.offerOrRequest === "offer" && !isCreator)) && (
                <DialogButton
                  name={"Confirm"}
                  title={"Confirmation"}
                  text={
                    'By clicking on "Yes" button you confirm that you have got the help.'
                  }
                  handleYes={handleYesConfirm}
                  outline={false}
                  color="primary"
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
      )}

      {post.status === "done" &&
        ((isCreator && post.creatorComment == null) ||
          (!isCreator && post.matchedUserComment == null)) && (
          <div style={{ padding: 10 }}>
            <Grid
              container
              spacing={2}
              xs={12}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={8}>
                <TextField
                  id="outlined-multiline-static"
                  label="How is the deal? Please comment"
                  multiline
                  fullWidth
                  rows={2}
                  placeholder="Very nice and helpful!"
                  variant="outlined"
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <CommentRating
                  setRating={setRating}
                  postId={post._id}
                  isRated={false}
                />
              </Grid>
              <Grid item>
                <DialogButton
                  name={"Send"}
                  title={"Send Comment and Rating"}
                  text={
                    'The comment and rating cannot be change after you click on "Yes" button.'
                  }
                  handleYes={handleCommentSend}
                  outline={false}
                  color="primary"
                />
              </Grid>
            </Grid>
          </div>
        )}

      {(post.status === "evaluated" ||
        (post.status === "done" &&
          ((isCreator && post.creatorComment != null) ||
            (!isCreator && post.matchedUserComment != null)))) && (
        <div>
          <List className={classes.list}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <EmojiPeopleIcon style={{ color: "#3f51b5", fontSize: 40 }} />
              </ListItemAvatar>
              <ListItemText
                primary="Your deal is closed."
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {`Comment from ${otherUserName}`}
                    </Typography>
                    {isCreator
                      ? `: ${matchedUserComment}`
                      : `: ${creatorComment}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
      )}
    </div>
  );
};

export default connect()(ExtendCard);
