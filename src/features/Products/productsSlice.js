import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    Name: "",
    Company: "",
    Type: "",
    Price: 0,
    status: "idle",
    productStatus:"",
    productList: [],
    listStatus:"",
    listSize:0,
    EProduct:{id:-1},
};

export const addProductAsync = createAsyncThunk(
  'addProduct',
  async (state) => {
    console.log(state);
      const response = await axios.post('http://localhost:8080/Product/addProduct', {
        name: state.name,
        company: state.company,
        type: state.type,
        price: state.price,
        sellerId: state.sellerId
      });

      return response.data;
  }
);
export const deleteProductAsync = createAsyncThunk(
  'deleteProduct',
  async (state) => {
    console.log(state);
      const response = await axios.post('http://localhost:8080/Product/deleteProduct', `${state.id}`);
      return response.data;
  }
);
export const editProductAsync = createAsyncThunk(
  'editProduct',
  async (state) => {
    console.log("StateP:");
    console.log(state);
    const response = await axios.post('http://localhost:8080/Product/updateProduct', {
      id: state.Id,
      name: state.Name,
      type: state.Type,
      company: state.Company,
      price: parseFloat(state.Price),
      status: state.Status,
    });
    return response.data;
  }
);
export const getAllProductsAsync = createAsyncThunk(
  'getAllProducts',
  async (state) => {
    console.log(state);
      const response = await axios.get('http://localhost:8080/Product/getAllProduct', {
      });
      
      return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductStatus: (state, action) =>{
        state.productStatus=action.payload;
    },
    setEProduct: (state, action) =>{
      state.EProduct=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addProductAsync.pending, (state)=>{
      console.log("loading");
      state.status = 'loading';
    })
    .addCase(addProductAsync.fulfilled, (state, action)=>{
      console.log("done");
      console.log("Output:");
      console.log(action.payload);
      state.status = 'idle';
      if(action.payload=="Product was added"){
        state.productStatus="Product was added.";
      }
      else{
        state.productStatus="Something went wrong";
      }
    })
    .addCase(getAllProductsAsync.pending, (state)=>{
      console.log("loading");
      state.status = 'loading';
    })
    .addCase(getAllProductsAsync.fulfilled, (state, action)=>{
      console.log("done");
      console.log("Product:");
      console.log(action.payload);
      state.status = 'idle';
      if(action.payload!=null){
        state.productList=action.payload;
        state.listSize=action.payload.length;
        state.listStatus="List is loaded";
      }
      else{
        state.listStatus="Something went wrong";
      }
    })
    .addCase(deleteProductAsync.pending, (state)=>{
      console.log("loading");
      state.status = 'loading';
    })
    .addCase(deleteProductAsync.fulfilled, (state, action)=>{
      if(action.payload!="No such Product"){
        state.productStatus=action.payload;
      }
      else{
        state.productStatus=action.payload;
      }
    })
    .addCase(editProductAsync.pending, (state)=>{
      console.log("loading");
      state.status = 'loading';
    })
    .addCase(editProductAsync.fulfilled, (state, action)=>{
      if(action.payload!="No such Product"){
        state.productStatus=action.payload;
      }
      else{
        state.productStatus=action.payload;
      }
    })
   }
  
});
export const { setProductStatus, setEProduct} = productsSlice.actions;
export const selectProductStatus = (state) => state.product.productStatus;
export const selectAllProducts = (state) => state.product.productList;
export const selectListStatus = (state) => state.product.listStatus;
export const selectListSize = (state) => state.product.listSize;
export const selectEProduct = (state) => state.product.EProduct;


export default productsSlice.reducer;