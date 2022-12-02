import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import {
   Button,
   Card,
   Col,
   Container,
   Form,
   Modal,
   Row,
   Table,
} from "react-bootstrap";
// import { Toggle } from "rsuite";
import Toggle from "rsuite/Toggle";
import "../Admin/menu.css";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";

function Menu() {
   const initCurrentUser = {
      id: null,
      username: "",
      email: "",
      fullname: "",
      role: "",
      password: "",
   };
   const [info] = useContext(UserContext);
   const [show, setShow] = useState(false);
   const [newUser, setNewUser] = useState(initCurrentUser);
   const [showCreateBtn, setShowCreateBtn] = useState(true);
   const [editing, setEdit] = useState(false);
   const [user, setUser] = useState({});

   const handleClose = () => {
      setShow(false);
   };
   const handleShow = () => {
      setShow(true);
      if (editing === false) {
         setNewUser(initCurrentUser);
      }
   };

   const onFormSubmit = (newUser) => {
      const id = user.length + 1;
      setUser([...user, { ...newUser, id }]);
   };

   const onEdit = (newUser) => {
      setEdit(true);
      if (editing === true) {
         setNewUser({ ...newUser, newUser });
         handleShow();
      }
   };

   const onSubmit = (newUser) => {
      if (editing === true) {
         onUpdateUser(newUser);
      } else {
         onFormSubmit(newUser);
      }
   };

   const onUpdateUser = (newUser) => {
      setEdit(false);
      let id = newUser.id;
      setUser(user.map((i) => (i.id === id ? newUser : i)));
   };

   const onDeleteUser = (currentUser) => {
      setUser(user.filter((i) => i.id !== currentUser.id));
   };
   return (
      <div className="Menu">
         <header className="Menu-header">
            <h1 className="Menu-title">User Management System</h1>
         </header>
         <Container fluid="md">
            <Row>
               <Col>
                  <Card className="customCard">
                     <Card.Body>
                        <div className="d-flex justify-content-between customCardBody">
                           <div>
                              <Card.Title>User Data</Card.Title>
                           </div>
                           <div className="d-flex">
                              <Toggle
                                 className="userToggleBtn"
                                 checked={showCreateBtn}
                                 onClick={(e) => {
                                    e.preventDefault();
                                    setShowCreateBtn(!showCreateBtn);
                                 }}
                              />
                              {showCreateBtn ? (
                                 <Button
                                    variant="primary"
                                    onClick={handleShow}
                                    title="Add User"
                                 >
                                    <FaPlus />
                                 </Button>
                              ) : (
                                 ""
                              )}
                           </div>
                        </div>
                        <Table striped bordered hover variant="dark">
                           <thead>
                              <tr>
                                 <th>#</th>
                                 <th>username</th>
                                 <th>email</th>
                                 <th>fullname</th>
                                 <th>role</th>
                                 <th>password</th>
                              </tr>
                           </thead>
                           <tbody>
                              {user.length > 0 ? (
                                 user.map((user, index) => (
                                    <tr key={index}>
                                       <td>{user.username}</td>
                                       <td>{user.email}</td>
                                       <td>{user.fullname}</td>
                                       <td>{user.role}</td>
                                       <td>{user.password}</td>

                                       <td>
                                          <Button
                                             variant="info"
                                             title="Edit user details"
                                             onClick={() => onEdit(user)}
                                          >
                                             <FaPencilAlt />
                                          </Button>{" "}
                                          <Button
                                             variant="danger"
                                             title="Delete user"
                                             onClick={() => onDeleteUser(user)}
                                          >
                                             <FaTrashAlt />
                                          </Button>
                                       </td>
                                    </tr>
                                 ))
                              ) : (
                                 <tr>
                                    <td colSpan={6} className="text-center">
                                       No user found.
                                    </td>
                                 </tr>
                              )}
                           </tbody>
                        </Table>
                     </Card.Body>
                  </Card>

                  <Modal size="lg" show={show} onHide={handleClose}>
                     <Form
                        onSubmit={(e) => {
                           e.preventDefault();
                           onSubmit(newUser);
                        }}
                     >
                        <Modal.Header closeButton>
                           {editing === true ? (
                              <Modal.Title>Edit User</Modal.Title>
                           ) : (
                              <Modal.Title>Add User</Modal.Title>
                           )}
                        </Modal.Header>
                        <Modal.Body>
                           <Form.Group
                              className="mb-3"
                              controlId="formBasicName"
                           >
                              <Form.Label>username</Form.Label>
                              <Form.Control
                                 type="text"
                                 value={newUser.username}
                                 required
                                 onChange={(e) =>
                                    setNewUser({
                                       ...newUser,
                                       username: e.target.value,
                                    })
                                 }
                                 placeholder="Enter Name"
                              />
                           </Form.Group>
                           <Form.Group
                              className="mb-3"
                              controlId="formBasicAddress"
                           >
                              <Form.Label>email</Form.Label>
                              <Form.Control
                                 type="text"
                                 value={newUser.email}
                                 onChange={(e) =>
                                    setNewUser({
                                       ...newUser,
                                       email: e.target.value,
                                    })
                                 }
                                 placeholder="Enter email"
                              />
                           </Form.Group>
                           <Form.Group
                              className="mb-3"
                              controlId="formBasicAge"
                           >
                              <Form.Label>fullname</Form.Label>
                              <Form.Control
                                 type="number"
                                 value={newUser.fullname}
                                 onChange={(e) =>
                                    setNewUser({
                                       ...newUser,
                                       fullname: e.target.value,
                                    })
                                 }
                                 placeholder="Enter fullname"
                              />
                           </Form.Group>
                           <Form.Group
                              className="mb-3"
                              controlId="formBasicProfession"
                           >
                              <Form.Label>role</Form.Label>
                              <Form.Control
                                 type="text"
                                 value={newUser.role}
                                 onChange={(e) =>
                                    setNewUser({
                                       ...newUser,
                                       role: e.target.value,
                                    })
                                 }
                                 placeholder="Enter role"
                              />
                           </Form.Group>
                           <Form.Group className="mb-3">
                              <Form.Label>password</Form.Label>
                              <Form.Control
                                 type="text"
                                 value={newUser?.password}
                                 onChange={(e) =>
                                    setNewUser({
                                       ...newUser,
                                       password: e.target.value,
                                    })
                                 }
                                 placeholder="Enter password"
                              />
                              {/* <Form.Select
                                 value={newUser.interestRate}
                                 onChange={(e) =>
                                    setNewUser({
                                       ...newUser,
                                       interestRate: e.target.value,
                                    })
                                 }
                              >
                                 <option value="">Select</option>
                                 {rates.length
                                    ? rates.map((val, index) => (
                                         <option key={index} value={val}>
                                            {val}
                                         </option>
                                      ))
                                    : null}
                              </Form.Select> */}
                           </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                           <Button variant="secondary" onClick={handleClose}>
                              Close
                           </Button>
                           {editing === true ? (
                              <Button
                                 variant="primary"
                                 type="submit"
                                 onClick={handleClose}
                              >
                                 Update
                              </Button>
                           ) : (
                              <Button
                                 variant="primary"
                                 disabled={!newUser.owner}
                                 type="submit"
                                 onClick={handleClose}
                              >
                                 Submit
                              </Button>
                           )}
                        </Modal.Footer>
                     </Form>
                  </Modal>
               </Col>
            </Row>
         </Container>
      </div>
   );
}

export default Menu;
