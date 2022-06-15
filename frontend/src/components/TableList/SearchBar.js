import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import UndoIcon from "@material-ui/icons/Undo";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Button,
  Input,
  Col,
  Row,
  FormGroup,
} from "reactstrap";

const service = [
  { id: "All", label: "All Types" },
  { id: "ask", label: "Requests" },
  { id: "offer", label: "Offers" },
];

const categories = [
  { id: "All", label: "All Categories" },
  { id: "Grocery Shopping", label: "Grocieries" },
  { id: "Child Care", label: "Child Care" },
  { id: "Elderly Care", label: "Elderly Care" },
  { id: "House And Garden", label: "House & Garden" },
  { id: "Pets And Animals", label: "Pets & Animals" },
];

const options = [
  { id: "price", label: "Price asc", order2: "asc" },
  { id: "price", label: "Price desc", order2: "desc" },
  { id: "date", label: "Date asc", order2: "asc" },
  { id: "date", label: "Date desc", order2: "desc" },
];

function Option(props) {
  const { headCell, order, orderBy, onRequestSort } = props;
  return (
    <DropdownItem
      key={headCell.id}
      sortDirection={orderBy === headCell.id ? order : false}
      direction={orderBy === headCell.id ? order : "asc"}
      onClick={onRequestSort}
    >
      {headCell.label}
    </DropdownItem>
  );
}

export default function SearchBar(props) {
  const {
    onChangeofferOrRequest,
    onChangeCategory,
    onChangeSearch,
    onChangeCity,
    onChangeFrom,
    onChangeTo,
    onFilterSearch,
    onReset,
    order,
    orderBy,
    onRequestSort,
    city,
    to,
    from,
    search,
  } = props;

  const [serviceType, setServiceType] = React.useState("Type");
  const [category, setCategory] = React.useState("Category");

  return (
    <>
      <Row>
        <Col md="1">
          <Row>
            <FormGroup>
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  role="button"
                  size="sm"
                  color=""
                  onClick={(e) => e.preventDefault()}
                >
                  <Button
                    color="primary"
                    style={{ width: "500%" }}
                    type="button"
                  >
                    {serviceType} <i className="ni ni-bold-down" />
                  </Button>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  {service.map(({ label, id }, index) => (
                    <DropdownItem
                      onClick={(e) => {
                        e.preventDefault();
                        onChangeofferOrRequest(id);
                        setServiceType(label);
                      }}
                    >
                      {label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </FormGroup>
          </Row>
        </Col>
        <Col md="1">
          <Row>
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                role="button"
                size="sm"
                color=""
                onClick={(e) => e.preventDefault()}
              >
                <Button color="primary" style={{ width: "500%" }} type="button">
                  {category} <i className="ni ni-bold-down" />
                </Button>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                {categories.map(({ label, id }, index) => (
                  <DropdownItem
                    onClick={(e) => {
                      e.preventDefault();
                      onChangeCategory(id);
                      setCategory(label);
                    }}
                  >
                    {label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Row>
        </Col>
        <Col md="1">
          <Row>
            <Input
              className="form-control-alternative"
              placeholder="filter city"
              onChange={onChangeCity}
              value={city}
            />
          </Row>
        </Col>
        <Col md="2">
          <Input
            placeholder="filter title and description"
            className="form-control-alternative"
            onChange={onChangeSearch}
            value={search}
          />
        </Col>
        <Col md="1">
          <Input
            className="form-control-alternative"
            placeholder="lowest price"
            onChange={onChangeFrom}
            type="number"
            value={from}
          />
        </Col>
        <Col md="1">
          <Input
            className="form-control-alternative"
            placeholder="highest price"
            onChange={onChangeTo}
            type="number"
            value={to}
          />
        </Col>
        <Col md="1" style={{ marginRight: "-3.5%" }}>
          <Button color="primary" onClick={onFilterSearch}>
            <SearchIcon />
          </Button>
        </Col>
        <Col md="1">
          <Button color="primary" onClick={onReset}>
            <UndoIcon />
          </Button>
        </Col>
        <Col md="1"></Col>
        <Col className="text-right" md="1">
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn-icon-only text-light"
              role="button"
              size="sm"
              color=""
              onClick={(e) => e.preventDefault()}
            >
              <Button color="primary" style={{ width: "500%" }} type="button">
                {orderBy}
                <span className="font-weight-light"> {order}</span>
                <i className="ni ni-bold-down" />
              </Button>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              {options.map((headCell, index) => (
                <Option
                  key={index}
                  order={order}
                  orderBy={orderBy}
                  headCell={headCell}
                  onRequestSort={() =>
                    onRequestSort(headCell.id, headCell.order2)
                  }
                />
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>
      </Row>
    </>
  );
}
