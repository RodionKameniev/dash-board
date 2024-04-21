import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  name: "",
  logInName: "",
  logInPassWord: "",
  passWord1: "",
  passWord2: "",
  mail: "",
  card:"",
  cvv:"",
  status: 'idle',
  access: 'No access',
  User:{id: -1, userImg:null, sales: 0, orderTarget: 0, score: 0, transactions: 0, balance: 0, sub:{id: -1, name: "none", price: 0, taxes: 0}, role:{id: -1, name: "none", status: "none"}, userInfo:{id: -1, name: "none", passWord: "none", firstName: "none", secondName: "none", mail:{id: "none", name: "none"}, card:{id: "none", card:"none", cvv: "none"}}}
};

export const checkNameAsync = createAsyncThunk(
  'register',
  async (state) => {
    console.log(state);
    if(!state.name.includes(" ") && state.passWord1==state.passWord2 && state.name!="" && state.passWord1.length>=8 && state.card.length>=12 && state.cvv!="" && state.mail!=""){
      const response = await axios.post('http://localhost:8080/addUser', {
        name: state.name,
        password: state.passWord1,
        mail: state.mail,
        card: state.card,
        cvv: state.cvv
      });
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
    else{
      return null;
    }
  }
);
export const logInAsync = createAsyncThunk(
  'logIn',
  async (state) => {
      //console.log(state.logInName, state.logInPassWord);
      const response = await axios.post('http://localhost:8080/logIn', {
        name: state.logInName,
        password: state.logInPassWord
      });
      // The value we return becomes the `fulfilled` action payload
      return response.data;
  }
);

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    logOut: (state) =>{
      state.User={id: -1, userImg:null, sales: 0, orderTarget: 0, score: 0, transactions: 0, balance: 0, sub:{id: -1, name: "none", price: 0, taxes: 0}, role:{id: -1, name: "none", status: "none"}, userInfo:{id: -1, name: "none", passWord: "none", firstName: "none", secondName: "none", mail:{id: "none", name: "none"}, card:{id: "none", card:"none", cvv: "none"}}};
      state.access="No access";
      state.name="";
      state.passWord1="";
      state.passWord2="";
      state.mail="";
      state.logInName="";
      state.logInPassWord="";
      state.mail="";
      state.card="";
      state.cvv="";
      state.status="idle";
    },
    changeLogInName: (state, action) => {
      state.logInName=action.payload;
    },
    changeLogInPassWord: (state, action) => {
      state.logInPassWord=action.payload;
    },
    changeName: (state, action) => {
      state.name=action.payload;
    },
    changePassWord1: (state, action) => {
      state.passWord1=action.payload;
    },
    changePassWord2: (state, action) => {
      state.passWord2=action.payload;
    },
    changeMail: (state, action) => {
      state.mail=action.payload;
    },
    changeCvv: (state, action) => {
      state.cvv=action.payload;
    },
    changeCard: (state, action) => {
      state.card=action.payload;
    },
    setUser: (state, action) =>{
      state.User=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkNameAsync.pending, (state) => {
        console.log("loading");
        state.status = 'loading';
      })
      .addCase(checkNameAsync.fulfilled, (state, action) => {
        console.log("done");
        state.status = 'idle';
        if(action.payload=="Nick Name has been already used" || action.payload==null){
          if(action.payload=="Nick Name has been already used"){
            state.access="Nick Name has been already used";
          }
          else{
            state.access="Something is wrong";
          }
        }
        else{
          state.access="You have been registered."
        }
      })
      .addCase(checkNameAsync.rejected, (state, action) => {
        
        console.log(action.payload);
      })
      .addCase(logInAsync.pending, (state) => {
        console.log("loading");
        state.status = 'loading';
      })
      .addCase(logInAsync.fulfilled, (state, action) => {
        console.log("done");
        state.status = 'idle';
        console.log("Output:");
        //console.log(action.payload);
        if(action.payload.result==null){
          state.access="Wrong Input"
        }
        else{
          state.access=action.payload.result;
          state.User=action.payload.myUser;
        }
      })
      .addCase(logInAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  }
  
});
export const { setUser, logOut, changeLogInName, changeLogInPassWord, changeName, changePassWord1, changePassWord2, changeMail, changeCvv, changeCard } = registrationSlice.actions;
export const selectAccsess = (state) => {
  //console.log(state.registration);
  return state.registration.access;
}
export const selectLogInName = (state) => state.registration.logInName;
export const selectLogInPassWord = (state) => state.registration.logInPassWord;
export const selectName = (state) => state.registration.name;
export const selectPassWord1 = (state) => state.registration.passWord1;
export const selectPassWord2 = (state) => state.registration.passWord2;
export const selectMail = (state) => state.registration.mail;
export const selectCard = (state) => state.registration.card;
export const selectCvv = (state) => state.registration.cvv;

export const selectUser = (state) => state.registration.User;

export default registrationSlice.reducer;