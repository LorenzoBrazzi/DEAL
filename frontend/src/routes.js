/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import PostListDashboard from "views/PostListDashboard";
import CreatePostFormular from "views/CreatePostFormular";
import ProfileSettingsView from "views/ProfileSettingsView";
import MyPostsPage from "views/MyPostsPage";
import MyRequestsPage from "views/MyRequestsPage";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/myPosts/:id",
    name: "My Posts",
    icon: "ni ni-pin-3 text-orange",
    component: MyPostsPage,
    layout: "/admin",
  },
  {
    path: "/myrequests/:id",
    name: "My Requests",
    icon: "ni ni-pin-3 text-orange",
    component: MyRequestsPage,
    layout: "/admin",
  },
  {
    path: "/create/:id",
    name: "Create Post",
    icon: "ni ni-single-02 text-yellow",
    component: CreatePostFormular,
    layout: "/admin",
  },
  {
    path: "/settings/:id",
    name: "Profile Settings",
    icon: "ni ni-single-02 text-yellow",
    component: ProfileSettingsView,
    layout: "/admin",
  },
  {
    path: "/posts",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: PostListDashboard,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
