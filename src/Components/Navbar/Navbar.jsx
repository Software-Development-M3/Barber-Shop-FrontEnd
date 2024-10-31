import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';

const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    console.log(query);
};

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const handleLogout = () => {
        sessionStorage.removeItem('token'); // ลบ token เมื่อทำการล็อกเอาท์
        setIsLoggedIn(false); // อัปเดตสถานะล็อกอิน
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="Barber Shop Logo" className="logo-img" />
                </Link>
                <span className="logo-text">Barber Shop</span>
            </div>

            <div className="navbar-search">
                <form onSubmit={handleSearch}>
                    <input type="text" name="search" placeholder="Search..." className="search-input" />
                </form>
            </div>

            <div className="navbar-links">
                <Link to="/upcoming">Upcoming</Link>
                <Link to="/profile">Profile</Link>
            </div>

            {isLoggedIn ? (
                <div className="navbar-logout">
                    <button className="authbutton-logout" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                    <>
                    <div className="navbar-login">
                        <Link to='/login'>
                            <button className='authbutton-signin'>Login</button>
                        </Link>
                    </div>
                    <div className="navbar-register">
                        <Link to='/register'>
                            <button className="authbutton-signup">Register</button>
                        </Link>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
