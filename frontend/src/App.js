import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
//import "./css/style.scss";
import AOS from "aos";
import { focusHandling } from "cruip-js-toolkit";
import { connect, useSelector } from "react-redux";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change

  return (
    <div className="App">
      <React.Fragment>
        <Switch>
          {!!user.user ? (
            <Route path="/" render={(props) => <AdminLayout {...props} />} />
          ) : (
            <Route path="/" render={(props) => <AuthLayout {...props} />} />
          )}
          {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
          {/* <Route path="/auth" render={(props) => <AuthLayout {...props} />} /> */}
        </Switch>
        {/* {!!user.user ? <MenuBar /> : undefined}
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            {!!user.user ? <PostsListDashboard /> : <Home />}
          </Route>
          {!!user.user ? (
            routes.map((route, i) => <Route key={i} {...route} />)
          ) : (
            <Home />
          )}
        </Switch> */}
      </React.Fragment>
    </div>
  );
}

export default connect()(App);
