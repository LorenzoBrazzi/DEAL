import React from "react";
import { connect, useSelector } from "react-redux";
import { updateUser, getUser } from "../redux/actions";
import { withRouter } from "react-router-dom";
import ProfileSettingsComponent from "../components/ProfileSettingsComponent";

function ProfileSettingsView(props) {
  const user = useSelector((state) => state.user);

  const onSave = (user) => {
    props.dispatch(updateUser(user));
  };

  const onCancel = () => {
    props.history.push("/");
  };

  React.useEffect(() => {
    let userID = props.match.params.id;
    getUser(userID);
  }, [props.match, props.user]);

  return (
    <ProfileSettingsComponent onCancel={onCancel} onSave={onSave} user={user} />
  );
}

export default connect()(withRouter(ProfileSettingsView));
