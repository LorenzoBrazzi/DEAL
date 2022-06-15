import React from "react";
import { Button, Modal } from "reactstrap";

function ErrorMessage({ message, error, retry }) {
  const [state, setState] = React.useState({
    defaultModal: true,
  });
  const toggleModal = () => {
    setState({ defaultModal: !state["defaultModal"] });
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered modal-danger"
        contentClassName="bg-gradient-danger"
        isOpen={state.defaultModal}
        toggle={() => toggleModal()}
      >
        <div className="modal-header">
          <h4 className="modal-title" id="modal-title-notification">
            Error Occurs!
          </h4>
        </div>
        <div className="modal-body">
          <div className="py-3 text-center">
            <i className="ni ni-bell-55 ni-3x" />
            <h1 className="heading mt-4">{error}</h1>
            <p>
              {!retry
                ? `${message} \n Please try it again after refreshing the page.`
                : `${message} \n Please try again by clicking on "Retry" button.`}
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            className="btn-white"
            color="default"
            type="button"
            onClick={() => {
              if (retry) {
                retry();
              } else {
                toggleModal();
                window.location.reload();
              }
            }}
          >
            {!retry ? "Refresh" : "Retry"}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ErrorMessage;
