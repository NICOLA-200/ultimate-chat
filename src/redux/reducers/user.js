    import { createReducer , createAction  } from "@reduxjs/toolkit";


    const initialState = {
        isAuthenticated: false,
    };

    const  userLogin =   createAction('userLogin')
    const  status =  createAction('status')
    const status1 = createAction('status1')


    export const userReducer = createReducer(initialState, (builder) =>  {
        builder
        .addCase(userLogin, (state, action) => {
            console.log("this is the payload: " + action.payload)
            console.log(action.payload.isAuth)
            state.isAuthenticated = action.payload.isAuth
            state.username = action.payload.username
            state.loading = false
            // state.user = action.payload
        } )
        .addCase(status,(state, action) => {
            console.log("the use: " +action.payload)
            state.mesStatus = action.payload
        })
        .addCase(status1,(state, action) => {
            console.log("the next: " +action.payload)
            state.status1 = action.payload
        })
        
    
    })