import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Navigate } from "react-router-dom";


const Body = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

const userdata = useSelector((state)=> state.user) // not necessary though coz using link can solve the problem

  const fetchUser = async () => {
    if(!userdata){
    try {
      const userData = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });
     
      dispatch(addUser(userData));   
    
    } catch (error) {
      navigate('/login')
         
    }
  }
  };

  useEffect(()=>{
    fetchUser()
  } , [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
