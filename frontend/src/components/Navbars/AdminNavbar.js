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
import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, getUser } from "../../redux/actions";
import { connect, useSelector } from "react-redux";
import { Image } from "cloudinary-react";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  NavbarBrand,
  Button,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      if (user.user) {
        if (user.user.user) {
          if (!user.user.user.email) {
            loadUser(user.user.user._id);
          }
        }
      }
    }
  });

  const loadUser = async (id) => {
    props.dispatch(getUser(id));
  };

  const onClickLogout = () => {
    // trigger redux logout action
    props.dispatch(logout());
    // navigate to the home page
    props.history.push("/");
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={
                require("../../assets/img/brand/logo_deal_white.png").default
              }
              style={{ width: "30%", height: "auto" }}
            />
          </NavbarBrand>
          {/* <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            
          </Link> */}
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <Link to="/create/new">
                <Button color="secondary" type="button">
                  Create Post
                </Button>
              </Link>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {/* <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-4-800x800.jpg")
                          .default
                      }
                    /> */}
                    {user.user.imageUrl === "nopic" ? (
                      <Image
                        type="fetch"
                        className="rounded-circle"
                        cloudName="dzk3apfy0"
                        publicId={
                          "https://res.cloudinary.com/dzk3apfy0/image/fetch/v1626854713/https://res.cloudinary.com/dzk3apfy0/image/upload/w_1000%2Cc_fill%2Car_1:1%2Cg_auto%2Cr_max%2Cbo_5px_solid_red%2Cb_rgb:262c35/v1626770636/hvgipo0ycfm96d2iukp6.png"
                        }
                      />
                    ) : (
                      <Image
                        type="fetch"
                        className="rounded-circle"
                        cloudName="dzk3apfy0"
                        publicId={user.user.imageUrl}
                      />
                    )}
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user.user.name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <Link to={`/settings/${user.user._id}`}>
                  <DropdownItem>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                </Link>
                <Link to={`/myposts/${user.user._id}`}>
                  <DropdownItem>
                    <i className="ni ni-single-02" />
                    <span>My Posts</span>
                  </DropdownItem>
                </Link>
                {/* <Link to={`admin/myrequests/${user.user._id}`}> */}
                <Link to={`/myrequests/${user.user._id}`}>
                  <DropdownItem>
                    <i className="ni ni-calendar-grid-58" />
                    <span>My Requests</span>
                  </DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem onClick={onClickLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default connect()(withRouter(AdminNavbar));
