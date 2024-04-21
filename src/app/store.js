import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import  registrationReducer from '../features/registration/registrationSlice';
import mainPageReducer from '../features/mainPage/mainPageSlice';
import productsReducer from '../features/Products/productsSlice';
import ordersReducer from '../features/orders/ordersSlice';
import adminReducer from '../features/adminActions/adminSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    registration: registrationReducer,
    myAccount: mainPageReducer,
    product: productsReducer,
    orders: ordersReducer,
    admin: adminReducer,
  },
});
