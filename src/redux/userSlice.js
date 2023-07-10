import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  screen:window.innerWidth,
  userEmail:"thiwanka@gmail.com",
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
    }
   
  },
});

export const { getScreenWidth ,getUserEmail } = userSlice.actions;
export default userSlice.reducer;
