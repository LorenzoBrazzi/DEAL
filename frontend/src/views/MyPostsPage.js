import React from "react";
import MyPostsList from "../components/MyPosts/MyPostsList";
import ErrorMessage from "../components/MyPosts/ErrorMessage";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getPostsByCreator,
  changePost,
  deletePost,
  updateOtherUser,
} from "../redux/actions";

function MyPostsPage(props) {
  const postsByCreator = useSelector(
    (state) => state.selectedPosts.postsByCreator
  );
  const postsByCreatorError = useSelector(
    (state) => state.selectedPosts.postsByCreatorError
  );
  const updatedPost = useSelector((state) => state.selectedPosts.updatedPost);
  const deleteMessage = useSelector((state) => state.entities.deleteMessage);
  const [userId, setUserId] = React.useState(props.match.params.id);

  React.useEffect(() => {
    setUserId(props.match.params.id);
    loadPostsByCreatorId(userId);
  }, [props.match, deleteMessage]);

  React.useEffect(() => {
    loadPostsByCreatorId(props.match.params.id);
  }, [updatedPost]);

  const loadPostsByCreatorId = async (userId) => {
    props.dispatch(getPostsByCreator(userId));
  };

  const updatePost = async (changedPost) => {
    props.dispatch(changePost(changedPost));
  };

  const handleDelete = async (id) => {
    props.dispatch(deletePost(id));
  };
  const navigateToDetailPage = (id) => {
    props.history.push("/post/" + id);
  };

  const navigateToEdit = (id) => {
    props.history.push("/create/" + id);
  };

  const tryUpdateOtherUser = async (changedUser) => {
    props.dispatch(updateOtherUser(changedUser));
  };

  return (
    <div>
      {postsByCreatorError && (
        <ErrorMessage
          error={postsByCreatorError}
          message="There has been an error while loading your posts."
          retry={() => {
            loadPostsByCreatorId(props.match.params.id);
          }}
        />
      )}
      <MyPostsList
        posts={postsByCreator}
        navigateToDetailPage={navigateToDetailPage}
        updatePost={updatePost}
        navigateToEdit={navigateToEdit}
        handleDelete={handleDelete}
        isCreator={true}
        updateOtherUser={tryUpdateOtherUser}
      />
    </div>
  );
}

export default connect()(withRouter(MyPostsPage));
