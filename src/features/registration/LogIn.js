import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    logInAsync,
    changeLogInName,
    changeLogInPassWord,
    selectLogInPassWord,
    selectLogInName,
    selectAccsess
} from "./registrationSlice.js"
import style from "./Reistration.module.css"
import { useNavigate } from 'react-router-dom';

export function LogIn(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LogInName = useSelector(selectLogInName);
    const access = useSelector(selectAccsess);
    const LogInPassWord = useSelector(selectLogInPassWord);
    useEffect(()=>{
        console.log(access);
        if(access=="Successful Login."){
            navigate("/");
        }
    }, [access]);
    return (
        <div style={{ display: `${props.styleDisp}` }} className={style.RegMenu}>
            <div className='CenterFlex'>
                <div className='BasicFormula'>
                    <input onChange={(e)=>{
                        dispatch(changeLogInName(e.target.value));
                    }} className={style.RegInput} placeholder='Nick Name' />
                    <input onChange={(e)=>{
                        dispatch(changeLogInPassWord(e.target.value));
                    }} className={style.RegInput} placeholder='Password' />
                    <span className='BasicFormula'>{access}</span>
                    <button onClick={()=>{
                        dispatch(logInAsync({logInName: LogInName, logInPassWord: LogInPassWord}));
                    }} type="button" className="MButton btn btn-primary">Confirm</button>
                </div>
            </div>
        </div>
    )
}
