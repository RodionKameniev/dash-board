import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from '../navigation/Navigation';
import style from "./History.module.css"
import mainStyle from "../mainPage/MainPage.module.css"
export function History() {
    const dispatch = useDispatch();
    return (
        <div className={mainStyle.Page}>
            <div className={mainStyle.MainPage}>
                <Navigation />
                <div className={style.History}>
                    <div className="col">
                        <div className={"row" + style.MiddleSize} >
                            <div className={style.Orders}>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>
                                                <span className={mainStyle.Small}>Product</span>
                                            </td>
                                            <td>
                                                <span className={mainStyle.Small}>Seller</span>
                                            </td>
                                            <td>
                                                <span className={mainStyle.Small}>Buyer</span>
                                            </td>
                                            <td>
                                                <span className={mainStyle.Small}>Order Status</span>
                                            </td>
                                            <td>
                                                <span className={mainStyle.Small}>Action</span>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>Test Samsung Phone</span>
                                            </td>
                                            <td>
                                                <span>Tom</span>
                                            </td>
                                            <td>
                                                <span>Bob</span>
                                            </td>
                                            <td>
                                                <span>In progress</span>
                                            </td>
                                            <td>
                                                <span>delete</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
