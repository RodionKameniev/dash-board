import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from "./Reistration.module.css"
import { LogIn } from './LogIn';
import { Reg } from './Reg';

export function Registration() {
    const dispatch = useDispatch();
    const [dis1, setDis1] = useState("none");
    const [dis2, setDis2] = useState("none");
    const [disR, setDisR] = useState("flex");
    const [disB, setDisB] = useState("none");
    return (
        <div className={style.Registration}>
            <div style={{display: `${disR}`}} className={style.Registration}>
                <button type="button" class="MButton btn btn-primary"onClick={()=>{
                    setDisR("none");
                    setDis1("flex");
                    setDisB("flex");
                }}>Login</button>
                <button type="button" class="MButton btn btn-primary" onClick={()=>{
                    setDisR("none");
                    setDis2("flex");
                    setDisB("flex");
                }}>Registrer</button>
            </div>
            <LogIn styleDisp={dis1}/>
            <Reg styleDisp={dis2}/>
            <button type="button" class="MButton btn btn-primary" style={{display: `${disB}`}} onClick={()=>{
                setDisR("flex");
                setDis1("none");
                setDis2("none");
                setDisB("none");
            }}>{`<`}</button>
        </div>
    )
}
