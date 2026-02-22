import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";

const Profile = () => {
  
 
  const userData = useSelector((state) => state.user);
  
  if(!userData){
    return <>LOADING.........</>
  }

  const {Fname , Lname , age , gender , photoURL , skills , about} = userData?.data
      
  return (
    <div className="my=-16 flex justify-center items-center min-h-screen bg-[#0f0f1a]">
          <div className="w-96 p-4 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/40">
            {/* Photo */}
            <div className="relative  h-72 w-full">
              <img
                src={photoURL}
                alt={`${Fname} ${Lname}`}
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
                  {Fname} {Lname}
                </h2>
                <span className="text-sm text-gray-400 mb-0.5">{age} yrs</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mt-2">
                {about}
              </p>

              {/* Buttons */}
               <Link to={"/profile/edit"} >
              <div className="flex justify-center gap-3 mt-6">
               
                <button
                  className="flex-1 cursor-pointer  py-3 rounded-2xl text-sm font-semibold text-white
              bg-indigo-600 hover:bg-indigo-500
              shadow-lg shadow-indigo-500/25
              hover:-translate-y-0.5
              transition-all duration-200"
                >
                  Edit Profile
                </button>
               
              </div> </Link>
            </div>
          </div>
        </div>
  );
};

export default Profile;
