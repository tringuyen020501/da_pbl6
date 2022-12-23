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
import { BiCommentDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
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
