import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { update_products } from "../../Redux/products/productsSlice";
import "./Remove.css";
import { update_status } from "../../Redux/status/statusSlice";
function Remove() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [numRows, setNumRows] = useState(null);
  const [number, setNumber] = useState(null);
  const formDatas = [];
  let items = [];
  let testArray = [];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const numberSubmit = (e) => {
    e.preventDefault();
    setNumRows(number);
  };
  const numberOfItems = (e) => {
    let { value } = e.target;
    setNumber(value);
  };
  for (var i = 1; i <= numRows; i++) {
    items.push(i);
  }
  const onSubmit = (data) => {
    let count = 0;
    let object = {};
    for (let key in data) {
      count++;

      if (count === 1) {
        object.code = data[key];
      } else if (count === 2) {
        object.quantity = data[key];
        count = 0;
        formDatas.push(object);
        object = {};
      }
    }
    let productsLength = products.length;
    let removeLength = formDatas.length;
    let testObject = {};
    let result;
    let flag = false;
    for (let i = 0; i < productsLength; i++) {
      for (let j = 0; j < removeLength; j++) {
        if (products[i].code === formDatas[j].code) {
          flag = true;

          result = products[i].quantity - formDatas[j].quantity;
          if (result < 0) {
            result = 0;
          }
          testObject.code = products[i].code;
          testObject.name = products[i].name;
          testObject.quantity = result;
        }
      }

      if (flag) {
        testArray.push(testObject);
        testObject = {};
        flag = false;
      } else {
        testObject.code = products[i].code;
        testObject.name = products[i].name;
        testObject.quantity = products[i].quantity;

        testArray.push(testObject);
        testObject = {};
      }
    }

    dispatch(
      update_products({
        products: testArray,
      })
    );
    dispatch(
      update_status({
        status: "List",
      })
    );
  };

  return (
    <div className="add-container me-auto ms-auto mt-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="heading1">
          <h1>Remove</h1>
        </div>
        <Row>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                onChange={numberOfItems}
                placeholder="Enter number"
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} xs={6}>
            <button
              onClick={numberSubmit}
              style={{
                backgroundColor: "white",
                marginTop: "0px",
                padding: "2%",
                width: "35px",

                border: "1px solid grey",
              }}
            >
              +
            </button>
          </Col>
        </Row>
        {items.map((elements) => {
          return (
            <Row key={elements}>
              <Col lg={4} md={4} xs={4}>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="number"
                    {...register(elements + "code", { required: "Required" })}
                    placeholder="code"
                  />
                  {errors.errorCode && (
                    <span className="error-message">
                      {errors.errorCode.message}
                    </span>
                  )}
                </Form.Group>
              </Col>

              <Col lg={4} md={4} xs={4}>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="number"
                    {...register(elements + "quantity", {
                      required: "Required",
                    })}
                    placeholder="quantity"
                  />
                  {errors.code && (
                    <span className="error-message">
                      {errors.quantity.message}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>
          );
        })}
        {numRows && (
          <Button
            variant="primary"
            className="submit-btn"
            size="lg"
            type="submit"
          >
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
}

export default Remove;
