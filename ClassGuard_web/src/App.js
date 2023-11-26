import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ContextProivider } from "./Context/userContext";
import PageHome from "./components/PageHome/PageHome";
import PagePosts from "./components/PagePosts/PagePosts";
// import PagePersonal from "./components/PagePersonal/PagePersonal";
import PageContact from "./components/PageContact/PageContact";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";
import Dashboard from "./Admin/Dashboard/Dashboard";
import AlertAdmin from "./Admin/Alert/Alert"
import Camera from "./Admin/Camera/Camera";
function App() {
  return (
    <div className="App">
      <ContextProivider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PageHome />} />
          <Route path="/posts" element={<PagePosts />} />
          {/* <Route path="/Personal" element={<PagePersonal />} /> */}
          <Route path="/contact" element={<PageContact />} />
          {/* Admin */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/camera" element={<Camera />} />
          <Route path="/admin/alert" element={<AlertAdmin />} />
        </Routes>
      </ContextProivider>
    </div>
  );
}

export default App;
