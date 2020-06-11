import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditBoardItem({ isOpen, closeModal, selectedItem }) {
  console.log('selected', selectedItem)
  return (
    <Modal
      show={isOpen}
      onHide={closeModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows="4"
              placeholder="Description"
              name="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Form.Control>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
