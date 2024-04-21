import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    checkNameAsync,
    changeName,
    changePassWord1,
    changePassWord2,
    changeMail,
    changeCvv,
    changeCard,
    selectAccsess,
    selectName,
    selectPassWord1,
    selectPassWord2,
    selectMail,
    selectCard,
    selectCvv,
    logInAsync
} from "./registrationSlice.js"
import style from "./Reistration.module.css"
import { NavLink, useNavigate } from 'react-router-dom';
export function Reg(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const access = useSelector(selectAccsess);
    const nName = useSelector(selectName);
    const nPassWord1 = useSelector(selectPassWord1);
    const nPassWord2 = useSelector(selectPassWord2);
    const nMail = useSelector(selectMail);
    const nCard = useSelector(selectCard);
    const nCvv = useSelector(selectCvv);
    useEffect(()=>{
        if(access=="You have been registered."){
            dispatch(logInAsync({logInName: nName, logInPassWord: nPassWord1}));
            navigate("/");
        }
    }, [access]);
    return (
        <div style={{display: `${props.styleDisp}`}} className={`${style.RegMenu}`}>
            <div className='CenterFlex'>
                <div className='BasicFormula'>
                    <input onChange={(e)=>{
                        dispatch(changeName(e.target.value));
                    }} className={style.RegInput} placeholder='Nick Name' />
                    <input onChange={(e)=>{
                        dispatch(changePassWord1(e.target.value));
                    }} className={style.RegInput} placeholder='Password' />
                    <input onChange={(e)=>{
                        dispatch(changePassWord2(e.target.value));
                    }} className={style.RegInput} placeholder='Confirm Password' />
                    <input onChange={(e)=>{
                        dispatch(changeMail(e.target.value));
                    }} className={style.RegInput} placeholder='Mail' />
                    <input onChange={(e)=>{
                        dispatch(changeCard(e.target.value));
                    }} className={style.RegInput} placeholder='Card' />
                    <input onChange={(e)=>{
                        dispatch(changeCvv(e.target.value));
                    }} className={style.RegInput} placeholder='CVV' />
                    <span className='BasicFormula'>{access}</span>
                    <button onClick={()=>{
                        dispatch(checkNameAsync({name: nName, passWord1: nPassWord1, passWord2:nPassWord2, mail: nMail, card: nCard, cvv: nCvv}));
                    }} type="button" className="MButton btn btn-primary">Confirm</button>
                </div>
                
            </div>
        </div>
    )
}