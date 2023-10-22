import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { serverURL } from "../serverURL.js";

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
    const confirm = window.confirm("Are you sure you want to delete this contact?");
    if (confirm) {
      // Make a DELETE request to delete the contact by its ID
      axios.delete(`${serverURL}/contact/${id}`)
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
      // PUT request
      const updatedData = [...data];
      updatedData[selectedContactIndex] = values;

      axios.put(`${serverURL}/contact/${updatedData[selectedContactIndex].id}`, values)
        .then((res) => {
          console.log(res);
          handleClose();
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
      <div className="mt-5 mx-5 d-flex">
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
                  onChange={(e) => setValues({ ...values, phone: e.target.value })}
                  value={values.phone}
                  className="mb-3"
                  type="number"
                  placeholder="Phone Number"
                  maxLength="10"
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
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

        {data.map((contact, index) => (
          <Card className="me-4" key={contact.id} style={{ width: "15rem", height: "fit-content" }}>
            <Card.Img
              style={{ height: "200px", width: "200px" }}
              variant="top"
              className="ms-3"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Contacts_logo.png"
            />
            <Card.Body>
              <Card.Title>{contact.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <h6 className="fw-bold">Phone Number</h6> {contact.phone}
              </ListGroup.Item>
              <ListGroup.Item>
                <h6 className="fw-bold">Email</h6> {contact.email}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button
                 onClick={() => handleDelete(contact.id)}
                style={{ backgroundColor: "transparent", border: "none" }}
                variant="success"
              ><i className="fs-4 fa-solid fa-trash-can" style={{ color: "#ff0000" }}></i>
              </Button>
              <Button
                onClick={() => handleShow(index)}
                style={{ backgroundColor: "transparent", border: "none" }}
                variant="success"
              > <i className="fs-4 fa-solid fa-pen-to-square" style={{ color: "#0008ff" }}></i>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Home;
