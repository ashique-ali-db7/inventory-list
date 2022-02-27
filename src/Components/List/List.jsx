import React from "react";
import { Table } from "react-bootstrap";
import "./List.css";
import { useSelector } from "react-redux";

function List() {
  const data = useSelector((state) => state.products.products);
  return (
    <div className="list-container mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Code</th>
            <th>Product name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elements, i) => {
            return (
              <tr key={i + 1}>
                <td>{++i}</td>
                <td>{elements.code}</td>
                <td>{elements.name}</td>
                <td>{elements.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default List;
