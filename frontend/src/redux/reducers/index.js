import { combineReducers } from "redux";
import user from "./userReducer";
import entities from "./entitiesReducer";
import selectedPost from "./selectedPostReducer";
import selectedPosts from "./selectedPostsReducer";

const allReducers = combineReducers({
  user,
  entities,
  selectedPost,
  selectedPosts,
});

export default allReducers;
