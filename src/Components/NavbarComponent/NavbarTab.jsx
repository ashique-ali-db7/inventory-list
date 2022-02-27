import React from "react";
import "./NavbarTab.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { update_status } from "../../Redux/status/statusSlice";

function NavbarTab() {
  const dispatch = useDispatch();
  const currentStatus = (e) => {
    if (e.target.innerHTML === "Add") {
      let value = e.target.innerHTML;
      dispatch(
        update_status({
          status: value,
        })
      );
    } else if (e.target.innerHTML === "Remove") {
      let value = e.target.innerHTML;
      dispatch(
        update_status({
          status: value,
        })
      );
    } else if (e.target.innerHTML === "List") {
      let value = e.target.innerHTML;
      dispatch(
        update_status({
          status: value,
        })
      );
    }
  };
  return (
    <div className="home-container">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Inventory</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={currentStatus}>Add</Nav.Link>
            <Nav.Link onClick={currentStatus}>Remove</Nav.Link>
            <Nav.Link onClick={currentStatus}>List</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarTab;
