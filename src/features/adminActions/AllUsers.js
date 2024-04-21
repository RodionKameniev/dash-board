import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from '../navigation/Navigation';
import style from "./Admin.module.css"
import mainStyle from "../mainPage/MainPage.module.css"
import {
    selectUserList,
    getAllUsersAsync,
    setEUser,
} from './adminSlice'
import {
    selectUser
} from '../registration/registrationSlice'
import { Link } from 'react-router-dom';
export function AllUsers(props) {
    const dispatch = useDispatch();
    const User = useSelector(selectUser);
    const UserList = useSelector(selectUserList);
    // const listSize = useSelector(selectListSize);
    const [listSize, setListSize] = useState(UserList.length);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [numOfPages, setNumOfPages] = useState(0);
    const [position, setPosition] = useState(1);
    const [NameFilter, setNameFilter] = useState("");
    const [RoleNameFilter, setRoleNameFilter] = useState("");
    const [RoleStatusFilter, setRoleStatusFilter] = useState("");
    const [IdFilter, setIdFilter] = useState("");
    useEffect(() => {
        dispatch(getAllUsersAsync());
        console.log(UserList);
        setNumOfPages(Math.ceil(listSize / usersPerPage));
        console.log("listSize: " + listSize);
        console.log("numOfPages: " + numOfPages);
    }, [listSize]);
    useEffect(() => {
        setListSize(UserList.filter((item) => {
            if (item.role.name.includes(RoleNameFilter) && item.role.status.includes(RoleStatusFilter) && item.userInfo.name.includes(NameFilter) && `${item.id}`.includes(IdFilter)) {
                return true;
            }
            else {
                return false;
            }
        }).length)
    }, [NameFilter, RoleNameFilter, RoleStatusFilter, IdFilter]);
    function putPlusButton(user) {
        if (user.role.name != "admin") {
            return <Link className='NoneDec' to="/edituser"><button onClick={() => {
                dispatch(setEUser(user));
            }} className={`AddButtonStyle SpecialColorWhite`}>{`*`}</button></Link>
        }
        else{
            return <button className={`AddButtonStyle SpecialColorWhite`}>{`X`}</button>
        }
    }

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
    function putAllUsers() {
        return (
            <table>
                <thead>
                    <tr>
                        <td>
                            <span className={mainStyle.Small}>Name</span>
                        </td>
                        <td>
                            <span className={mainStyle.Small}>Role Name</span>
                        </td>
                        <td>
                            <span className={mainStyle.Small}>Role Status</span>
                        </td>
                        <td>
                            <span className={mainStyle.Small}>Id</span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input onChange={(e) => {
                                setNameFilter(e.target.value);
                            }} placeholder='Product Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                        <td>
                            <input onChange={(e) => {
                                setRoleNameFilter(e.target.value);
                            }} placeholder='Role Name Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                        <td>
                            <input onChange={(e) => {
                                setRoleStatusFilter(e.target.value);
                            }} placeholder='Role Status Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                        <td>
                            <input onChange={(e) => {
                                setIdFilter(e.target.value);
                            }} placeholder='Id Filter' className={`SpecialColorWhite ${mainStyle.Small}`} />
                        </td>
                    </tr>
                </tbody>
                {UserList.filter((item) => {
                    if (item.role.name.includes(RoleNameFilter) && item.role.status.includes(RoleStatusFilter) && item.userInfo.name.includes(NameFilter) && `${item.id}`.includes(IdFilter)) {
                        return true;

                    }
                    else {
                        return false;
                    }
                }).sort((item1, item2) => {
                    if (item1.role.name == "admin" && item2.role.name != "admin") {
                        return -1;
                    }
                    return 0;
                }).slice((position - 1) * 10, (position) * 10).map((user) => {
                    return (
                        <tbody key={`user${user.id}`}>
                            <tr>
                                <td>
                                    <span>{user.userInfo.name}</span>
                                </td>
                                <td>
                                    <span>{user.role.name}</span>
                                </td>
                                <td>
                                    <span>{user.role.status}</span>
                                </td>
                                <td>
                                    <span>{user.id}</span>
                                </td>
                                <td>
                                    {putPlusButton(user)}
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        );
    }
    return (
        <div className="Page">
            <div className={mainStyle.MainPage}>
                <Navigation />
                <div className={style.Admin}>
                    <div className="col">
                        <div className={"row" + style.MiddleSize} >
                            <div className={style.Action}>
                                {putAllUsers()}
                                {putPagination()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}