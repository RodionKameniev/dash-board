import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from '../navigation/Navigation';
import style from "../Products/Products.module.css"
import mainStyle from "../mainPage/MainPage.module.css"
import {
    selectEUser,
    selectUserStatus,
    setUserStatus,
    deleteUserAsync,
    editUserAsync
} from './adminSlice'
import {
    selectUser,
} from '../registration/registrationSlice'
import { Link } from 'react-router-dom';
export function EditUser() {
    const dispatch = useDispatch();
    const UserStatus = useSelector(selectUserStatus);
    const EUser = useSelector(selectEUser);
    const User = useSelector(selectUser);

    const [iBalance, changeIBalance] = useState(EUser.balance);
    const [iName, changeIName] = useState(EUser.userInfo.name);
    const [iUserImg, changeIUserImg] = useState(EUser.userImg);
    const [iSales, changeISales] = useState(EUser.sales);
    const [iTransactions, changeITransactions] = useState(EUser.transactions);
    const [iScore, changeIScore] = useState(EUser.score);
    const [iOrderTarget, changeIOrderTarget] = useState(EUser.orderTarget);
    const [iFirstName, changeIFirstName] = useState(EUser.userInfo.firstName);
    const [iSecondName, changeISecondName] = useState(EUser.userInfo.secondName);
    const [iPassword, changeIPassword] = useState(EUser.userInfo.passWord);
    const [iCardNumber, changeICardNumber] = useState(EUser.userInfo.card.card);
    const [iCardCVV, changeICardCVV] = useState(EUser.userInfo.card.cvv);
    const [iMail, changeIMail] = useState(EUser.userInfo.mail.name);
    const [iRoleName, changeIRoleName] = useState(EUser.role.name);
    const [iRoleStatus, changeIRoleStatus] = useState(EUser.role.status);
    const [iSubName, changeISubName] = useState(EUser.sub.name);
    const [iSubPrice, changeISubPrice] = useState(EUser.sub.price);
    const [iSubTaxes, changeISubTaxes] = useState(EUser.sub.taxes);

    const [link, changeLink] = useState("/edituser");
    const [Dlink, changeDLink] = useState("/edituser");
    useEffect(() => {
        console.log(EUser);
        dispatch(setUserStatus(""));

    }, [])
    useEffect(() => {
        if (iBalance >= 0 && iName != "" && iName != null && iSales >= 0 && iTransactions >= 0 && iSubPrice >= 0 && iSubTaxes >= 0 && iOrderTarget >= 0 && iScore >= 0 && iPassword != "" && iPassword != null && iFirstName != "" && iFirstName != null && iSecondName != "" && iSecondName != null && iPassword != "" && iPassword != null && iCardNumber != "" && iCardNumber != null && iCardCVV != "" && iCardCVV != null && iMail != "" && iMail != null && iRoleName != "" && iRoleName != null && iRoleStatus != "" && iRoleStatus != null && iSubName != "" && iSubName != null) {
            changeLink("/users");
        }
        else {
            changeLink("/edituser");
        }
    }, [iBalance, iName, iSales, iTransactions, iSubPrice, iSubTaxes, iOrderTarget, iScore, iPassword, iFirstName, iSecondName, iPassword, iCardNumber, iCardCVV, iMail, iRoleName, iRoleStatus, iSubName])

    useEffect(() => {
        if (UserStatus == "User was deleted") {
            changeDLink("/users");
        }
    }, [UserStatus])

    return (
        <div className="Page">
            <div className={mainStyle.MainPage}>
                <Navigation />
                <div className={style.Products}>
                    <div className={`${style.Orders} ${style.ProductCard}`}>
                        <span style={{ alignSelf: `center` }}>Edit Product:</span>
                        <div>
                            <span>Id: {EUser.id}</span>
                        </div>
                        <div>
                            <span>Img:</span>
                            <br />
                            <span>Current: {EUser.userImg}</span>
                            <br />
                            <div className={style.ImgPerson}>
                                <img className={style.ImgPerson} src={`${EUser.userImg}`} />
                            </div>
                            <br />
                            <input className='SpecialColorWhite' value={iUserImg} onChange={(e) => {
                                changeIUserImg(e.target.value);
                            }} />
                            <br />
                            <div className={style.ImgPerson}>
                                <img className={style.ImgPerson} src={`${iUserImg}`} />
                            </div>
                        </div>
                        <div>
                            <span>Name:</span>
                            <br />
                            <span>Current: {EUser.userInfo.name}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iName} onChange={(e) => {
                                changeIName(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>Balance:</span>
                            <br />
                            <span>Current: <span className={mainStyle.Price}>{EUser.balance} $</span></span>
                            <br />
                            <input className='SpecialColorWhite' value={iBalance} onChange={(e) => {
                                changeIBalance(e.target.value);
                            }} type="number" />
                        </div>
                        <div>
                            <span>Sales:</span>
                            <br />
                            <span>Current: <span className={mainStyle.Price}>{EUser.sales} $</span></span>
                            <br />
                            <input className='SpecialColorWhite' value={iSales} onChange={(e) => {
                                changeISales(e.target.value);
                            }} type="number" />
                        </div>
                        <div>
                            <span>Transactions:</span>
                            <br />
                            <span>Current: {EUser.transactions}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iTransactions} onChange={(e) => {
                                changeITransactions(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>Score:</span>
                            <br />
                            <span>Current: {EUser.score}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iScore} onChange={(e) => {
                                changeIScore(e.target.value);
                            }} type="number" />
                        </div>
                        <div>
                            <span>Order Target:</span>
                            <br />
                            <span>Current: {EUser.orderTarget}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iOrderTarget} onChange={(e) => {
                                changeIOrderTarget(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>First Name:</span>
                            <br />
                            <span>Current: {EUser.userInfo.firstName}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iFirstName} onChange={(e) => {
                                changeIFirstName(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>Second Name:</span>
                            <br />
                            <span>Current: {EUser.userInfo.secondName}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iSecondName} onChange={(e) => {
                                changeISecondName(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>PassWord:</span>
                            <br />
                            <span>Current: {EUser.userInfo.passWord}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iPassword} onChange={(e) => {
                                changeIPassword(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>Card:</span>
                            <br />
                            <span>Current Number: {EUser.userInfo.card.card}</span>
                            <br />
                            <span>Current CVV: {EUser.userInfo.card.cvv}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iCardNumber} onChange={(e) => {
                                changeICardNumber(e.target.value);
                            }} />
                            <br />
                            <input className='SpecialColorWhite' value={iCardCVV} onChange={(e) => {
                                changeICardCVV(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>Mail:</span>
                            <br />
                            <span>Current: {EUser.userInfo.mail.name}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iMail} onChange={(e) => {
                                changeIMail(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>Role:</span>
                            <br />
                            <span>Current Position: {EUser.role.name}</span>
                            <br />
                            <span>Current Status: {EUser.role.status}</span>
                            <br />
                            <input className='SpecialColorWhite' value={iRoleName} onChange={(e) => {
                                changeIRoleName(e.target.value);
                            }} />
                            <br />
                            <input className='SpecialColorWhite' value={iRoleStatus} onChange={(e) => {
                                changeIRoleStatus(e.target.value);
                            }} />
                        </div>
                        <div>
                            <span>Subscription:</span>
                            <br />
                            <span>Current Name: {EUser.sub.name}</span>
                            <br />
                            <span>Current Price: <span className={mainStyle.Price}>{EUser.sub.price} $</span></span>
                            <br />
                            <span>Current Taxes: <span className={mainStyle.Price}>{EUser.sub.taxes} $</span></span>
                            <br />
                            <input className='SpecialColorWhite' value={iSubName} onChange={(e) => {
                                changeISubName(e.target.value);
                            }} />
                            <br />
                            <input className='SpecialColorWhite' value={iSubPrice} onChange={(e) => {
                                changeISubPrice(e.target.value);
                            }} type="number" />
                            <input className='SpecialColorWhite' value={iSubTaxes} onChange={(e) => {
                                changeISubTaxes(e.target.value);
                            }} type="number" />
                        </div>
                        <span>{UserStatus}</span>
                        <div>
                            <Link className='NoneDec' to={`${link}`}><button onClick={() => {
                                if (iBalance >= 0 && iName != "" && iName != null && iSales >= 0 && iTransactions >= 0 && iSubPrice >= 0 && iSubTaxes >= 0 && iOrderTarget >= 0 && iScore >= 0 && iPassword != "" && iPassword != null && iFirstName != "" && iFirstName != null && iSecondName != "" && iSecondName != null && iPassword != "" && iPassword != null && iCardNumber != "" && iCardNumber != null && iCardCVV != "" && iCardCVV != null && iMail != "" && iMail != null && iRoleName != "" && iRoleName != null && iRoleStatus != "" && iRoleStatus != null && iSubName != "" && iSubName != null) {
                                    dispatch(editUserAsync({ Id: EUser.id, Balance: iBalance, UserName: iName, UserImg: iUserImg, Sales: iSales, Transactions: iTransactions, Score: iScore, OrderTarget: iOrderTarget, FirstName: iFirstName, SecondName: iSecondName, Password: iPassword, CardNumber: iCardNumber, CardCVV: iCardCVV, Mail: iMail, RoleName: iRoleName, RoleStatus: iRoleStatus, SubName: iSubName, SubPrice: iSubPrice, SubTaxes: iSubTaxes }));
                                }
                                else {
                                    if (User.id < 0) {
                                        dispatch(setUserStatus("You are not registraited"));
                                    }
                                    else {
                                        dispatch(setUserStatus("Something is wrong"));
                                    }
                                }
                            }} type="button" className="MButton btn btn-primary">Confirm</button></Link>


                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Delete
                            </button>


                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content SpecialColor">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body SpecialColorWhite">
                                            If you delete this user, all orders which are connected with this user will be deleted too!
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                             <Link className='NoneDec' to={`${Dlink}`}><button data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                                if (User.id < 0) {
                                                    dispatch(setUserStatus("You are not registraited"));
                                                    return;
                                                }
                                                dispatch(deleteUserAsync({ id: EUser.id }));
                                            }} type="button" className="MButton btn btn-primary">Delete</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}