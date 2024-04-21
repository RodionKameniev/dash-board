import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from '../navigation/Navigation';
import style from "./MyAccountInfo.module.css"
import mainStyle from "../mainPage/MainPage.module.css"
import {
    selectUser
} from '../registration/registrationSlice'
import{
    selectUserUpdated,
    updateUserDataAsync
} from '../mainPage/mainPageSlice'
export function MyAccountInfo() {
    const dispatch = useDispatch();
    const User = useSelector(selectUser);
    const UpdatedUser = useSelector(selectUserUpdated);
    const [edit, changeEdit] = useState(false);
    const [editDisplay, changeEditDisplay] = useState("none");
    const [Name, changeName] = useState(User.userInfo.name);
    const [UserImg, changeUserImg] = useState(User.userImg);
    const [FirstName, changefirstName] = useState(User.userInfo.firstName);
    const [SecondName, changeSecondName] = useState(User.userInfo.secondName);
    const [Mail, changeMail] = useState(User.userInfo.mail.name);
    const [Card, changeCard] = useState(User.userInfo.card.card);
    const [Cvv, changeCvv] = useState(User.userInfo.card.cvv);
    useEffect(()=>{
        if(edit){
            changeEditDisplay("flex");
        }
        else{
            changeEditDisplay("none");
        }
    },[edit])
    function putUserImg(){
        if(UpdatedUser.id!=-1){
            return UpdatedUser.userImg;
        }
        else{
            return User.userImg;
        }
    }
    function putName(){
        if(UpdatedUser.id!=-1){
            return UpdatedUser.userInfo.name;
        }
        else{
            return User.userInfo.name;
        }
    }
    function putFirstName(){
        if(UpdatedUser.id!=-1){
            return UpdatedUser.userInfo.firstName;
        }
        else{
            return User.userInfo.firstName;
        }
    }
    function putSecondName(){
        if(UpdatedUser.id!=-1){
            return UpdatedUser.userInfo.secondName;
        }
        else{
            return User.userInfo.secondName;
        }
    }
    function putMail(){
        if(UpdatedUser.id!=-1){
            return UpdatedUser.userInfo.mail.name;
        }
        else{
            return User.userInfo.mail.name;
        }
    }
    function putCard(){
        if(UpdatedUser.id!=-1){
            return UpdatedUser.userInfo.card.card
        }
        else{
            return User.userInfo.card.card;
        }
    }
    return (
        <div className="Page">
            <div className={mainStyle.MainPage}>
                <Navigation />
                <div className={style.MyAccountInfo}>
                    <div className={style.Person}>
                        <div className={style.ImgPerson}>
                            <img className={style.ImgPerson} src={`${putUserImg()}`}/>
                        </div>
                        <input onChange={(e)=>{
                            changeUserImg(e.target.value);
                        }} style={{ display: `${editDisplay}` }} value={`${UserImg}`} placeholder='New Img(Link)'/>
                        <div className={`${style.InfoPerson} BasicFormula SpecialColor`}>
                            <div>
                                <span>Name: </span>
                                <span>{`${putName()}`}</span>
                                <br/>
                                <input onChange={(e)=>{
                                    changeName(e.target.value);
                                }} style={{ display: `${editDisplay}` }} value={`${Name}`} placeholder='New Name'/>
                            </div>
                            <div>
                                <span>First Name: </span>
                                <span>{`${putFirstName()}`}</span>
                                <br/>
                                <input onChange={(e)=>{
                                    changefirstName(e.target.value);
                                }} style={{ display: `${editDisplay}` }} value={`${FirstName}`} placeholder='New First Name'/>
                            </div>
                            <div>
                                <span>Second Name: </span>
                                <span>{`${putSecondName()}`}</span>
                                <br/>
                                <input onChange={(e)=>{
                                    changeSecondName(e.target.value);
                                }} style={{ display: `${editDisplay}` }} value={`${SecondName}`} placeholder='New Second Name'/>
                            </div>
                            <div>
                                <span>Mail: </span>
                                <span>{`${putMail()}`}</span>
                                <br/>
                                <input onChange={(e)=>{
                                    changeMail(e.target.value);
                                }} style={{ display: `${editDisplay}` }} value={`${Mail}`} placeholder='New Mail'/>
                            </div>
                            <div>
                                <span>OrderTarget: </span>
                                <span>{`${User.orderTarget}`}</span>
                            </div>
                            <div>
                                <span>Score: </span>
                                <span>{`${User.score}`}</span>
                            </div>
                            <div>
                                <span>Balance: </span>
                                <span>{`${User.balance}`}</span>
                            </div>
                            <div>
                                <span>Transactions: </span>
                                <span>{`${User.transactions}`}</span>
                            </div>
                            <div>
                                <span>Card: </span>
                                <span>{`${putCard()}`}</span>
                                <div style={{ display: `${editDisplay}` }} >
                                    <input onChange={(e)=>{
                                    changeCard(e.target.value);
                                    }} value={`${Card}`} placeholder='New Card'/>
                                    <input onChange={(e)=>{
                                    changeCvv(e.target.value);
                                    }} value={`${Cvv}`}  placeholder='New CVV'/>
                                </div>
                            </div>
                            <div>
                                <span>Role: </span>
                                <span>{`${User.role.name}, ${User.role.status}`}</span>
                            </div>
                            <div>
                                <span>Subscription: </span>
                                <span>{`${User.sub.name}`}</span>
                            </div>
                            <div className='right'>
                                <button onClick={()=>{
                                        if(User.id!=-1){
                                            changeEdit(!edit);
                                            dispatch(updateUserDataAsync({id: User.id, userImg: UserImg, name: Name, firstName: FirstName, secondName: SecondName, mail: Mail, card: Card, cvv: Cvv}));
                                        }
                                    }} style={{ display: `${editDisplay}` }} type="button" className="MButton btn btn-primary">Confirm</button>
                                <button onClick={()=>{
                                    if(User.id!=-1){
                                        changeEdit(!edit);
                                    }
                                }} type="button" className="MButton btn btn-primary">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}