import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from '../navigation/Navigation';
import style from "./Products.module.css"
import mainStyle from "../mainPage/MainPage.module.css"
import {
    selectListStatus,
    selectAllProducts,
    getAllProductsAsync,
    selectListSize,
    setEProduct
} from './productsSlice'
import {
    setProduct,
} from '../orders/ordersSlice'
import {
    selectUser
} from '../registration/registrationSlice'
import { Link } from 'react-router-dom';
export function MyProducts(props) {
    const dispatch = useDispatch();
    const User = useSelector(selectUser);
    const Products = useSelector(selectAllProducts);
    // const listSize = useSelector(selectListSize);
    const [listSize, setListSize] = useState(Products.length);
    const [productsPerPage, setPrductsPerPage] = useState(10);
    const [numOfPages, setNumOfPages] = useState(0);
    const [position, setPosition] = useState(1);
    const [NameFilter, setNameFilter] = useState("");
    const [CompanyFilter, setCompanyFilter] = useState("");
    const [TypeFilter, setTypeFilter] = useState("");
    const [PriceFromFilter, setPriceFromFilter] = useState(0);
    const [PriceToFilter, setPriceToFilter] = useState(10000000000000);
    const [IdFilter, setIdFilter] = useState("");
    useEffect(() => {
        dispatch(getAllProductsAsync({}));
        setNumOfPages(Math.ceil(listSize / productsPerPage));
        console.log("listSize: " + listSize);
        console.log("numOfPages: " + numOfPages);
    }, [listSize])
    useEffect(() => {
        setListSize(Products.filter((item) => {
            if (item.seller.id == User.id && item.name.includes(NameFilter) && item.type.includes(TypeFilter) && item.company.includes(CompanyFilter) && item.price >= PriceFromFilter && item.price <= PriceToFilter && `${item.id}`.includes(IdFilter)) {
                return true;

            }
            else {
                return false;
            }
        }).length)
    }, [NameFilter, TypeFilter, CompanyFilter, PriceFromFilter, PriceToFilter, IdFilter])

    function putPlusButton(product) {
        return <Link className='NoneDec' to="/editproduct"><button onClick={() => {
            dispatch(setEProduct(product));
        }} className={`AddButtonStyle SpecialColorWhite`}>{`*`}</button></Link>
    }

    function putPagination() {
        let a = [];
        for (let i = 1; i <= numOfPages; i++) {
            a.push(i);
        }
        return <nav aria-label="Page navigation example">
            <ul style={{ margin: `15px` }} className="pagination justify-content-center">
                <li className="page-item">
                    <button onClick={(e) => {
                        if (position - 1 > 0) {
                            setPosition(position - 1);
                        }
                    }} className="SpecialColorWhite page-link">Previous</button>
                </li>
                {a.map((index) => {
                    return <li key={`index${index}`} className="page-item"><button onClick={() => {
                        setPosition(index);

                    }} className="SpecialColorWhite page-link" >{index}</button></li>
                })}
                <li className="page-item">
                    <button onClick={(e) => {
                        if (position + 1 <= numOfPages) {
                            setPosition(position + 1);
                        }
                    }} className="SpecialColorWhite page-link" >Next</button>
                </li>
            </ul>
        </nav>
    }
    function putAllProducts() {
        return (
            <table>
                <thead>
                    <tr>
                        <td>
                            <span className={mainStyle.Small}>Product</span>
                        </td>
                        <td>
                            <span className={mainStyle.Small}>Type</span>
                        </td>
                        <td>
                            <span className={mainStyle.Small}>Company</span>
                        </td>
                        <td>
                            <span className={mainStyle.Small}>Prices</span>
                        </td>
                        <td>
                            <span className={mainStyle.Small}>Id</span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input onChange={(e) => {
                                setNameFilter(e.target.value);
                            }} placeholder='Product Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                        <td>
                            <input onChange={(e) => {
                                setTypeFilter(e.target.value);
                            }} placeholder='Type Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                        <td>
                            <input onChange={(e) => {
                                setCompanyFilter(e.target.value);
                            }} placeholder='Company Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                        <td>
                            <input onChange={(e) => {
                                console.log(e.target.value)
                                if (e.target.value == undefined || e.target.value == null || e.target.value == "") {
                                    setPriceFromFilter(0);
                                }
                                else {
                                    setPriceFromFilter(e.target.value);
                                }
                            }} placeholder='Price From' className={`SpecialColorWhite ${mainStyle.Small}`} />
                            <input onChange={(e) => {
                                if (e.target.value == undefined || e.target.value == null || e.target.value == "") {
                                    setPriceToFilter(10000000000000);
                                }
                                else {
                                    setPriceToFilter(e.target.value);
                                }
                            }} placeholder='Price To' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                        <td>
                            <input onChange={(e) => {
                                setIdFilter(e.target.value);
                            }} placeholder='Id Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                    </tr>
                </tbody>
                {Products.filter((item) => {
                    if (item.seller.id == User.id && item.name.includes(NameFilter) && item.type.includes(TypeFilter) && item.company.includes(CompanyFilter) && item.price >= PriceFromFilter && item.price <= PriceToFilter && `${item.id}`.includes(IdFilter)) {
                        return true;

                    }
                    else {
                        return false;
                    }
                }).sort((item1, item2) => {
                    if (item1.status == "active" && item2.status != "active") {
                        return -1;
                    }
                    return 0;
                }).slice((position - 1) * 10, (position) * 10).map((product) => {
                    return (
                        <tbody key={`product${product.id}`}>
                            <tr>
                                <td>
                                    <span>{product.name}</span>
                                </td>
                                <td>
                                    <span>{product.type}</span>
                                </td>
                                <td>
                                    <span>{product.company}</span>
                                </td>
                                <td>
                                    <span className={`${mainStyle.Price}`} >{product.price}$</span>
                                </td>
                                <td>
                                    <span>{product.id}</span>
                                </td>
                                <td>
                                    {putPlusButton(product)}
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        );
    }
    return (
        <div className="Page">
            <div className={mainStyle.MainPage}>
                <Navigation/>
                <div className={style.Products}>
                    <div className="col">
                        <div className={"row" + style.MiddleSize} >
                            <div className={style.Orders}>
                                {putAllProducts()}
                                {putPagination()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}