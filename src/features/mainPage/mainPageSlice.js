import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    UserUpdated:{id: -1, userImg:null, sales: 0, orderTarget: 0, score: 0, transactions: 0, balance: 0, sub:{id: -1, name: "none", price: 0, taxes: 0}, role:{id: -1, name: "none", status: "none"}, userInfo:{id: -1, name: "none", passWord: "none", firstName: "none", secondName: "none", mail:{id: "none", name: "none"}, card:{id: "none", card:"none", cvv: "none"}}},
    status: "",
    updateStatus: "none"
};

export const updateUserDataAsync = createAsyncThunk(
  'updateUserData',
  async (state) => {
    console.log(state);
      const response = await axios.put('http://localhost:8080/User/userData', {
        id: state.id,
        name: state.name,
        userImg: state.userImg,
        firstName: state.firstName,
        secondName: state.secondName,
        mail: state.mail,
        card: state.card,
        cvv: state.cvv
      });

      return response.data;
  }
);

export const mainPageSlice = createSlice({
  name: 'myAccount',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(updateUserDataAsync.pending, (state)=>{
      console.log("loading");
      state.status = 'loading';
    })
    .addCase(updateUserDataAsync.fulfilled, (state, action)=>{
      console.log("done");
      console.log("Output:");
      console.log(action.payload);
      state.status = 'idle';
      if(action.payload!=null){
        state.UserUpdated=action.payload;
        state.updateStatus="updated";
      }
      else{
        state.updateStatus="Something went wrong";
      }
    })
  }
  
});

export const selectUserUpdated = (state) => state.myAccount.UserUpdated;


export default mainPageSlice.reducer;