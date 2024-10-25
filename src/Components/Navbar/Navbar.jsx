import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';

const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    console.log(query);
};

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src= {logo} alt="Barber Shop Logo" className="logo-img" />
                </Link>
            </div>
            <div className="navbar-logo">
                <Link to="/">
                    <span className="logo-text">Barber Shop</span>
                </Link>
            </div>

            <div className="navbar-search">
                <form onSubmit={handleSearch}>
                    <input type="text" name="search" placeholder="Search..." className="search-input" />
                </form>
            </div>

            <div className="navbar-links">
                <Link to="/calendar">Calendar</Link>
                <Link to="/history">History</Link>
                <Link to="/profile">Profile</Link>
            </div>

            <div className="navbar-auth">
                <Link to='/login'>
                    <botton className='authbotton-signup'>Sign in</botton>
                </Link>
                <Link to='/register'>
                    <botton className="authbutton-signup">Register</botton>
                </Link>     
            </div>

        </nav>
    );
};

export default Navbar;
