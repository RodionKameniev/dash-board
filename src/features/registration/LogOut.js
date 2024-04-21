import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    logOut,
} from "./registrationSlice.js"
import style from "./Reistration.module.css"
import { useNavigate } from 'react-router-dom';

export function LogOut(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(logOut());
        navigate("/registration");
        localStorage.removeItem("user");
    }, []);
}