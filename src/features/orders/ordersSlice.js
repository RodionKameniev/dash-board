import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  Product: { id: -1 },
  status: "idle",
  OrderStatus: "",
  PaymentId: -1,
  OrdersList: [],
  OrdersBuyerList: [],
  OrdersSellerList: [],
  OrderToDelete:{id:-1},
  delStatus:"",
};

export const addOrderAsync = createAsyncThunk(
  'addOrder',
  async (state) => {
    console.log(state);
    const response = await axios.post('http://localhost:8080/Orders/addOrders', {
      buyerId: state.BuyerId,
      paymentPrice: state.Price,
      paymentStatus: state.Status,
      productId: state.ProductId,
    });
    return response.data;
  }
);
export const getAllSellerOrdersAsync = createAsyncThunk(
  'getAllSellerOrders',
  async (state) => {
    console.log(state.id);
    const response = await axios.post('http://localhost:8080/Orders/getMySellerOrders',
    {
      txId: state.id
    });

    return response.data;
  }
)
export const getAllBuyerOrdersAsync = createAsyncThunk(
  'getAllBuyerOrders',
  async (state) => {
    console.log(state.id);
    const response = await axios.post('http://localhost:8080/Orders/getMyBuyerOrders', {
      txId: state.id
    });
    
    return response.data;
  }
)
// export const deleteOrderAsync = createAsyncThunk(
//   'deleteOrders',
//   async (state) => {
//     console.log(state.id);
//     const response = await axios.delete('http://localhost:8080/Orders/deleteOrders',{}, {
//       txId: state.id
//     });
    
//     return response.data;
//   }
// )

export const deleteOrderAsync = createAsyncThunk(
  'deleteOrders',
  async (state) => {
    console.log(state.id);
    const response = await axios.post('http://localhost:8080/Orders/deleteOrders',  `${state.id}`);
    
    return response.data;
  }
)

// export const getAllProductsAsync = createAsyncThunk(
//   'getAllProducts',
//   async (state) => {
//     console.log(state);
//       const response = await axios.get('http://localhost:8080/Product/getAllProduct', {
//       });

//       return response.data;
//   }
// );

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.Product = action.payload;
    },
    setOrderStatus: (state, action) => {
      state.OrderStatus = action.payload;
    },
    makeAnOrderList: (state)=>{
      state.OrdersList=[];
      state.OrdersBuyerList.map((item)=>{
        state.OrdersList.push(item);
      });
      state.OrdersSellerList.map((item)=>{
        state.OrdersList.push(item);
      });
    },
    setOrderToDelete: (state, action)=>{
      state.OrderToDelete=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        console.log("loading");
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        console.log("done");
        console.log("Output:");
        console.log(action.payload);
        state.status = 'idle';
        if (action.payload == "Orders was added") {
          state.OrderStatus = "Orders was added";
        }
        else {
          state.OrderStatus = "Something went wrong";
        }
      })
      .addCase(getAllSellerOrdersAsync.pending, (state) => {
        console.log("loading");
        state.status = 'loading';
      })
      .addCase(getAllSellerOrdersAsync.fulfilled, (state, action) => {
        console.log("done");
        console.log("Output:");
        console.log(action.payload);
        state.status = 'idle';
        if (action.payload != null) {
          state.OrdersSellerList=action.payload;
        }
      })
      .addCase(getAllBuyerOrdersAsync.pending, (state) => {
        console.log("loading");
        state.status = 'loading';
      })
      .addCase(getAllBuyerOrdersAsync.fulfilled, (state, action) => {
        console.log("done");
        console.log("Output:");
        console.log(action.payload);
        state.status = 'idle';
        if (action.payload != null) {
          state.OrdersBuyerList=action.payload;
        }
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        console.log("loading");
        state.status = 'loading';
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        console.log("done");
        console.log("Output:");
        console.log(action.payload);
        state.status = 'idle';
        if (action.payload == "Orders was deleted") {
          state.delStatus=action.payload;
        }
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        console.log("rejected");
        console.log("Output:");
        console.log(action.payload);
      })
  }

});
export const { setProduct, setOrderStatus, makeAnOrderList, setOrderToDelete } = ordersSlice.actions;
export const selectProduct = (state) => state.orders.Product;
export const selectOrderStatus = (state) => state.orders.OrderStatus;
export const selectPaymentId = (state) => state.orders.PaymentId;
export const selecOrdersList = (state) => state.orders.OrdersList;
export const selectOrderToDelete = (state) =>state.orders.OrderToDelete;
export const selectDelStatus =(state) => state.orders.delStatus;

export default ordersSlice.reducer;