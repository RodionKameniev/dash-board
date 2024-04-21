import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from '../navigation/Navigation';
import style from "./Orders.module.css"
import mainStyle from "../mainPage/MainPage.module.css"
import {
    selectOrderToDelete,
    deleteOrderAsync,
    selectDelStatus
} from './ordersSlice'
import {
    selectUser
} from '../registration/registrationSlice'
import { ProductColumn } from '../Products/ProductColumn';
export function DeleteOrder() {
    const dispatch = useDispatch();
    const delStatus = useSelector(selectDelStatus)
    const User = useSelector(selectUser);
    const Order = useSelector(selectOrderToDelete);
    return (
        <div className="Page">
            <div className={mainStyle.MainPage}>
                <Navigation />
                <div className={`${style.MaximumSize}`}>
                    <div className={`${style.DeleteOrder} SpecialColorWhite`}>
                        <span className='SpecialColorWhite'>You realy would like to delete your order?</span>
                        <span className='SpecialColorWhite'>Order Information:</span>
                        <div className={style.DelOr}>
                            <span>Buyer: {Order.buyerName}</span>

                            <span>Seller: {Order.product.seller.userInfo.name}</span>

                            <span>Product Name: {Order.product.name}</span>

                            <span>Product Type: {Order.product.type}</span>

                            <span>Company: {Order.product.company}</span>

                            <div>
                                <span>Price: </span>
                                <span className={`${mainStyle.Price}`} >{Order.payment.price}$</span>
                            </div>
                            <span>Product Id: {Order.product.id}</span>

                            <span>Order Id: {Order.id}</span>
                        </div>
                        <span>{delStatus}</span>
                        <button onClick={()=>{
                            if(User.id>0 && Order.id>0){
                                dispatch(deleteOrderAsync({id: Order.id}))
                            }
                        }} type="button" className="MButton btn btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}