import "./App.css";
import { Routes, Route } from "react-router-dom";
import Converting from "./components/Users/Converting.js";
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading/Loading";


function App() {
   return (
      <div className="App">
         <Navbar/>
         <Routes>
            <Route path="/" element={<Converting />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/loading" element={<Loading/>}></Route>
         </Routes>
      </div>
   );
}

export default App;
