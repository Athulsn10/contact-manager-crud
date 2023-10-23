import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Header.css";
import axios from "axios";
import { serverURL } from "../serverURL";
import Home from "./Home";

function Header() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${serverURL}/contact`, values)
      .then((res) => {
        console.log(res);
        handleClose();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
       <Navbar className="bg-body-tertiary justify-content-between">
      <p className="ms-4 fs-4 fw-bold">Contact Manager</p>
        <Row>
          <Col xs="auto">
          </Col>
          <Col xs="auto">
           <div className="me-4">
             <Navbar.Text>
                  New Contact
                </Navbar.Text>
               <Button
                      onClick={handleShow}
                      style={{ backgroundColor: "transparent", border: "none" }}
                      type="button"
                    >
                      <i
                        className="fs-3 fa-solid fa-circle-plus"
                        style={{ color: "#000000" }}
                      ></i>
                    </Button>
           </div>
          </Col>
        </Row>
    </Navbar>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact Name</Form.Label>
              <Form.Control
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                className="mb-3"
                type="text"
                placeholder="Enter Name"
              />
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                className="mb-3"
                type="number"
                placeholder="Phone Number"
                maxLength="10"
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                type="email"
                placeholder="Email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Home />
    </>
  );
}

export default Header;
