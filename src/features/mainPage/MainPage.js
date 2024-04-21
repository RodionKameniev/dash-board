import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from "./MainPage.module.css"
import { Navigation } from '../navigation/Navigation';
import { Link } from 'react-router-dom';
// import {

// } from './mainPageSlice';
import {
    selectUser
} from '../registration/registrationSlice'
import { ProductColumn } from '../Products/ProductColumn';

export function MainPage() {
    const dispatch = useDispatch();
    const User = useSelector(selectUser);
    function ScoreString(score){
        if(score>4){
            return "Exelent"
        }
        if(score>2.5){
            return "Good"
        }
        if(score<=2.5){
            return "Bad"
        }
    }
    return (
        <div className={style.Page}>
            <div className={style.MainPage}>
                <Navigation />
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <input placeholder='search information' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <div className="row">
                                <div className="col">
                                    <div className={style.Balance}>
                                        <span>Balance: {`${User.balance}`}</span>
                                        <span>Balance History:</span>
                                        <div className={style.BalanceHistory}>

                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className={style.Score}>
                                        <span>Score: {`${User.score}`}</span>
                                        <span>Your Score is {`${ScoreString(User.score)}`}</span>
                                        <div className={style.BalanceHistory}>

                                        </div>
                                        <button className={`${style.Button} btn btn-primary`} type="button"><Link className='NoneDec' to="/account" >View my Account</Link></button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <ProductColumn/>
                            </div>
                        </div>
                        <div className="col">
                            <div className={style.Subs}>
                                <span>For Buisness Sharks</span>
                                <span>Here, i focus ona range of items and featured that we use in life without them</span>
                                <div className={style.SubsItem}>
                                    <input type='checkbox' />
                                    <span>Test1</span>
                                    <span className={style.Price}>+40$</span>
                                </div>
                                <span>Vat Taxes: {`${"???"}`}</span>
                                <span>Total Amount: {`${"???"}`}</span>
                                <button className={`${style.Button} btn btn-primary`} type="button"><Link className='NoneDec' to="/purchase">Purchase</Link></button>
                                
                            </div>
                        </div>
                    </div>
                    {/* <div className="container text-center">
                        <div className="row">
                            <div className="col">
                                <input placeholder='search information' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="row">
                                <div className="col">
                                    <div className={style.Balance}>
                                        <span>Balance: {`${"???"}`}</span>
                                        <span>Balance History:</span>
                                        <div className={style.BalanceHistory}>

                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className={style.Score}>
                                        <span>Score: {`${"???"}`}</span>
                                        <span>Your Score is {`${"???"}`}</span>
                                        <div className={style.BalanceHistory}>

                                        </div>
                                        <Link className='NoneDec' to="/account" >View my Account</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className={style.Orders}>
                                    <table>
                                        <tr>
                                            <td>
                                                <span>Product</span>
                                            </td>
                                            <td>
                                                <span>Catecory</span>
                                            </td>
                                            <td>
                                                <span>Payment</span>
                                            </td>
                                            <td>
                                                <span>Order Status</span>
                                            </td>
                                            <td>
                                                <span>Action</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>Test Samsung Phone</span>
                                            </td>
                                            <td>
                                                <span>Phone</span>
                                            </td>
                                            <td>
                                                <span>300$</span>
                                            </td>
                                            <td>
                                                <span>In progress</span>
                                            </td>
                                            <td>
                                                <span>delete</span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className={style.Subs}>
                                <span>For Buisness Sharks</span>
                                <span>Here, i focus ona range of items and featured that we use in life without them</span>
                                <div className={style.SubsItem}>
                                    <input type='checkbox' />
                                    <span>Test1</span>
                                    <span>+40$</span>
                                </div>
                                <span>Vat Taxes: {`${"???"}`}</span>
                                <span>Total Amount: {`${"???"}`}</span>
                                <Link className='NoneDec' to="/purchase">Purchase</Link>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        )
}