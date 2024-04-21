import { createAsyncThunk, createSlice, isAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    adminStatus: "",
    UserList: [],
    EUser: {},
    UserStatus: "",
};

export const addAdminAsync = createAsyncThunk(
    'addAdmin',

    async (state) => {
        console.log(state);
        const response = await axios.post('http://localhost:8080/addAdmin', {
            adminId: state.AdminId,
            userId: state.UserId,
            action: "addAdmin"
        });
        return response.data;
    }
);

export const getAllUsersAsync = createAsyncThunk(
    'AllUsers',

    async (state) => {
        console.log(state);
        const response = await axios.get('http://localhost:8080/getAllUsers');
        return response.data;
    }
);

export const deleteUserAsync = createAsyncThunk(
    'deleteUser',

    async (state) => {
        console.log(state);
        const response = await axios.post('http://localhost:8080/deleteUser', `${state.id}`);
        return response.data;
    }
);

export const editUserAsync = createAsyncThunk(
    'editUser',

    async (state) => {
        console.log("state:");
        console.log(state);
        const response = await axios.post('http://localhost:8080/editUser', {
            id: state.Id,
            balance: state.Balance,
            userName: state.UserName,
            userImg: state.UserImg,
            sales: state.Sales,
            transactions: state.Transactions,
            score: state.Score,
            orderTarget: state.OrderTarget,
            firstName: state.FirstName,
            secondName: state.SecondName,
            password: state.Password,
            cardNumber: state.CardNumber,
            cardCVV: state.CardCVV,
            mail: state.Mail,
            roleName: state.RoleName,
            roleStatus: state.RoleStatus,
            subName: state.SubName,
            subPrice: state.SubPrice,
            subTaxes: state.SubTaxes,
        });
        return response.data;
    }
);

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminStatus: (state, action) => {
            state.adminStatus = action.payload;
        },
        setEUser: (state, action) => {
            state.EUser = action.payload;
        },
        setUserStatus: (state, action) => {
            state.UserStatus = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addAdminAsync.pending, (state) => {
                console.log("loading");
                state.status = 'loading';
            })
            .addCase(addAdminAsync.fulfilled, (state, action) => {
                console.log("done");
                console.log("Output:");
                console.log(action.payload);
                state.status = 'idle';
                if (action.payload == "Admin was added") {
                    state.adminStatus = "Admin was added";
                }
                else {
                    state.adminStatus = "Something went wrong";
                }
            })
            .addCase(getAllUsersAsync.pending, (state) => {
                console.log("loading");
                state.status = 'loading';
            })
            .addCase(getAllUsersAsync.fulfilled, (state, action) => {
                console.log("done");
                console.log("Output:");
                console.log(action.payload);
                state.UserList = action.payload;
            })
            .addCase(deleteUserAsync.pending, (state) => {
                console.log("loading");
                state.status = 'loading';
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                if (action.payload != "No such User") {
                    state.UserStatus = action.payload;
                }
                else {
                    state.UserStatus = action.payload;
                }
            })
            .addCase(editUserAsync.pending, (state) => {
                console.log("loading");
                state.status = 'loading';
            })
            .addCase(editUserAsync.fulfilled, (state, action) => {
                if (action.payload != "No such User") {
                    state.UserStatus = action.payload;
                }
                else {
                    state.UserStatus = action.payload;
                }
            });
    }
});

export const { setAdminStatus, setEUser, setUserStatus } = adminSlice.actions;
export const selectAdminStatus = (state) => state.admin.adminStatus;
export const selectUserList = (state) => state.admin.UserList;
export const selectEUser = (state) => state.admin.EUser;
export const selectUserStatus = (state) => state.admin.UserStatus;
export default adminSlice.reducer;