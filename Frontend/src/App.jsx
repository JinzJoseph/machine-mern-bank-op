import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import UserDetails from "./Components/UserDetails";
import AccountBalance from "./Components/AccountBalance";
import DashWelcome from "./Components/DashWelcome"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/userDetails" element={<UserDetails />} />
          <Route path="/home/account-balance" element={<AccountBalance />} />
          <Route path="/home/welcomepage" element={<DashWelcome/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
