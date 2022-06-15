import React, { useEffect } from "react";
import PostListComponent from "../components/TableList/PostListComponent";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getPosts } from "../redux/actions";
import ErrorMessage from "../components/MyPosts/ErrorMessage";

import Loading from "../components/Loading";

function PostsListDashboard(props) {
  // state from the redux store
  const posts = useSelector((state) => state.entities.posts);
  const getPostsError = useSelector((state) => state.entities.getPostsError);

  useEffect(() => {
    // load posts when the page is loaded or the posts have changed.
    loadPosts();
  }, [props.match]);

  const loadPosts = async () => {
    // trigger the redux action getPosts
    props.dispatch(getPosts());
  };

  const onClickDisplayPost = (id) => {
    // navigate to details of the selected post
    props.history.push("/post/" + id);
  };

  return (
    <>
      {getPostsError && (
        <ErrorMessage
          error={getPostsError}
          message="Ups! There has been an internal server error."
        />
      )}
      {!posts ? (
        <Loading />
      ) : (
        <>
          <PostListComponent
            posts={posts}
            onClickDisplayPost={onClickDisplayPost}
            //isLoggedIn={!!user.user}
          />
        </>
      )}
    </>
  );
}

export default connect()(withRouter(PostsListDashboard));
