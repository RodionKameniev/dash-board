import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import mainStyle from "../mainPage/MainPage.module.css"
import style from "./Admin.module.css"
import { Navigation } from '../navigation/Navigation';
import {
    selectUser
} from '../registration/registrationSlice'
import {
    selectAdminStatus,
    addAdminAsync,
} from './adminSlice'

export function AddAdmin() {
    const dispatch = useDispatch();
    const User = useSelector(selectUser);
    const [link, changeLink] = useState("/addadmin");
    const [iId, changeIId] = useState(-1);
    const status = useSelector(selectAdminStatus)
    return (
        <div className="Page">
            <div className={mainStyle.MainPage}>
                <Navigation />
                <div className={style.Admin}>
                    <div className={`${style.Action} ${style.AdminCard}`}>
                        <span style={{ alignSelf: `center` }}>Add Admin:</span>
                        <div>
                            <span>User Id:</span>
                            <br/>
                            <input className='SpecialColorWhite' onChange={(e)=>{
                                changeIId(e.target.value);
                            }} type='number'/>
                        </div>
                        {status}
                        <Link className='NoneDec' to={`${link}`}><button onClick={()=>{
                            if(iId>0){
                                console.log(iId);
                                dispatch(addAdminAsync({AdminId: User.id, UserId: iId}));
                            }
                        }} type="button" className="MButton btn btn-primary">Confirm</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}