import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Login/user'

const store=configureStore({
    reducer:{
        user:userReducer
    }
})
export default store