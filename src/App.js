import "./App.css";
import { Routes, Route } from "react-router-dom";
import Converting from "./components/Users/Converting.js";
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading/Loading";
import Processstepper from "./components/Stepper/Processstepper";
import { createContext, useState } from "react";
import Getinfo from "./components/Getinfo/Getinfo";

export const AppContext = createContext(null);
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
   return (
      <UserContext.Provider value={useState({})}>
         {children}
      </UserContext.Provider>
   );
};
const AppProvider = ({ children }) => {
   const [user, setUser] = useState(0);

   return (
      <AppContext.Provider value={[user, setUser]}>
         {children}
      </AppContext.Provider>
   );
};
function App() {
   return (
      <AppProvider>
         <UserProvider>
            <div className="App">
               <Navbar />
               <br />
               <Routes>
                  <Route path="/" element={<Processstepper />}></Route>
                  <Route path="/info" element={<Getinfo />}></Route>

                  <Route path="/Converting" element={<Converting />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route path="/loading" element={<Loading />}></Route>
               </Routes>
            </div>
         </UserProvider>
      </AppProvider>
   );
}

export default App;
