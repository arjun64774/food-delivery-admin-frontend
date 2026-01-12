import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Order from "./pages/Orders/Order"
import Edit from "./pages/Edit/Edit"

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const url = "https://food-delivery-backend-xsja.onrender.com";

  return (
    <>
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Order url={url} />} />
          <Route path="/edit/:id" element={<Edit url={url}/>}/>
        </Routes>
      </div>
    </div>
      
    </>
  )
}

export default App
