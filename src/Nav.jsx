import React from 'react';
function Navbar() {
  return(
    <div className="navbar">
        <div className="logo">
            <p>Logo</p>
            <p>Barber Shop</p>
        </div>
        <div className="search-bar">
            <form action ="">
                <input type="text" placeholder="Search...."/>
                
            </form>
            <button type="submit">Search</button>
            
        </div>
        <div className="menu-list">
            <ul>
                <li><a href='#calendar'>Calendar</a></li>
                <li><a href='#history'>History</a></li>
                <li><a href='#profile'>Profile</a></li>
            </ul>
        </div>
        <div className="noti-button">
            <p>P</p>
        </div>
        <div className="account-menu">
            <ul>
                <li><a href="sign-in">Sign in</a></li>
                <li><a href="sign-in">Sign up</a></li>
            </ul>
        </div>
    </div>
  );
}

export default Navbar;
