import {combineReducers} from "@reduxjs/toolkit";
import authReducer from '../features/auth/store/authSlice.ts'
import classReducer from '../features/classroom/store/classSlice.ts'
import profileReducer from '../features/profile/store/profileSlice.ts'

const rootReducer = combineReducers({
    auth: authReducer,
    class: classReducer,
    profile: profileReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer