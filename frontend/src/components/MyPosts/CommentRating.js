import React from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      "& > * + *": {
        marginRight: theme.spacing(1),
      },
      alignItems: "center",
    },
  })
);

const CommentRating = ({ setRating, postId, isRated }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(5);

  const [hover, setHover] = React.useState(-1);

  const labels = {
    0.5: "0.5",
    1: "1",
    1.5: "1.5",
    2: "2",
    2.5: "2.5",
    3: "3",
    3.5: "3.5",
    4: "4",
    4.5: "4.5",
    5: "5",
  };

  return (
    <div className={classes.root}>
      <Rating
        name={`ratingPost${postId}`}
        value={value}
        precision={0.5}
        defaultValue={5}
        size="large"
        onChange={(event, newValue) => {
          setValue(newValue);
          setRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        readOnly={isRated}
      />
      {value !== null && (
        <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </div>
  );
};

export default CommentRating;
