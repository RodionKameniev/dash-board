import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from '../navigation/Navigation';
import style from "./Orders.module.css"
import mainStyle from "../mainPage/MainPage.module.css"
import {
    selecOrdersList,
    getAllSellerOrdersAsync,
    getAllBuyerOrdersAsync,
    makeAnOrderList,
    setOrderToDelete
} from './ordersSlice'
import {
    selectUser
} from '../registration/registrationSlice'
import { ProductColumn } from '../Products/ProductColumn';
import { Link } from 'react-router-dom';

export function MyActiveOrders() {
    const dispatch = useDispatch();
    const User = useSelector(selectUser);
    const Orders = useSelector(selecOrdersList);
    const [listSize, setListSize] = useState(Orders.length);
    const [productsPerPage, setPrductsPerPage] = useState(10);
    const [numOfPages, setNumOfPages] = useState(0);
    const [position, setPosition] = useState(1);
    const [BuyerFilter, setBuyerFilter] = useState("");
    const [SellerFilter, setSellerFilter] = useState("");
    const [NameFilter, setNameFilter] = useState("");
    const [CompanyFilter, setCompanyFilter] = useState("");
    const [TypeFilter, setTypeFilter] = useState("");
    const [PriceFromFilter, setPriceFromFilter] = useState(0);
    const [PriceToFilter, setPriceToFilter] = useState(10000000000000);
    const [IdFilter, setIdFilter] = useState("");
    const [IdProductFilter, setIdProductFilter] = useState("");
    const [update, setUpdate] = useState(0);
    useEffect(() => {
        console.log("User: ");
        console.log(User);
    });
    useEffect(() => {
        console.log("UserId: ");
        console.log(User.userInfo.id);
        dispatch(getAllSellerOrdersAsync({ id: User.id }));
        dispatch(getAllBuyerOrdersAsync({ id: User.id }));
        dispatch(makeAnOrderList());
        setNumOfPages(Math.ceil(listSize / productsPerPage));
        console.log("listSize: " + listSize);
        console.log("numOfPages: " + numOfPages);
    }, [listSize, update]);
    useEffect(() => {
        if (Orders != []) {
            console.log(Orders);
            setListSize(Orders.filter((item) => {
                if (item != null && item != {}) {
                    //console.log(item);
                    if (typeof item.buyerName != "string" || typeof item.product.seller.userInfo.name != "string" || typeof item.product.name != "string" || typeof item.product.type != "string" || typeof item.product.company != "string" || typeof `${item.product.id}` != "string" || typeof `${item.id}` != "string") {
                        return false;
                    }
                    if (item.buyerName.includes(BuyerFilter) && item.product.seller.userInfo.name.includes(SellerFilter) && item.product.name.includes(NameFilter) && item.product.type.includes(TypeFilter) && item.product.company.includes(CompanyFilter) && item.payment.price >= PriceFromFilter && item.payment.price <= PriceToFilter && `${item.product.id}`.includes(IdProductFilter) && `${item.id}`.includes(IdFilter)) {
                        return true;

                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }).length)
        }
    }, [NameFilter, TypeFilter, CompanyFilter, PriceFromFilter, PriceToFilter, IdFilter, update]);
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
    function putAllOrders() {
        return (
            <table >
                <thead>
                    <tr>
                        <td>
                            <span className={mainStyle.Small}>Buyer</span>
                        </td>
                        <td>
                            <span className={mainStyle.Small}>Seller</span>
                        </td>
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
                            <span className={mainStyle.Small}>Product Id</span>
                        </td>
                        <td>
                            <span className={mainStyle.Small}>Id</span>
                        </td>
                        <td>
                            <img onClick={() => {
                                setUpdate(update + 1);
                            }} className={`${mainStyle.Small}`} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7ElEQVR4nO2YTS9DQRSGzwYLra/EQjSx9PEjiC1/QYSkZWclbOxE/BksLOkCYcFCiIXURyLB3kesHxmOuKq3vW3vmNHeJ2nauT3nzPt2zr0zqUjCPwM4wj8OazHiJZIY8QxJVsQzJFmRRl8RsQRNa4SQnTtqQVdIVOdNZ0QsQWKk2VvLFZIY8QxJVqTRV0Sq3Bf+/T6C70ZcIYmRRm8tickI0AHMAhvA1Z8bcYV4bmQHyAKDQLu+hoAcsFsUO+C0tUIoAKMRaowF2u4GyPhkZB/orqJOD3CguWdASyxG6qRQjYkiM9daY8kHIxXbKQxgXGu8AimXrbUTNTcMIK+1plwayUbNDQOY01pbZvBYYpJHDUxjj0GpEz4fzYYLM1gvMcmaBk5aNJKOwUhaaz2ZQauaMStzD6yaR5pev/DcSIfWegkL6AS2sUscrTWitS6Lv2gDFoAH7JOLwci81tqst1Ytk8/o5Ls15H4QGO99XmE6dqERxKSAZxUwVqsRYEKHT0CXNcEVBC2rCHMA7Kki74s+4E4/L9pVW16QuRdPVMhBVDN8c67vx+bpal9xeVGZwK9qDoDjEXKCmJxe8QGgHzgNiMvrsWP44yD4Oz4UNw5+ijOb74retD8oERuK+IIeN+b0z4db4M21Jie8A6Qf2pd6CWbNAAAAAElFTkSuQmCC"></img>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input onChange={(e) => {
                                setBuyerFilter(e.target.value);
                            }} placeholder='Buyer Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                        <td>
                            <input onChange={(e) => {
                                setSellerFilter(e.target.value);
                            }} placeholder='Seller Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
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
                                //console.log(e.target.value)
                                if (e.target.value == undefined || e.target.value == null || e.target.value == "") {
                                    setPriceFromFilter(0);
                                }
                                else {
                                    setPriceFromFilter(e.target.value);
                                }
                            }} placeholder='Price From' className={`SpecialColorWhite ${mainStyle.Small}`} />
                            <br />
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
                                setIdProductFilter(e.target.value);
                            }} placeholder='Id Product Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                        <td>
                            <input onChange={(e) => {
                                setIdFilter(e.target.value);
                            }} placeholder='Id Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                    </tr>
                </tbody>
                {Orders.filter((item) => {
                    if (item != null && item != {}) {
                        //console.log(item);
                        if (typeof item.buyerName != "string" || typeof item.product.seller.userInfo.name != "string" || typeof item.product.name != "string" || typeof item.product.type != "string" || typeof item.product.company != "string" || typeof `${item.product.id}` != "string" || typeof `${item.id}` != "string") {
                            return false;
                        }
                        if (item.buyerName.includes(BuyerFilter) && item.product.seller.userInfo.name.includes(SellerFilter) && item.product.name.includes(NameFilter) && item.product.type.includes(TypeFilter) && item.product.company.includes(CompanyFilter) && item.payment.price >= PriceFromFilter && item.payment.price <= PriceToFilter && `${item.product.id}`.includes(IdProductFilter) && `${item.id}`.includes(IdFilter)) {
                            return true;

                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                }).slice((position - 1) * 10, (position) * 10).map((order) => {
                    return (
                        <tbody key={`order${order.id}`}>
                            <tr>
                                <td>
                                    <span>{order.buyerName}</span>
                                </td>
                                <td>
                                    <span>{order.product.seller.userInfo.name}</span>
                                </td>
                                <td>
                                    <span>{order.product.name}</span>
                                </td>
                                <td>
                                    <span>{order.product.type}</span>
                                </td>
                                <td>
                                    <span>{order.product.company}</span>
                                </td>
                                <td>
                                    <span className={`${mainStyle.Price}`} >{order.payment.price}$</span>
                                </td>
                                <td>
                                    <span>{order.product.id}</span>
                                </td>
                                <td>
                                    <span>{order.id}</span>
                                </td>
                                <td>
                                    <div className='ExtraSize'>
                                        <Link className='NoneDec' to="/confirmanorder"><button onClick={() => {
                                            //dispatch(setOrderToConfirm(order));
                                        }} className={`AddButtonStyle SpecialColorWhite`}>{`✓`}</button></Link>
                                        <Link className='NoneDec' to="/deleteanorder"><button onClick={() => {
                                            dispatch(setOrderToDelete(order));
                                        }} className={`AddButtonStyle SpecialColorWhite`}>{`-`}</button></Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        )
    }
    return (
        <div className="Page">
            <div className={mainStyle.MainPage}>
                <Navigation />
                <div className={`${style.MyOrders} SpecialColorWhite`}>
                    {putAllOrders()}
                    {putPagination()}
                </div>
            </div>
        </div>
    )
}