import React, { useEffect, useState } from "react";
import { serverURL } from "../serverURL.js";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";


function ContactDetails() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [show, setShow] = useState(false);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);
  const [data, setData] = useState({});
  const { id } = useParams();

  const handleClose = () => {
    setShow(false);
    setSelectedContactIndex(null);
  };

  const handleShow = (index) => {
    setValues({ ...data });
    setSelectedContactIndex(index);
    setShow(true);
  };

  useEffect(() => {
    // Fetch the specific contact by ID
    axios
      .get(`${serverURL}/contact/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);
   
  const handleDelete = (id) => {
    
    const confirm = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (confirm) {
      // DELETE request to delete the contact by its ID
      axios
        .delete(`${serverURL}/contact/${id}`)
        .then((res) => {
          console.log(res);
          //redirect to the home page
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (selectedContactIndex !== null) {
      // PUT request with the updated values
      axios
        .put(`${serverURL}/contact/${id}`, values)
        .then((res) => {
          console.log(res);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="mx-5">
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact Name</Form.Label>
              <Form.Control
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                value={values.name}
                className="mb-3"
                type="text"
                placeholder="Enter Name"
              />
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                value={values.phone}
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
                value={values.email}
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
          <Button onClick={handleUpdate} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="w-100 mt-3">
        <Link to="/">
          <i
            className="fs-2 fa-solid fa-arrow-left"
            style={{ color: "#000000" }}
          ></i>
        </Link>
      </div>
      <div className="container-fluid d-flex justify-content-center mt-5">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            className="img-fluid"
            variant="top"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Contacts_logo.png"
          />
          <Card.Body>
            <Card.Title className="fw-bold fs-3">{data.name}</Card.Title>
            <Card.Text>
              <h6 className="fw-bold">Phone: </h6> {data.phone}
              <h6 className="fw-bold">Email: </h6> {data.email}
            </Card.Text>
            <Button
              onClick={() => handleDelete(id)}
              style={{ backgroundColor: "transparent", border: "none" }}
              variant="success"
            >
              <i
                className="fs-4 fa-solid fa-trash-can"
                style={{ color: "#ff0000" }}
              ></i>
            </Button>
            <Button
              onClick={() => handleShow(data.id)}
              style={{ backgroundColor: "transparent", border: "none" }}
              variant="success"
            >
              <i
                className="fs-4 fa-solid fa-pen-to-square"
                style={{ color: "#0008ff" }}
              ></i>
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ContactDetails;
