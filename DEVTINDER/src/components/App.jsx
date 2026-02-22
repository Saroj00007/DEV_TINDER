import "../App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Navbar from "./Navbar";
import Login from "./Login";
import Profile from "./Profile";
import Feed from "./Feed";
import Logout from "./Logout";
import EditProfile from "./EditProfile";
import Connection from "./Connection";
import Requests from "./Requests";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="feed" element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="profile">
              <Route index element={<Profile/>}/>
              <Route path="edit" element={<EditProfile/>} />
            </Route>
            <Route path="connection" element={<Connection/>} />
            <Route path="request" element={<Requests/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
