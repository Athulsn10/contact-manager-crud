import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./Header.css";
import axios from 'axios';
import { serverURL } from "../serverURL";

function Header() {
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${serverURL}/contact`, values)
      .then(res => {
        console.log(res);
        handleClose();
      })
      .catch(err => console.log(err));
      window.location.reload();
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Contact Manager</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              New Contact
              <Button onClick={handleShow} style={{ backgroundColor: 'transparent', border: 'none' }} type="button">
                <i className="fs-3 fa-solid fa-circle-plus" style={{ color: '#000000' }}></i>
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact Name</Form.Label>
              <Form.Control onChange={e => setValues({ ...values, name: e.target.value })} className='mb-3' type="text" placeholder="Enter Name" />
              <Form.Label>Phone Number</Form.Label>
              <Form.Control onChange={e => setValues({ ...values, phone: e.target.value })} className='mb-3' type="number" placeholder="Phone Number" maxLength="10" />
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={e => setValues({ ...values, email: e.target.value })} type="email" placeholder="Email" />
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
    </>
  );
}

export default Header;