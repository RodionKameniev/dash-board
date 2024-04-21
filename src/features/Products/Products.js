import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from '../navigation/Navigation';
import style from "./Products.module.css"
import mainStyle from "../mainPage/MainPage.module.css"
import {
    selectListStatus,
    selectAllProducts,
    getAllProductsAsync,
    selectListSize
} from './productsSlice'
import { ProductColumn } from './ProductColumn';
export function Products() {
    const dispatch = useDispatch();
    return (
        <div className="Page">
            <div className={mainStyle.MainPage}>
                <Navigation />
                <ProductColumn/>
            </div>
        </div>
    )
}