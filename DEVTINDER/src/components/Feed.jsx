import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedUser = useSelector((state) => state.feed);

 
  

  // if(!feedUser){
  //   return <>LOADING..................</>
  // }

  const userFeed = async () => {
    try {
      const feed = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      });

     console.log(feed.data)
      dispatch(addFeed(feed.data.feed_user));
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    userFeed();
  }, []);

   if(!feedUser){
    return <> USER NOT FOUND.........</>
  }
 if(feedUser.length == 0){
  return <>no more data</>
 }

  if(feedUser){
    console.log(feedUser)
  }


  return <>{feedUser && <FeedCard user={feedUser[0]} />}</>;
};

export default Feed;
