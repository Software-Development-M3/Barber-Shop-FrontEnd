import React, { useState, useEffect } from 'react'

import "./Profile.css"
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import profile_img from '../../assets/components/ndet.jpg'
import background_img from '../../assets/components/ShopBackground.jpg'

const Profile = () => {


  const [profile_data, setProfile_data] = useState({
    "id": "4cd0a6c3-55f8-454c-a451-ffe4fe6b94f0",
    "fullname": "racha racha",
    "email": "aaaaa@gmail.com",
    "password": "111111",
    "telephone": "0000000000"
})

  
  useEffect(() => {
    const current_token = sessionStorage.getItem("token");
    const decode_token = jwtDecode(current_token);
    const current_user_id = decode_token.sub;
    
    axios.get(`http://localhost:3000/customer/find/${current_user_id}`)
    .then(resp => resp.data)
    .then(data => setProfile_data(data))

  }, [])
  

  useState(() => {
    axios.get("http://localhost:3000/customer/find/")
  })
  return (
    <div className='profile_page'>
        <div className="profile-card">
            <div className="profile-picture">
                <img src={profile_img} className='profile_img' alt="Profile Picture"/>
            </div>
            <div className="profile-info">
                <h2 className='profile_name'>Profile: {profile_data.fullname} </h2>
                <p className='profile_tel'>Tel : {profile_data.telephone}</p>
                <p className='profile_email'>Email : {profile_data.email}</p>
            </div>
        </div>
    </div>
  )
}

export default Profile