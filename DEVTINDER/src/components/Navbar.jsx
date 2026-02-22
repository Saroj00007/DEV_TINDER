import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/CONSTANTS.JS";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handelLogout =async ()=>{
    try {
      await axios.post(BASE_URL+"/logout" , {} , {withCredentials : true});

      dispatch(removeUser());

      navigate('/login');

    } catch (error) {

    }
  }

  return (
    <div className="navbar bg-base-300 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">🧑‍💻DEVTINDER</a>
      </div>

      {userData && (
        <div className="flex items-center gap-2 mx-14">
          <div>HI, {userData.data.Fname}</div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userData.data.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>

                <Link to='/profile' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/setting">Settings</Link>
              </li>
              <li>
                <Link to="/feed">Feed</Link>
              </li>
              <li>
                <Link to="/connection">Connection</Link>
              </li>
              <li>
                <Link to="/request">requests</Link>
              </li>
              <li>
                <a onClick={handelLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
