import React from "react";
import NavbarTab from "../Components/NavbarComponent/NavbarTab";
import { useSelector, useDispatch } from "react-redux";
import Add from "../Components/Add/Add";
import Remove from "../Components/Remove/Remove";
import List from "../Components/List/List";
import { Container } from "react-bootstrap";
function Home() {
  const data = useSelector((state) => state.status);
  console.log(data.status);
  if (data.status === "null") {
    console.log("null");
    return (
      <div>
        <NavbarTab />
      </div>
    );
  } else if (data.status === "Add") {
    console.log("add");
    return (
      <div>
        <NavbarTab />
        <Container>
        <Add />
        </Container>
      </div>
    );
  } else if (data.status === "Remove") {
    console.log("remove");
    return (
      <div>
        <NavbarTab />
        <Container>
        <Remove />
        </Container>
      </div>
    );
  } else if (data.status === "List") {
    console.log("List");
    return (
      <div>
        <NavbarTab />
        <Container>
        <List />
        </Container>
      </div>
    );
  }
}

export default Home;
