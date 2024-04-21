import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from '../navigation/Navigation';
import style from "./Products.module.css"
import mainStyle from "../mainPage/MainPage.module.css"
import{
    selectProductStatus,
    addProductAsync,
    setProductStatus
} from './productsSlice'
import {
    selectUser
} from '../registration/registrationSlice'
import { Link } from 'react-router-dom';
export function AddProduct() {
    const dispatch = useDispatch();
    const ProductStatus = useSelector(selectProductStatus)
    const User=useSelector(selectUser);
    const [iName, changeIName] = useState("");
    const [iCompany, changeICompany] = useState("");
    const [iType, changeIType] = useState("");
    const [iPrice, changeIPrice] = useState(0);
    const [link, changeLink] = useState("/addproduct");
    useEffect(()=>{
        dispatch(setProductStatus(""))
    },[])
    useEffect(()=>{
        if(iName!="" && iName!=null && iCompany!="" && iCompany!=null && iType!="" && iType!=null && iPrice>0 && iPrice!=null && User.id>0){
            changeLink("/products");
        }
        else{
            changeLink("/addproduct");
        }
    }, [iName, iCompany, iType, iPrice])
    return (
        <div className="Page">
            <div className={mainStyle.MainPage}>
                <Navigation />
                <div className={style.Products}>
                    <div className={`${style.Orders} ${style.ProductCard}`}>
                        <span style={{ alignSelf: `center` }}>Add Product:</span>
                        <div>
                            <span>Name:</span>
                            <br/>
                            <input className='SpecialColorWhite' onChange={(e)=>{
                                changeIName(e.target.value);
                            }}/>
                        </div>
                        <div>
                            <span>Company:</span>
                            <br/>
                            <input className='SpecialColorWhite' onChange={(e)=>{
                                changeICompany(e.target.value);
                            }}/>
                        </div>
                        <div>
                            <span>Type:</span>
                            <br/>
                            <input className='SpecialColorWhite' onChange={(e)=>{
                                changeIType(e.target.value);
                            }}/>
                        </div>
                        <div>
                            <span>Price:</span>
                            <br/>
                            <input className='SpecialColorWhite' onChange={(e)=>{
                                changeIPrice(e.target.value);
                            }} type='number'/>
                        </div>
                        <span>{ProductStatus}</span>
                        <Link className='NoneDec' to={`${link}`}><button onClick={()=>{
                            if(iName!="" && iName!=null && iCompany!="" && iCompany!=null && iType!="" && iType!=null && iPrice>0 && iPrice!=null && User.id>0){
                                dispatch(addProductAsync({name: iName, company: iCompany, type: iType, price: iPrice, sellerId: User.id}));
                            }
                            else{
                                if(User.id<0){
                                    dispatch(setProductStatus("You are not registraited"));
                                }
                                else{
                                    dispatch(setProductStatus("Something is wrong"));
                                }
                            }
                        }} type="button" className="MButton btn btn-primary">Confirm</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}