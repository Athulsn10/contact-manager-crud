import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { serverURL } from "../serverURL.js";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function Home() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const notify = () => toast("Contact Deleted");
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
          notify();
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
      <div className="mx-4 mt-5">
      <ToastContainer
     position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"/>
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
        <ListGroup className="w-100 d-flex flex-column mt-5 " >
    {data.map((contact, index) => (
      <ListGroup.Item style={{ border: 'none' }} className="mb-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            style={{ height: "40px", width: "auto" }}
            variant="top"
            className="img-fluid me-3"
            src="data:image/png;base64,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"
            alt="err"
          />
          <Link to={`/ContactDetails/${contact.id}`} className="btn fw-bold">{contact.name}</Link>
        </div>
        <div className="d-flex">
          <Button
            onClick={() => handleDelete(contact.id)}
            style={{ backgroundColor: "transparent", border: "none" }}
            variant="success"
          >
            <i className="fs-4 fa-solid fa-trash-can" style={{ color: "#ff5c5c" }}></i>
          </Button>
          <Button
            onClick={() => handleShow(index)}
            style={{ backgroundColor: "transparent", border: "none" }}
            variant="success"
          >
            <i className="fs-4 fa-solid fa-pen-to-square" style={{ color: "#000000" }}></i>
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
