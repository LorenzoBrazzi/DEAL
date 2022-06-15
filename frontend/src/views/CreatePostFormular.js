import React, { useEffect } from "react";
import FormComponent from "../components/FormComponent";

import { connect, useSelector } from "react-redux";

import { addPost, getPost, changePost } from "../redux/actions";

function CreatePostFormular(props) {
  let { match, getPost } = props;
  const selectedPost = useSelector((state) => state.selectedPost);
  const user = useSelector((state) => state.user);
  const [newPost, setNewPost] = React.useState(false);
  const addPostFailure = useSelector((state) => state.entities.addPostFailure);
  const updatePostError = useSelector(
    (state) => state.selectedPosts.updatePostError
  );

  useEffect(() => {
    console.log("updatePostError");
    console.log(updatePostError);
  }, [updatePostError]);

  useEffect(() => {
    let postId = match.params.id;
    if (postId === "new") {
      setNewPost(true);
    } else {
      getPost(postId);
    }
  }, [match.params]);

  async function onCreate(post) {
    await props.addPost(post);
    setVisible(true);
  }
  const [visible, setVisible] = React.useState(false);
  const onDismiss = () => {
    setVisible(false);
    props.history.push(`/myposts/${user.user._id}`);
  };
  async function onSave(post) {
    await props.changePost(post);
    setVisible(true);
  }

  return (
    <div>
      {newPost ? (
        <FormComponent
          new={newPost}
          onCreate={onCreate}
          user={user}
          visible={visible}
          onDismiss={onDismiss}
          hasError={addPostFailure}
          message={
            addPostFailure
              ? "Sorry...Something went wrong!"
              : "Successfully added!"
          }
        />
      ) : (
        <FormComponent
          post={selectedPost.post}
          new={newPost}
          onSave={onSave}
          user={user}
          visible={visible}
          onDismiss={onDismiss}
          hasError={updatePostError}
          message={
            updatePostError
              ? "Sorry...Something went wrong!"
              : "Successfully edited!"
          }
        />
      )}
    </div>
  );
}

export default connect(null, { addPost, getPost, changePost })(
  CreatePostFormular
);
