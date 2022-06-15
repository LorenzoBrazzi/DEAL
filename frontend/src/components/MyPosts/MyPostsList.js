import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@material-ui/core";
import React from "react";
import Loading from "../Loading";
import FoldableCardRow from "./FoldableCardRow";
import { Col, Card, CardHeader, Row, CardBody, Container } from "reactstrap";
import Header from "components/Headers/Header.js";

const useStyles = makeStyles((theme) => ({
  textfield: {
    height: "auto",
    padding: "2rem",
    minHeight: 500,
  },
}));

function MyPostsList({
  posts,
  userId,
  navigateToDetailPage,
  updatePost,
  handleDelete,
  isCreator,
  updateOtherUser,
}) {
  const classes = useStyles();
  const [openPosts, setOpenPosts] = React.useState();
  const [matchedPosts, setMatchedPosts] = React.useState();
  const [paidPosts, sePaidPosts] = React.useState();
  const [donePosts, setDonePosts] = React.useState();
  const [evaluatedPosts, setEvaluatedPosts] = React.useState();
  React.useEffect(() => {
    if (!!posts) {
      setOpenPosts(posts.filter((post) => post.status === "open"));
      setMatchedPosts(posts.filter((post) => post.status === "matched"));
      sePaidPosts(posts.filter((post) => post.status === "paid"));
      setDonePosts(posts.filter((post) => post.status === "done"));
      setEvaluatedPosts(posts.filter((post) => post.status === "evaluated"));
    }
  }, [posts]);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">CURRENT</h2>
                  </div>
                </Row>
              </CardHeader>
              {!openPosts && !matchedPosts ? (
                <Loading />
              ) : (
                <CardBody>
                  <Grid container spacing={2} xs={12}>
                    <Grid item xs={12}>
                      <Typography className={classes.textfield} component="div">
                        <TableContainer>
                          <Table>
                            {openPosts.length === 0 &&
                              matchedPosts.length === 0 && (
                                <TableBody>
                                  <Typography>
                                    {" "}
                                    You don't have any posts yet.{" "}
                                  </Typography>
                                </TableBody>
                              )}
                            <TableBody>
                              {openPosts.map((post) => (
                                <FoldableCardRow
                                  post={post}
                                  userId={userId}
                                  navigateToDetailPage={navigateToDetailPage}
                                  updatePost={updatePost}
                                  handleDelete={handleDelete}
                                  isCreator={isCreator}
                                  updateOtherUser={updateOtherUser}
                                />
                              ))}
                              {matchedPosts.map((post) => (
                                <FoldableCardRow
                                  post={post}
                                  userId={userId}
                                  navigateToDetailPage={navigateToDetailPage}
                                  updatePost={updatePost}
                                  handleDelete={handleDelete}
                                  isCreator={isCreator}
                                  updateOtherUser={updateOtherUser}
                                />
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">PAST</h2>
                  </div>
                </Row>
              </CardHeader>
              {!paidPosts && !donePosts && !evaluatedPosts ? (
                <Loading />
              ) : (
                <CardBody>
                  <Grid item xs={12}>
                    <Typography className={classes.textfield} component="div">
                      <TableContainer>
                        <Table>
                          {paidPosts.length === 0 &&
                            donePosts.length === 0 &&
                            evaluatedPosts.length === 0 && (
                              <TableBody>
                                <Typography>
                                  {" "}
                                  You don't have any posts yet.{" "}
                                </Typography>
                              </TableBody>
                            )}
                          <TableBody>
                            {paidPosts.map((post) => (
                              <FoldableCardRow
                                post={post}
                                navigateToDetailPage={navigateToDetailPage}
                                updatePost={updatePost}
                                isCreator={isCreator}
                                updateOtherUser={updateOtherUser}
                              />
                            ))}
                            {donePosts.map((post) => (
                              <FoldableCardRow
                                post={post}
                                navigateToDetailPage={navigateToDetailPage}
                                updatePost={updatePost}
                                isCreator={isCreator}
                                updateOtherUser={updateOtherUser}
                              />
                            ))}
                            {evaluatedPosts.map((post) => (
                              <FoldableCardRow
                                post={post}
                                navigateToDetailPage={navigateToDetailPage}
                                updatePost={updatePost}
                                isCreator={isCreator}
                                updateOtherUser={updateOtherUser}
                              />
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Typography>
                  </Grid>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MyPostsList;
