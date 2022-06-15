import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPost } from "../redux/actions";
import PostDetailComponent from "../components/PostDetailComponent";

function PostDetail(post) {
  useEffect(() => {
    loadPost(post._id);
  }, [post]);

  const loadPost = async (id) => {
    getPost(id);
  };

  return <PostDetailComponent post={post} fallback={<p>LOADING...</p>} />;
}

export default connect()(PostDetail);
