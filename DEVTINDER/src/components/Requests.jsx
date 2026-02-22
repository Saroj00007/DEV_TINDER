import React, { useEffect } from "react";
import axios, { Axios } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((state) => state.request);
  console.log(requestData);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/connectionRequest/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id))
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/request/received",
        { withCredentials: true }
      );

      dispatch(addRequest(res.data.connection_Request));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    requestData && (
      <div className="mx-14">
        <h1 className="text-3xl font-bold text-center text-gray-100 tracking-wide py-6 border-b border-white/10">
          REQUESTS
        </h1>
        {requestData.map((items) => {
          const { Fname, Lname, age, gender, about, photoURL } =
            items.fromUserid;

         const {_id} = items

          return (
            <>
              <div className="flex cursor-pointer items-center m-8 gap-4 px-6 py-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt={`${Fname} ${Lname}`}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-indigo-400/40 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-600/50 ring-2 ring-white/10 flex items-center justify-center group-hover:ring-indigo-400/40 transition-all duration-300">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                    </div>
                  )}
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#1a1a2e]" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[15px] font-semibold text-gray-100 tracking-tight">
                      {Fname} {Lname}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full hidden sm:inline
            ${gender === "Female" ? "bg-pink-500/10 text-pink-400 border border-pink-500/20" : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"}
          `}
                    >
                      {gender}
                    </span>
                    <span className="text-xs text-gray-500">{age} yrs</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{about}</p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => reviewRequest("rejected", _id)}
                    className="cursor-pointer px-4 py-2 text-sm font-semibold text-red-400 border border-red-500/20 rounded-xl
      bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => { return reviewRequest("accepted", _id)}}
                    className="cursor-pointer px-4 py-2 text-sm font-semibold text-white rounded-xl
      bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-200
      shadow-md shadow-indigo-500/20"
                  >
                    Accept
                  </button>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg
                    className="w-4 h-4 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </>
          );
        })}
      </div>
    )
  );
};

export default Requests;
