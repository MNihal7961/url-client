import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyUrls from "../pages/MyUrls";
import Custom15 from "../pages/Custom15";

const Routers = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={currentUser ? <Home /> : <Login />} />
      <Route path="/login" element={currentUser ? <Home /> : <Login />} />
      <Route path="/signup" element={currentUser ? <Home /> : <Signup />} />
      <Route path="/urls" element={currentUser ? <MyUrls /> : <Login />} />
      <Route path="/custom" element={currentUser ? <Custom15 /> : <Login />} />
    </Routes>
  );
};

export default Routers;
