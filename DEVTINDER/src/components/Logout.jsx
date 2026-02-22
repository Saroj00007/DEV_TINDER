import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice';

const Logout = () => {
  
    const userData = useSelector((state)=> state.user);
    const dispatch = useDispatch()

    const removeUser = async ()=>{
        try {
            await axios.post("http://localhost:3000/logout")
          
            dispatch(removeUser())
        
           
        } catch (error) {
        }
    }

    removeUser()


 

  return (
    <div>Logout</div>
  )
}

export default Logout