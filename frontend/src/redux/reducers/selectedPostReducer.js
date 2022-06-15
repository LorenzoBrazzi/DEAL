export default function selectedPost(state = {}, action) {
  switch (action.type) {
    case "GETPOST_SUCCESS":
      return { post: action.post };
    case "GETPOST_ERROR":
      return { error: action.error };
    case "UPDATEPOST_SUCCESS":
      return {
        post: {
          ...state.post,
          ...action.updates,
        },
      };
    default:
      return { post: action.post };
  }
}
