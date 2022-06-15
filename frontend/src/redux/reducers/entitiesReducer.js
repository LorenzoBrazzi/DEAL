export default function entities(state = {}, action) {
  switch (action.type) {
    case "FETCH_FAILURE_ENTITY":
      return { addPostFetchFailure: action.error };
    case "GETPOSTS_SUCCESS":
      return { posts: action.posts };
    case "GETPOSTS_FAILURE":
      return { getPostsError: action.error };
    case "DELETEPOST_SUCCESS":
      return { deleteMessage: action.deleteMessage };
    case "DELETEPOST_ERROR":
      return { deletePostError: action.error };
    case "ADDPOST_SUCCESS":
      return { ...state };
    case "ADDPOST_FAILURE":
      return { addPostFailure: action.error };
    case "GETUSERNAME_SUCCESS":
      return { userIdName: action.userIdName };
    case "GETUSERNAME_ERROR":
      return { getUserNameError: action.error };
    case "GETUSERRATING_SUCCESS":
      return { userIdRating: action.userIdRating };
    case "GETUSERRATING_ERROR":
      return { getUserRatingError: action.error };
    case "GETUSERIMAGE_SUCCESS":
      return { userIdImageurl: action.userIdImageurl };
    case "GETUSERIMAGE_ERROR":
      return { getUserImageError: action.error };
    case "GETOTHERUSER_SUCCESS":
      return { otherUser: action.otherUser };
    case "GETOTHERUSER_ERROR":
      return { otherUserError: action.error };
    case "UPDATEOTHERUSER_SUCCESS":
      return { updatedOtherUser: action.otherUser };
    case "UPDATEOTHERUSER_ERROR":
      return { updatedOtherUserError: action.error };
    default:
      return state;
  }
}
