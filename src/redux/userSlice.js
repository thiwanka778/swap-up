import { createSlice } from '@reduxjs/toolkit';


const localUser=window.localStorage.getItem("user");

const initialState = {
  screen:window.innerWidth,
  userEmail:"thiwanka@gmail.com",
  user:localUser?JSON.parse(localUser):null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getScreenWidth: (state, action) => {
      state.screen = action.payload;
    },
    getUserEmail:(state,action)=>{
        state.userEmail=action.payload;
    },
    userLogin:(state,action)=>{
      state.user=action.payload;
      window.localStorage.setItem("user",JSON.stringify(state.user));
    },
    userLogout:(state,action)=>{
      state.user=null;
      window.localStorage.setItem("user",JSON.stringify(state.user));
    }
   
  },
});

export const { getScreenWidth ,getUserEmail,userLogin,userLogout } = userSlice.actions;
export default userSlice.reducer;
