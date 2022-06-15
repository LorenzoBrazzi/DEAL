export default function selectedPosts(state = {}, action) {
  switch (action.type) {
    case "GETPOSTSBYCREATOR_SUCCESS":
      return { postsByCreator: action.posts };
    case "GETPOSTSBYCREATOR_ERROR":
      return { postsByCreatorError: action.error };
    case "GETPOSTSBYREQUESTING_SUCCESS":
      return { postsByRequesting: action.posts };
    case "GETPOSTSBYREQUESTING_ERROR":
      return { postsByRequestingError: action.error };
    case "UPDATEPOST_SUCCESS":
      return { updatedPost: action.post };
    case "UPDATEPOST_ERROR":
      return { updatePostError: action.error };
    default:
      return { posts: action.posts };
  }
}
