import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from '../navigation/Navigation';
import style from "./Products.module.css"
import mainStyle from "../mainPage/MainPage.module.css"
import {
    selectProductStatus,
    addProductAsync,
    setProductStatus,
    selectEProduct,
    deleteProductAsync,
    editProductAsync,
} from './productsSlice'
import {
    selectUser
} from '../registration/registrationSlice'
import { Link } from 'react-router-dom';
export function EditProduct() {
    const dispatch = useDispatch();
    const ProductStatus = useSelector(selectProductStatus);
    const Product = useSelector(selectEProduct);
    const User = useSelector(selectUser);
    const [iName, changeIName] = useState(Product.name);
    const [iCompany, changeICompany] = useState(Product.company);
    const [iType, changeIType] = useState(Product.type);
    const [iPrice, changeIPrice] = useState(Product.price);
    const [iStatus, changeIStatus] = useState(Product.status);
    const [link, changeLink] = useState("/editproduct");
    const [Dlink, changeDLink] = useState("/editproduct");
    useEffect(() => {
        dispatch(setProductStatus(""))
    }, [])
    useEffect(() => {
        if (iStatus != "" && iName != "" && iName != null && iCompany != "" && iCompany != null && iType != "" && iType != null && iPrice > 0 && iPrice != null && User.id > 0) {
            changeLink("/products");
        }
        else {
            changeLink("/editproduct");
        }
    }, [iName, iCompany, iType, iPrice, iStatus])

    useEffect(()=>{
        if(ProductStatus=="Product was deleted"){
            changeDLink("/product");
        }
    }, [ProductStatus])

    function putOptions() {
        let opt = ["active", "not active", "out of stock"];
        return opt.map((item) => {
            if (item == Product.status) {
                return <option key={`${item}`} selected className='SpecialColorWhite' value={Product.status}>{Product.status}</option>
            }
            else {
                return <option key={`${item}`} className='SpecialColorWhite' value={item}>{item}</option>
            }
        })
    }

    return (
        <div className="Page">
            <div className={mainStyle.MainPage}>
                <Navigation />
                <div className={style.Products}>
                    <div className={`${style.Orders} ${style.ProductCard}`}>
                        <span style={{ alignSelf: `center` }}>Edit Product:</span>
                        <div>
                            <span>Name:</span>
                            <br />
                            <span>Current: {Product.name}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iName} onChange={(e) => {
                                changeIName(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>Company:</span>
                            <br />
                            <span>Current: {Product.company}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iCompany} onChange={(e) => {
                                changeICompany(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>Type:</span>
                            <br />
                            <span>Current: {Product.type}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iType} onChange={(e) => {
                                changeIType(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>Price:</span>
                            <br />
                            <span>Current: <span className={`${mainStyle.Price}`}>{Product.price} $</span></span>
                            <br />
                            <input className='SpecialColorWhite' value={iPrice} onChange={(e) => {
                                changeIPrice(e.target.value);
                            }} type='number' />
                        </div>
                        <div>
                            <span>Status:</span>
                            <br />
                            <span>Current: {Product.status}</span>
                            <br />
                            <select className='SpecialColorWhite' onChange={(e) => {
                                changeIStatus(e.target.value);
                            }}>
                                {putOptions()}
                            </select>
                        </div>
                        <span>{ProductStatus}</span>
                        <div>
                            <Link className='NoneDec' to={`${link}`}><button onClick={() => {
                                if (iStatus != "" && iName != "" && iName != null && iCompany != "" && iCompany != null && iType != "" && iType != null && iPrice > 0 && iPrice != null && User.id > 0) {
                                    dispatch(editProductAsync({ Id: Product.id, Name: iName, Company: iCompany, Type: iType, Price: iPrice, Status: iStatus }));
                                }
                                else {
                                    if (User.id < 0) {
                                        dispatch(setProductStatus("You are not registraited"));
                                    }
                                    else {
                                        dispatch(setProductStatus("Something is wrong"));
                                    }
                                }
                            }} type="button" className="MButton btn btn-primary">Confirm</button></Link>
                            <Link className='NoneDec' to={`${Dlink}`}><button onClick={() => {
                                if (User.id < 0) {
                                    dispatch(setProductStatus("You are not registraited"));
                                    return;
                                }
                                dispatch(deleteProductAsync({id: Product.id}));
                            }} type="button" className="MButton btn btn-primary">Delete</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}