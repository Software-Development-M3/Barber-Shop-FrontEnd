import React from 'react'

import ProfileIcon from '../assets/ProfileIcon.png';


import './ViewProfile.css';
import axios from 'axios';

const ViewProfile = () => {

let jwt_token = JSON.parse(sessionStorage.getItem('token'));
const GetProfileDate = async () => {
    const response = await axios.get("http://localhost:3000/profile",{headers: {"Authorization" : `Bearer ${jwt_token}`}})
    console.log(response);
    return response
}
const resp = {
    "uesrname": "Racha",
    "tel": "0819998888"
  }



  return (
    <div className='page'>
        <div className='card_profile'>
            <img src={ProfileIcon}></img>
            <h1>{resp.uesrname}</h1>
            <h2>{resp.tel}</h2>
            <button>Back</button>
        </div>
    </div>
  )
}

export default ViewProfile