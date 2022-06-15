import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  TableRow,
  Typography,
  Paper,
  Collapse,
} from "@material-ui/core";
import { Button } from "reactstrap";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Status from "./Status";
import ExtendCard from "./ExtendCard";
import { createDate } from "../TableList/PostListRow";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import { Modal } from "reactstrap";
import PostDetail from "views/PostDetail";
import DialogButton from "./DialogButton";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
      background: "white",
    },
    button: {
      marginTop: theme.spacing(1),
      alignSelf: "right",
    },
  })
);

function FoldableCardRow(props) {
  const { post, userId, updatePost, handleDelete, isCreator, updateOtherUser } =
    props;
  const classes = useStyles();
  const [fold, setFold] = React.useState(true);
  const postId = post._id;
  const [shortTitle, setShortTitle] = React.useState(post.title);
  const [arr, setArr] = React.useState(post.requestingUsers);

  React.useEffect(() => {
    if (post.title.length > 35) {
      setShortTitle(post.title.substr(0, 35) + "...");
    } else {
      setShortTitle(post.title);
    }
  }, [post]);

  const handleChange = () => {
    setFold((prev) => !prev);
  };

  const handleCancel = (canceledId) => {
    const index = arr.indexOf(canceledId);
    if (index > -1) {
      setArr(arr.splice(index, 1));
    }
    handleUpdatePost();
  };
  const handleUpdatePost = () => {
    const changedPost = {
      ...post,
      requestingUsers: arr,
      updatedAt: new Date(),
    };
    updatePost(changedPost);
  };

  const [state, setState] = React.useState({
    defaultModal: false,
  });
  const toggleModal = () => {
    setState({ defaultModal: !state["defaultModal"] });
  };

  return (
    <TableRow>
      <div>
        <Modal
          className="modal-dialog-centered"
          isOpen={state.defaultModal}
          toggle={() => toggleModal()}
        >
          <div className="modal-header">
            <h1 className="modal-title" id="modal-title-default"></h1>
          </div>
          <div className="modal-body">
            <PostDetail post={post} />
          </div>
          <div className="modal-footer">
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
        <Collapse in={!fold} collapsedHeight={100}>
          <Container maxWidth="100%" className={classes.container}>
            <Paper className={classes.paper}>
              <Grid container spacing={2} xs={12}>
                <Grid item xs={5} container direction="column" spacing={2}>
                  <Grid item xs>
                    <Grid item>
                      <Status
                        offerOrRequest={post.offerOrRequest}
                        status={post.status}
                        isCreator={isCreator}
                      />
                      <Typography variant="h6">
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            toggleModal();
                          }}
                        >
                          {shortTitle}
                        </Link>
                      </Typography>

                      {isCreator && (
                        <Typography variant="subtitle2">
                          {post.offerOrRequest === "ask"
                            ? "I need help."
                            : "I offer help."}
                        </Typography>
                      )}
                      {!isCreator && (
                        <Typography variant="subtitle2">
                          {post.offerOrRequest === "ask"
                            ? "I offer help."
                            : "I need help."}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1">
                    {createDate(post.date)}
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Typography variant="subtitle1">${post.price}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    onClick={handleChange}
                    outline
                    color="primary"
                    size="sm"
                  >
                    {fold && (
                      <Typography>
                        <KeyboardArrowDownIcon />
                      </Typography>
                    )}
                    {!fold && <KeyboardArrowUpIcon />}
                  </Button>
                </Grid>
                {isCreator ? (
                  <>
                    <Grid item xs={1}>
                      {post.status === "open" && (
                        <Link to={`/create/${postId}`}>
                          <Button
                            outline
                            color="primary"
                            size="sm"
                            disabled={post.status !== "open"}
                          >
                            <EditIcon />
                          </Button>
                        </Link>
                      )}
                    </Grid>
                    <Grid item xs={1}>
                      {post.status === "open" && (
                        <DialogButton
                          name={<CancelIcon />}
                          title={"Delete"}
                          text={"Are you sure you want to delete this post?"}
                          handleYes={() => handleDelete(postId)}
                          outline={true}
                          color="danger"
                          size="sm"
                          disabled={post.status !== "open"}
                        />
                      )}
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={1}>
                    {post.status === "open" && (
                      <DialogButton
                        name={<CancelIcon />}
                        title={"Cancel"}
                        text={"Are you sure you want to cancel this request?"}
                        handleYes={() => handleCancel(userId)}
                        outline={true}
                        color="danger"
                        size="sm"
                      />
                    )}
                  </Grid>
                )}
                <Grid item xs={12}>
                  <ExtendCard
                    post={post}
                    updatePost={updatePost}
                    handleChange={handleChange}
                    isCreator={isCreator}
                    updateOtherUser={updateOtherUser}
                    handleCancel={handleCancel}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Collapse>
      </div>
    </TableRow>
  );
}

export default FoldableCardRow;
