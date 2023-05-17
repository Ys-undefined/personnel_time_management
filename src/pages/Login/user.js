import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:'user',
    initialState:{
        name:''
    },
    reducers:{
        change(state,action){
            state.name=action.payload
        }
    }
})