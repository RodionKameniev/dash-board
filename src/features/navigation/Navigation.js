import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, json } from 'react-router-dom';
import {
    selectUser,
    setUser
} from '../registration/registrationSlice'

export function Navigation() {
    const dispatch = useDispatch();
    const User = useSelector(selectUser);
    useEffect(()=>{
        
        if(User.id!=-1){
            localStorage.setItem("user",  JSON.stringify(User));
        }
        //console.log(localStorage.getItem("user"));
        if(localStorage.getItem("user")!=null){
            dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
        }
        //console.log(User);
    }, [])
    function putAdminBar() {
        console.log(User.role.name + " " + User.role.status)
        if (User.role.name == "admin" && User.role.status == "active") {
            return <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="SpecialColor accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        Admin Bar
                    </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className='NavigationElem accordion-body'>
                        <Link className='NoneDec' to="/users">All Users</Link>
                        <Link className='NoneDec' to="/addadmin">Add Admin</Link>
                    </div>
                </div>
            </div>
        }
    }
    return (
        <div className='SpecialColor SpecialSize Navigation'>
            <div className="accordion SpecialSize" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="SpecialColor accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Account Actions
                        </button>
                    </h2>
                    <div id="collapseOne" className="SpecialColor accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className='NavigationElem accordion-body'>
                            <Link className='NoneDec' to="/account" >My Account</Link>
                            <Link className='NoneDec' to="/" >MainPage</Link>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="SpecialColor accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Products
                        </button>
                    </h2>
                    <div id="collapseTwo" className="SpecialColor accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className='NavigationElem accordion-body'>
                            <Link className='NoneDec' to="/addproduct" >Add Product</Link>
                            <Link className='NoneDec' to="/myproducts">My Products</Link>
                            <Link className='NoneDec' to="/products">See All Products</Link>
                            <Link className='NoneDec' to="/cellproducts">Show All Products</Link>
                            <Link className='NoneDec' to="/addorder">Make an Order</Link>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="SpecialColor accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Account Information
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className='NavigationElem accordion-body'>
                            <Link className='NoneDec' to="/history" >See My History</Link>
                            <Link className='NoneDec' to="/orders">See My Active Orders</Link>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="SpecialColor accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Actions
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className='NavigationElem accordion-body'>
                            <Link className='NoneDec' to="/registration">Log In</Link>
                            <Link className='NoneDec' to="/logout">Log Out</Link>
                        </div>
                    </div>
                </div>
                {putAdminBar()}
            </div>
        </div>
    )
}
