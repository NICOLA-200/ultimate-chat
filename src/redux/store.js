import  {configureStore} from "@reduxjs/toolkit"
 
import  {userReducer}  from "./reducers/user.js"



export const  Store  =  configureStore ( {
     reducer: userReducer
})