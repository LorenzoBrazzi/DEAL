import {
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  makeStyles,
  createStyles,
  Avatar,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import React from "react";
import { connect, useSelector } from "react-redux";
import { getUserRating, getUserName, getUserImage } from "../../redux/actions";

const useStyles = makeStyles((theme) =>
  createStyles({
    inline: {
      display: "inline",
    },
  })
);

const RequestsListItem = (props) => {
  const { post, userId, updatePost, handleCancel, handleChange } = props;
  const classes = useStyles();
  const [name, setName] = React.useState();
  const [rating, setRating] = React.useState();
  const [imageUrl, setImageUrl] = React.useState();
  const userIdName = useSelector((state) => state.entities.userIdName);
  const userIdRating = useSelector((state) => state.entities.userIdRating);
  const userIdImageurl = useSelector((state) => state.entities.userIdImageurl);
  // const error = useSelector((state) => state.entities.getUserNameError);

  React.useEffect(() => {
    loadUserNameByUserId(userId);
    loadUserRatingByUserId(userId);
    loadUserImageByUserId(userId);
  }, [userId]);

  React.useEffect(() => {
    if (!!userIdName && userIdName.id === userId) {
      setName(userIdName.name);
    }
  }, [userIdName]);

  React.useEffect(() => {
    if (!!userIdRating && userIdRating.id === userId) {
      setRating(userIdRating.avgRating);
    }
  }, [userIdRating]);

  React.useEffect(() => {
    if (!!userIdImageurl && userIdImageurl.id === userId) {
      setImageUrl(userIdImageurl.imageUrl);
    }
  }, [userIdImageurl]);

  const loadUserNameByUserId = async (userId) => {
    props.dispatch(getUserName(userId));
  };
  const loadUserRatingByUserId = async (userId) => {
    props.dispatch(getUserRating(userId));
  };
  const loadUserImageByUserId = async (userId) => {
    props.dispatch(getUserImage(userId));
  };

  const handleAccept = () => {
    const changedPost = {
      ...post,
      status: "matched",
      matchedUserID: userId,
      updatedAt: new Date(),
    };
    updatePost(changedPost);
    handleChange();
  };

  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={name} src={imageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary="Request from"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {name}
              </Typography>
              {rating === 0 ? " - No rating yet." : ` — ${rating}`}
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => {
              handleAccept();
            }}
          >
            <CheckCircleIcon style={{ color: "green" }} />
          </IconButton>

          <IconButton
            edge="end"
            onClick={() => {
              handleCancel(userId);
            }}
          >
            <CancelIcon style={{ color: "red" }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default connect()(RequestsListItem);
