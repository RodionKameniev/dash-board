import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from '../navigation/Navigation';
import style from "./Orders.module.css"
import mainStyle from "../mainPage/MainPage.module.css"
import {
    selectProduct,
    setOrderStatus,
    selectOrderStatus,
    addOrderAsync,
} from './ordersSlice'
import {
    selectUser
} from '../registration/registrationSlice'
import { ProductColumn } from '../Products/ProductColumn';
export function Orders() {
    const dispatch = useDispatch();
    const User = useSelector(selectUser);
    const OrderStatus = useSelector(selectOrderStatus);
    const [iBuyer, changeiIBuyer] = useState({ userInfo: { name: 'You are not registerd' } });
    const [iSeller, changeISeller] = useState({ userInfo: { name: 'No Product' } });
    const [iProductState, changeIProductState] = useState({ name: 'No Product', id: 'No Product', type: 'No Product', company: 'No Product' });
    const iProduct = useSelector(selectProduct);
    const [iPrice, changeIPrice] = useState(0);
    useEffect(() => {
        if (iProduct.id != -1) {
            console.log(iProduct);
            changeISeller(iProduct.seller);
            changeIPrice(Math.round((iProduct.price * 1.1) * 100) / 100);
            changeIProductState(iProduct);
        }
        console.log("OrderP:")
        console.log(iProduct)
    }, [iProduct])
    useEffect(() => {
        if (User.id != -1) {
            changeiIBuyer(User)
        }
    }, [User])
    return (
        <div className="Page">
            <div className={mainStyle.MainPage}>
                <Navigation />
                <div className={`${style.OrdersStyle}`}>
                    <div className={`${style.Orders} ${style.ProductCard}`}>
                        <span style={{ alignSelf: `center` }}>Make an Order:</span>
                        <div>
                            <span>Seller Name:</span>
                            <br />
                            <span className='SpecialColorWhite'>{iSeller.userInfo.name}</span>
                        </div>
                        <div>
                            <span>Buyer Name:</span>
                            <br />
                            <span className='SpecialColorWhite'>{iBuyer.userInfo.name}</span>
                        </div>
                        <div>
                            <span>Product:</span>
                            <br />
                            <span className='SpecialColorWhite'>{iProductState.name}</span>
                        </div>
                        <div>
                            <span>ProductId:</span>
                            <br />
                            <span className='SpecialColorWhite'>{iProductState.id}</span>
                        </div>
                        <div>
                            <span>Type:</span>
                            <br />
                            <span className='SpecialColorWhite'>{iProductState.type}</span>
                        </div>
                        <div>
                            <span>Company:</span>
                            <br />
                            <span className='SpecialColorWhite'>{iProductState.company}</span>
                        </div>
                        <div>
                            <span>Price (With Taxes(10%)):</span>
                            <br />
                            <span className={`${mainStyle.Price}`}>{iPrice}$</span>
                        </div>
                        <span>{OrderStatus}</span>
                        <button onClick={() => {
                            console.log(OrderStatus);
                            if (iBuyer.userInfo.name == "You are not registerd") {
                                console.log("P1");
                                dispatch(setOrderStatus("You must be registered to make an order"));
                                return;
                            }
                            if (iSeller.userInfo.name == "No Product") {
                                console.log("P2");
                                dispatch(setOrderStatus("You must select an product"));
                                return;
                            }
                            if (iBuyer.userInfo.name == iSeller.userInfo.name) {
                                console.log("P3");
                                dispatch(setOrderStatus("Buyer and Seller must be different"));
                                return;
                            }
                            dispatch(addOrderAsync({BuyerId: iBuyer.id, Price: iPrice, Status: "active", ProductId: iProduct.id}));

                        }} type="button" className="MButton btn btn-primary">Confirm</button>
                    </div>
                </div>
                <div className='SmallRoom'>
                    <ProductColumn />
                </div>
            </div>
        </div>
    )
}