import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { serverURL } from "../serverURL.js";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";


function Home() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedContactIndex(null);
  };

  const handleShow = (index) => {
    setValues({ ...data[index] });
    setSelectedContactIndex(index);
    setShow(true);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (confirm) {
      // Make a DELETE request to delete the contact by its ID
      axios
        .delete(`${serverURL}/contact/${id}`)
        .then((res) => {
          console.log(res);
          // Remove the deleted contact from the data array
          const updatedData = data.filter((contact) => contact.id !== id);
          setData(updatedData);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (selectedContactIndex !== null) {
      // PUT request with the updated values
      axios
        .put(`${serverURL}/contact/${data[selectedContactIndex].id}`, values)
        .then((res) => {
          console.log(res);
          handleClose();
          const updatedData = [...data];
          updatedData[selectedContactIndex] = values;
          setData(updatedData);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    // Fetch contacts when the component mounts
    axios
      .get(`${serverURL}/contact`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="mt-5 mx-4">
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Contact Name</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
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
        <ListGroup className="w-100 d-flex flex-column">
    {data.map((contact, index) => (
      <ListGroup.Item className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            style={{ height: "40px", width: "auto" }}
            variant="top"
            className="img-fluid me-3"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Contacts_logo.png"
            alt="err"
          />
          <Link to={`/ContactDetails/${contact.id}`} className="btn">{contact.name}</Link>
        </div>
        <div className="d-flex">
          <Button
            onClick={() => handleDelete(contact.id)}
            style={{ backgroundColor: "transparent", border: "none" }}
            variant="success"
          >
            <i className="fs-4 fa-solid fa-trash-can" style={{ color: "#ff0000" }}></i>
          </Button>
          <Button
            onClick={() => handleShow(index)}
            style={{ backgroundColor: "transparent", border: "none" }}
            variant="success"
          >
            <i className="fs-4 fa-solid fa-pen-to-square" style={{ color: "#0008ff" }}></i>
          </Button>
        </div>
      </ListGroup.Item>
    ))}
  </ListGroup>
      </div>
    </>
  );
}

export default Home;
