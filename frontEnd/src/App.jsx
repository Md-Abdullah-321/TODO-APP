import { Route, Routes } from "react-router-dom";
import './App.css';
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Navbar from "./components/navigation/Navbar";
import Registration from "./components/registration/Registration";


const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="/registration" element = {<Registration/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App;