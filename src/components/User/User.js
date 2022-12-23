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
// import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import "../../App.css";

function User() {
   const [users, setUsers] = useState([]);
   const [show, setShow] = useState(false);
   const navigate = useNavigate();

   var requestOptions = {
      method: "GET",
      redirect: "follow",
   };

   useEffect(() => {
      fetch(
         "https://pbl6.tuongnh.tech/clur/?page=2&num_per_page=3",
         requestOptions
      )
         .then((res) => res.json())
         .then((users) => {
            setUsers(users);
         })
         .catch((err) => console.log(err));
   }, []);

   // const handleClose = () => {
   //    setShow(false);
   // };
   // const handleShow = () => {
   //    setShow(true);
   //    if (editing === false) {
   //       setNewUser(initCurrentUser);
   //    }
   // };

   //    const onFormSubmit = (newUser) => {
   //       const id = users.length + 1;
   //       setUsers([...users, { ...newUser, id }]);
   //    };

   //    const onEdit = (newUser) => {
   //       setEdit(true);
   //       if (editing === true) {
   //          setNewUser({ ...newUser, newUser });
   //          handleShow();
   //       }
   //    };

   //    const onSubmit = (newUser) => {
   //       if (editing === true) {
   //          onUpdateUser(newUser);
   //       } else {
   //          onFormSubmit(newUser);
   //       }
   //    };

   //    const onUpdateUser = (newUser) => {
   //       setEdit(false);
   //       let id = newUser.id;
   //       setUsers(users.map((i) => (i.id === id ? newUser : i)));
   //    };

   //    const onDeleteUser = (currentUser) => {
   //       setUsers(users.filter((i) => i.id !== currentUser.id));
   //    };
   const handleLogout = () => {
      localStorage.removeItem("access_token");
      navigate("/");
   };

   return (
      <div>
         <div className="Menu">
            <header className="Menu-header">
               <h1 className="Menu-title">User</h1>
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
                                 <Button
                                    variant="primary"
                                    onClick={handleLogout}
                                    title=""
                                 >
                                    <MdLogout />
                                 </Button>
                              </div>
                           </div>
                           <Table striped bordered hover variant="dark">
                              <thead>
                                 <tr>
                                    <th>Created at</th>
                                    <th>Created by</th>
                                    <th>data</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {users.length > 0 ? (
                                    users.map((user, index) => (
                                       <tr key={index}>
                                          <td>
                                             {user.created_by.username},
                                             {user.created_by.email},
                                             {user.created_by.fullname},
                                             {user.created_by.role}
                                          </td>
                                          <td>{user.created_at} </td>
                                          <td>
                                             <Button
                                                onClick={() => {
                                                   navigate(
                                                      `/getinfo?userid=${user.created_by.email}&name=${user.created_by.username}`
                                                   );
                                                }}
                                             >
                                                <BiCommentDetail />
                                             </Button>
                                          </td>
                                       </tr>
                                    ))
                                 ) : (
                                    <tr>
                                       <td colSpan={6} className="text-center">
                                          No users found.
                                       </td>
                                    </tr>
                                 )}
                              </tbody>
                           </Table>
                        </Card.Body>
                     </Card>

                     <Modal size="lg" show={show}></Modal>
                  </Col>
               </Row>
            </Container>
         </div>
      </div>
   );
}

export default User;
