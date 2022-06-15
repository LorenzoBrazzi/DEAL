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
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
} from "reactstrap";
import { TablePagination } from "@material-ui/core";
import Header from "components/Headers/Header.js";
import PostListRow from "./PostListRow";
import SearchBar from "./SearchBar";

//The following three functions are used for sorting the table based on the chosen attribute and direction
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const PostListComponent = (props) => {
  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("asc");
  const onRequestSort = (cellId, order2) => {
    setOrder(order2);
    setOrderBy(cellId);
  };

  //Hooks used for pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Hooks for Filtering in the search bar
  const [from, setFrom] = React.useState(Number.NEGATIVE_INFINITY);
  const [to, setTo] = React.useState(Number.POSITIVE_INFINITY);
  const [rows2, setRows2] = React.useState(props.posts);
  const [offerOrRequest, setofferOrRequest] = React.useState("All");
  const [category, setCategory] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const [city, setCity] = React.useState("");

  const onChangeFrom = (event) => {
    let value = event.target.value;
    setFrom(value);
  };
  const onChangeTo = (event) => {
    setTo(event.target.value);
  };
  const onReset = () => {
    setRows2(props.posts);
    resetValues();
  };

  const onChangeofferOrRequest = (value) => {
    setofferOrRequest(value);
  };
  const onChangeCategory = (value) => {
    setCategory(value);
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  const onChangeCity = (event) => {
    setCity(event.target.value);
  };

  const onFilterSearch = (event) => {
    let rows3 = props.posts;
    console.log(rows3);
    if (category !== "All") {
      rows3 = rows3.filter((item) => item.category === category);
    }
    if (offerOrRequest !== "All") {
      rows3 = rows3.filter((item) => item.offerOrRequest === offerOrRequest);
    }
    if (search !== "") {
      rows3 = rows3.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (city !== "") {
      rows3 = rows3.filter(
        (item) => item.town.toLowerCase() === city.toLowerCase()
      );
    }
    var from2 = from;
    var to2 = to;
    if (from === "") {
      from2 = Number.NEGATIVE_INFINITY;
      setFrom(Number.NEGATIVE_INFINITY);
    }
    if (to === "") {
      to2 = Number.POSITIVE_INFINITY;
      setTo(Number.POSITIVE_INFINITY);
    }
    rows3 = rows3.filter((item) => item.price >= from2 && item.price <= to2);
    setRows2(rows3);
  };

  const resetValues = () => {
    setFrom(Number.NEGATIVE_INFINITY);
    setTo(Number.POSITIVE_INFINITY);
    setofferOrRequest("All");
    setCategory("All");
    setSearch("");
    setCity("");
  };

  useEffect(() => {
    setRows2(props.posts);
  }, [props.posts]);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <SearchBar
                  onChangeofferOrRequest={onChangeofferOrRequest}
                  onChangeCategory={onChangeCategory}
                  onChangeSearch={onChangeSearch}
                  onChangeCity={onChangeCity}
                  onChangeFrom={onChangeFrom}
                  onChangeTo={onChangeTo}
                  onFilterSearch={onFilterSearch}
                  onReset={onReset}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={onRequestSort}
                  city={city}
                  to={to}
                  from={from}
                  search={search}
                />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">User</th>
                    <th scope="col">Address</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                    <th scope="col">Price</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {stableSort(rows2, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((post, index) => {
                      return (
                        <PostListRow
                          post={post}
                          onClickDisplayPost={props.onClickDisplayPost}
                        ></PostListRow>
                      );
                    })}
                  {rows2.length <= 0 && (
                    <p className="mb-0">
                      There are no posts matching your search. Please try a
                      different combination of Inputs or reset the filters
                    </p>
                  )}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={rows2.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                  />
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default connect()(withRouter(PostListComponent));
