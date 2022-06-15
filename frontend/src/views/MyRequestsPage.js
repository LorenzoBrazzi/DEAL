import React from "react";
import MyPostsList from "../components/MyPosts/MyPostsList";
import ErrorMessage from "../components/MyPosts/ErrorMessage";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getPostsByRequestingId,
  changePost,
  deletePost,
  updateOtherUser,
} from "../redux/actions";

function MyRequestsPage(props) {
  const postsByRequestingId = useSelector(
    (state) => state.selectedPosts.postsByRequesting
  );
  const postsByRequestingError = useSelector(
    (state) => state.selectedPosts.postsByRequestingError
  );
  const updatedPost = useSelector((state) => state.selectedPosts.updatedPost);
  const updatePostError = useSelector(
    (state) => state.selectedPosts.updatePostError
  );
  const [userId, setUserId] = React.useState(props.match.params.id);

  React.useEffect(() => {
    setUserId(props.match.params.id);
    loadPostsByRequestingId(userId);
  }, [props.match]);

  React.useEffect(() => {
    loadPostsByRequestingId(props.match.params.id);
  }, [updatedPost]);

  const loadPostsByRequestingId = async (userId) => {
    props.dispatch(getPostsByRequestingId(userId));
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
      {postsByRequestingError && (
        <ErrorMessage
          error={postsByRequestingError}
          message="There has been an error while loading your requests."
          retry={() => {
            loadPostsByRequestingId(props.match.params.id);
          }}
        />
      )}
      {updatePostError && (
        <ErrorMessage
          error={updatePostError}
          message="There has been an error while canceling your request."
        />
      )}
      <MyPostsList
        posts={postsByRequestingId}
        userId={userId}
        navigateToDetailPage={navigateToDetailPage}
        updatePost={updatePost}
        navigateToEdit={navigateToEdit}
        handleDelete={handleDelete}
        isCreator={false}
        updateOtherUser={tryUpdateOtherUser}
      />
    </div>
  );
}

export default connect()(withRouter(MyRequestsPage));
