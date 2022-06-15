import PostService from "../../services/PostService";

export function getPosts() {
  // when the backend call was successfull and the posts are retrieved
  // in the dispatcher the posts will be added to the global state
  function onSuccess(posts) {
    // das sollte vllt GETPOSTS_SUCCESS heißen
    return { type: "GETPOSTS_SUCCESS", posts: posts };
  }
  // when the backend call was failed
  function onFailure(error) {
    // error handling
    return { type: "GETPOSTS_FAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      let posts = await PostService.getPosts();
      dispatch(onSuccess(posts));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function deletePost(id) {
  function onSuccess(deleteMessage) {
    return { type: "DELETEPOST_SUCCESS", deleteMessage: deleteMessage };
  }
  function onFailure(error) {
    return { type: "DELETEPOST_ERROR", error };
  }

  return async (dispatch) => {
    try {
      let deleteMessage = await PostService.deletePost(id);
      dispatch(onSuccess(deleteMessage));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function addPost(post) {
  function onSuccess() {
    return { type: "ADDPOST_SUCCESS" };
  }
  function onFailure(error) {
    return { type: "ADDPOST_FAILURE", error };
  }

  return async (dispatch) => {
    try {
      await PostService.createPost(post);
      dispatch(onSuccess());
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function changePost(changedPost) {
  function onSuccess(post) {
    return { type: "UPDATEPOST_SUCCESS", post: post };
  }

  function onFailure(error) {
    return { type: "UPDATEPOST_ERROR", error };
  }

  return async (dispatch) => {
    try {
      let posts = await PostService.updatePost(changedPost);
      dispatch(onSuccess(posts));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export const getPost = (id) => {
  function onSuccess(post) {
    return { type: "GETPOST_SUCCESS", post: post };
  }
  function onFailure(error) {
    return { type: "GETPOST_ERROR", error };
  }

  return async (dispatch, getState) => {
    try {
      let post = await PostService.getPost(id);
      dispatch(onSuccess(post));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
};

export const getPostsByCreator = (creatorId) => {
  function onSuccess(posts) {
    return { type: "GETPOSTSBYCREATOR_SUCCESS", posts: posts };
  }
  function onFailure(error) {
    return { type: "GETPOSTSBYCREATOR_ERROR", error };
  }

  return async (dispatch, getState) => {
    try {
      let posts = await PostService.getPostsByCreator(creatorId);
      dispatch(onSuccess(posts));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
};

export const getPostsByRequestingId = (requestingId) => {
  function onSuccess(posts) {
    return { type: "GETPOSTSBYREQUESTING_SUCCESS", posts: posts };
  }
  function onFailure(error) {
    return { type: "GETPOSTSBYREQUESTING_ERROR", error };
  }

  return async (dispatch, getState) => {
    try {
      let posts = await PostService.getPostsByRequstingId(requestingId);
      dispatch(onSuccess(posts));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
};
