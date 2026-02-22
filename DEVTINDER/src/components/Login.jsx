import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailid, setemailid] = useState("");
  const [password, setpassword] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");

  const navigate = useNavigate();

  const [isLoggedIn, setisLoggedIn] = useState(false);

  const [error, seterror] = useState("");

  const dispatch = useDispatch();

  const handel_signup = async ()=>{
    try {
        const res = await axios.post("http://localhost:3000/signup" , {Fname , Lname , email : emailid , password} , {withCredentials: true})

        console.log(res)
        dispatch(addUser(res));
        navigate("/profile")
    } catch (error) {
         console.log(error)
    }
  }
  const handel_login = async () => {
    // this is the function whenever user click login button we will pust the data to server and get response using the prepared api

    try {
      const data = await axios.post(
        "http://localhost:3000/login",
        {
           emailid,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(data));

      navigate("/feed");
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <fieldset className="fieldset mx-[38%] bg-base-200 my-6 py-4 border-base-300 rounded-box w-xs border p-4">
      {!isLoggedIn && (
        <>
          <label className="label">First Name</label>
          <input
            onChange={(e) => {
              setFname(e.target.value);
            }}
            value={Fname}
            type="text"
            className="input"
            placeholder="Email"
          />

          <label className="label">Last Name</label>
          <input
            onChange={(e) => {
              setLname(e.target.value);
            }}
            value={Lname}
            type="email"
            className="input"
            placeholder="Email"
          />
        </>
      )}

      <label className="label">Email</label>
      <input
        onChange={(e) => {
          setemailid(e.target.value);
        }}
        value={emailid}
        type="email"
        className="input"
        placeholder="Email"
      />

      <label className="label">Password</label>
      <input
        onChange={(e) => {
          setpassword(e.target.value);
        }}
        value={password}
        type="password"
        className="input"
        placeholder="Password"
      />

      <p className="text-500 text-red-600">{error}</p>
      <button onClick={isLoggedIn ? handel_login : handel_signup} className="btn btn-neutral mt-4">

        {isLoggedIn ? "Login" : "Signup"}
    
      </button>
      <p onClick={()=>{
        setisLoggedIn(!isLoggedIn)
      }} className="cursor-pointer my-2">{isLoggedIn ? "New User? SignUp" : "Old User? Login"}</p>
    </fieldset>
  );
};

export default Login;
