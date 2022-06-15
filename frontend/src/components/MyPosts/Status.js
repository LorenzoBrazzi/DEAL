import { Typography } from "@material-ui/core";
import React from "react";

const Status = ({ offerOrRequest, status, isCreator }) => {
  return (
    <div>
      {status === "open" && (
        <Typography
          variant="caption"
          display="block"
          style={{ color: isCreator ? "red" : "green" }}
        >
          {isCreator ? "Unfold to handle requests" : "Wating for answer"}
        </Typography>
      )}
      {status === "matched" && (
        <Typography
          variant="caption"
          display="block"
          style={{
            color:
              (isCreator && offerOrRequest === "ask") ||
              (!isCreator && offerOrRequest === "offer")
                ? "red"
                : "green",
          }}
        >
          {(isCreator && offerOrRequest === "ask") ||
          (!isCreator && offerOrRequest === "offer")
            ? "Open the folder to start payment"
            : "Wating for payment"}
        </Typography>
      )}
      {status === "paid" && (
        <Typography
          variant="caption"
          display="block"
          style={{ color: isCreator ? "red" : "green" }}
        >
          {isCreator
            ? "Unfold to see helping progress"
            : "Wating for confirmation"}
        </Typography>
      )}
      {status === "done" && (
        <Typography
          variant="caption"
          display="block"
          style={{ color: "green" }}
        >
          Wirte a comment and rate the other
        </Typography>
      )}
      {status === "evaluated" && (
        <Typography
          variant="caption"
          display="block"
          style={{ color: "green" }}
        >
          Thank you for your review!
        </Typography>
      )}
    </div>
  );
};

export default Status;
