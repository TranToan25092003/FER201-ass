import Home from "./components/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/forms/login";
import Register from "./components/forms/register";
import Help from "./components/forms/help";
import Userprofile from "./components/userprofile";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/help" element={<Help />} />

        <Route path="/profile/:id" element={<Userprofile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
