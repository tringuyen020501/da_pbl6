import React, { useState, useEffect } from "react";
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
import Toggle from "rsuite/Toggle";
import "../../App.css";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

function Menu() {
   const initCurrentUser = useState({
      username: "",
      email: "",
      fullname: "",
      role: "",
      password: "",
   });

   const [show, setShow] = useState(false);
   const [newUser, setNewUser] = useState(initCurrentUser);
   const [showCreateBtn, setShowCreateBtn] = useState(true);
   const [editing, setEdit] = useState(false);
   const [users, setUsers] = useState({});
   const navigate = useNavigate();

   useEffect(() => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append(
         "Authorization",
         `bearer ${localStorage.getItem("access_token")}`
      );

      var requestOptionsGet = {
         method: "GET",
         headers: myHeaders,
         redirect: "follow",
      };
      fetch("https://pbl6.tuongnh.tech/user/", requestOptionsGet)
         .then((res) => res.json())
         .then((users) => {
            setUsers(users);
         })
         .catch((err) => console.log(err));
   }, []);

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
      const username = users.length + 1;
      setUsers([...users, { ...newUser, username }]);
   };

   const onEdit = (newUser) => {
      setEdit(true);
      setShow(true);
      setNewUser(newUser);
      // if (editing == true) {
      //    setNewUser({ ...newUser, newUser });
      //    handleShow();
      // }
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
      let username = newUser.username;
      setUsers(users.map((i) => (i.username === username ? newUser : i)));
   };

   const handleLogout = () => {
      localStorage.removeItem("access_token");
      navigate("/");
   };

   const onDeleteUser = (currentUser) => {
      setUsers((users) => {
         // return users.filter((i) => i.username !== currentUser.username);
         var urlencoded = new URLSearchParams();

         var requestOptionsDelete = {
            method: "DELETE",
            body: urlencoded,
            redirect: "follow",
         };

         fetch(
            `https://pbl6.tuongnh.tech/user/${users.username}`,
            requestOptionsDelete
         )
            .then((response) => {
               if (response.ok) {
                  return users.filter(
                     (i) => i.username !== currentUser.username
                  );
               }
               throw Error(response.status);
            })

            .then((result) => {
               console.log(result);
            })
            .catch((error) => {
               console.log("error", error);
            });
         return users.filter((i) => i.username !== currentUser.username);
      });
   };

   return (
      <div>
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
                                    <Button
                                       variant="primary"
                                       onClick={handleLogout}
                                       title=""
                                    >
                                       <MdLogout />
                                    </Button>
                                 )}
                              </div>
                           </div>
                           <Table striped bordered hover variant="dark">
                              <thead>
                                 <tr>
                                    <th>username</th>
                                    <th>email</th>
                                    <th>fullname</th>
                                    <th>role</th>
                                    {/* <th>password</th> */}
                                 </tr>
                              </thead>
                              <tbody>
                                 {users.length > 0 ? (
                                    users.map((user, index) => (
                                       <tr key={index}>
                                          <td>{user.username}</td>
                                          <td>{user.email}</td>
                                          <td>{user.fullname}</td>
                                          <td>{user.role}</td>

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
                                                onClick={() =>
                                                   onDeleteUser(user)
                                                }
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
                                 controlId="formBasicfullName"
                              >
                                 <Form.Label>fullname</Form.Label>
                                 <Form.Control
                                    type="text"
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
                                    value={newUser.password}
                                    onChange={(e) =>
                                       setNewUser({
                                          ...newUser,
                                          password: e.target.value,
                                       })
                                    }
                                    placeholder="Enter password"
                                 />
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
                                    disabled={!newUser.username}
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
      </div>
   );
}

export default Menu;
