
import { useNavigate } from "react-router-dom";
import { HTTP } from "../../server";
import axios from "axios";


export  const getUserAuth  = (username , password) => async (dispatch) => {
   
  console.log("data gootten: " + username , password)

 try {
  const { data } = await axios.post(`${HTTP}/auth/login`,{username , password}, {
   withCredentials: true ,
 });
 console.log(data)
  
 if (data =="wrong password or username!") {
  console.log("somethe")
  dispatch({
    type: "status1",
    payload: data
  })
 } else {
  console.log(data.details)
  
  dispatch({
    type: "userLogin",
    payload: { username : data?.details?.username , isAuth : true }
  
   })
   useNavigate("/Profile")
  }
 } catch (err) 
 {
    console.log(err)
 }
} 

export const  currentUser = () => async (dispatch) => {
   console.log("something happened")

 const { data } = await axios.get(`${HTTP}/user/currentUser`, {
  withCredentials: true ,
 })

 console.log(data)

 dispatch({
  type: "userLogin",
  payload:  { username : data?.details?.username , isAuth : true }

 })
 
}

export const  signUp = (info) => async (dispatch) => {
  console.log("something happened  in the sign up")


    const { data } = await axios.post(`${HTTP}/auth/register`,{...info},{
      withCredentials: true ,
     })
     console.log("this is the data: " +  data)
     
      dispatch({
        type: "status",
        payload: data 
       })
       

  }

