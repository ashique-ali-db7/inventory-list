import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { update_products } from "../../Redux/products/productsSlice";
import { update_status } from "../../Redux/status/statusSlice";
import "./Add.css";
function Add() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [number, setNumber] = useState(null);
  const [numRows, setNumRows] = useState(null);
  const [formValues, setFormValues] = useState([]);
  const formDatas = [];
  const numberOfItems = (e) => {
    let { value } = e.target;
    setNumber(value);
  };
  const numberSubmit = (e) => {
    e.preventDefault();

    setNumRows(number);
  };
  var indents = [];
  for (var i = 1; i <= numRows; i++) {
    indents.push(i);
  }

  const onSubmit = (data) => {
    let object = {};
    let count = 0;
    for (let key in data) {
      count++;
      if (count === 1) {
        object.code = data[key];
      } else if (count === 2) {
        object.name = data[key];
      } else {
        object.quantity = data[key];
        formDatas.push(object);

        object = {};
        count = 0;
      }
    }
    let length = formDatas.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        if (formDatas[i].code === formDatas[j].code) {
          formDatas[i].quantity =
            Number(formDatas[j].quantity) + Number(formDatas[i].quantity);
          formDatas.splice(j, 1);
          length--;
        }
      }
    }

    dispatch(
      update_products({
        products: formDatas,
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
        <Row>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                onChange={numberOfItems}
                placeholder="Skills"
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} xs={6}>
            <button
              onClick={numberSubmit}
              style={{
                border: "none",
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
        {indents.map((elements) => {
          let errorCode = elements + "code";

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
                    type="text"
                    {...register(elements + "name", { required: "Required" })}
                    placeholder="name"
                  />
                  {errors.code && (
                    <span className="error-message">{errors.name.message}</span>
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

export default Add;
