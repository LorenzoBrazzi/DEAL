import { Alert } from "reactstrap";
import React from "react";
export default function CustomizedAlert(props) {
  const { message, visible, onDismiss, formComponentActive } = props;

  return !formComponentActive ? (
    <Alert
      color={props.errors ? "danger" : "success"}
      isOpen={visible}
      toggle={onDismiss}
      fade={false}
    >
      <span className="alert-inner--text">
        <strong>{props.errors ? "Error!" : "Success!"}</strong> {message}
      </span>
    </Alert>
  ) : (
    <Alert
      color={props.errors ? "danger" : "success"}
      isOpen={visible}
      fade={false}
    >
      <span className="alert-inner--text">
        <strong>{props.errors ? "Error!" : "Success!"}</strong> {message}
      </span>
      <button
        color="primary"
        type="button"
        class="btn btn-outline-dark float-right"
        onClick={onDismiss}
      >
        Go To My Posts
      </button>
    </Alert>
  );
}
