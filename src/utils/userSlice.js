import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:[]
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser:(state,actions)=>{
        state.user=[actions.payload];
    },
    removeUser:(state)=>{
        state.user=[];
    },
  }
});

export const {addUser,removeUser} = userSlice.actions

export default userSlice.reducer