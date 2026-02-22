import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const FeedCard = (user) => {
  const dispatch = useDispatch();
  console.log(user.user);
  const { _id, Fname, Lname, age, gender, skills, photoURL, about } = user.user;

  const requestReview = async (status, _id) => {
    console.log(_id);

    try {
      const res = await axios.post(
        "http://localhost:3000/connectionRequest/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );

      dispatch(removeFeed(_id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && (
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
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => requestReview("ignored", _id)}
                  className="cursor-pointer flex-1 py-3 rounded-2xl text-sm font-semibold text-red-400
              border border-red-500/20 bg-red-500/10
              hover:bg-red-500/20 hover:border-red-500/40
              transition-all duration-200"
                >
                  ✕ Ignore
                </button>
                <button
                  onClick={() => requestReview("intrested", _id)}
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
      )}
    </>
  );
};

export default FeedCard;
