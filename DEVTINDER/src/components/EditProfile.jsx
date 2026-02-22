import axios from "axios";
import React, { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  //  const photo = "https://imgs.search.brave.com/iaFtLfD1lXGi1YrTNCJVZzOhgRyAa3dx48GjTlHWYkU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMjA1NjI5/Ny83MzMzL2kvNDUw/L2RlcG9zaXRwaG90/b3NfNzMzMzE3MTUt/c3RvY2stcGhvdG8t/aGFuZHNvbWUtbWFu/LmpwZw"

  const userData = useSelector((state) => state.user.data);

  const [Firstname, setFirstname] = useState(userData.Fname);
  const [Lastname, setLastname] = useState(userData.Lname);
  const [age, setage] = useState(userData.age);
  const [gender, setgender] = useState(userData.gender);
  const [photo, setphoto] = useState(userData.photoURL);
  const [about , setabout] = useState(userData.about)

  const dispatch = useDispatch()
  

  const Profileedit = async () => {
    try {
      const res = await axios.patch("http://localhost:3000/profile/edit", {
        Fname: Firstname,
        Lname: Lastname,
        age : age,
        gender : gender , 
        photoURL : photo,
        about
      } , 
    {withCredentials : true}
);
  dispatch(addUser(res))

    } catch (error) {
        console.log(error)
    }
  };

  return (
    <>
      <div className="flex justify-between mx-84 items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">EDIT PROFILE</legend>

          <label className="label">Fitst Name</label>
          <input
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            type="text"
            className="input"
            value={Firstname}
          />

          <label className="label">Last Name</label>
          <input
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            type="text"
            className="input"
            value={Lastname}
          />

          <label className="label">Age</label>
          <input
            onChange={(e) => {
              setage(e.target.value);
            }}
            type="number"
            className="input"
            placeholder="Password"
            value={age}
          />

          <label className="label">About</label>
          <input
            onChange={(e) => {
              setabout(e.target.value);
            }}
            type="text"
            className="input"
            value={about}
          />
          <label className="label">photo URL</label>
          <input
            onChange={(e) => {
              setphoto(e.target.value);
            }}
            type="text"
            className="input"
            value={photo}
          />

          <button onClick={Profileedit} className="btn btn-neutral mt-4">save Changes</button>
        </fieldset>

          
          <div className="w-82 my-6 p-4 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/40">
            {/* Photo */}
            <div className="relative  h-72 w-full">
              <img
                src={photo}
                alt={`${Firstname} ${Lastname}`}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent" />

              {/* Gender badge */}
              <span
                className={`absolute top-4 right-4 text-sm font-bold px-4 py-1.5 rounded-full backdrop-blur-md
                              ${
                                gender === "Female"
                                  ? "bg-pink-500/30 text-pink-300 border border-pink-400/50 shadow-lg shadow-pink-500/20"
                                  : "bg-indigo-500/30 text-indigo-100 border border-indigo-400/50 shadow-lg shadow-indigo-500/20"
                              }`}
              >
                {gender}
              </span>
            </div>

            {/* Info */}
            <div className="px-6 py-5">
              <div className="flex items-end justify-between mb-1">
                <h2 className="text-2xl font-bold text-gray-100 tracking-tight">
                  {Firstname} {Lastname}
                </h2>
                <span className="text-sm text-gray-400 mb-0.5">{age} yrs</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mt-2">
                {about}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                 
                  className="cursor-pointer flex-1 py-3 rounded-2xl text-sm font-semibold text-red-400
              border border-red-500/20 bg-red-500/10
              hover:bg-red-500/20 hover:border-red-500/40
              transition-all duration-200"
                >
                  ✕ Ignore
                </button>
                <button
                  
                  className="flex-1 cursor-pointer  py-3 rounded-2xl text-sm font-semibold text-white
              bg-indigo-600 hover:bg-indigo-500
              shadow-lg shadow-indigo-500/25
              hover:-translate-y-0.5
              transition-all duration-200"
                >
                  ♥ Interested
                </button>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default EditProfile;
