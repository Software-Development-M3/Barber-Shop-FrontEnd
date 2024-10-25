import React from 'react'

import "./Profile.css"
const Profile = () => {
  return (

    <div className='card'>
        <div class="profile-card">
            <div class="profile-picture">
                <img src="your-image-url.jpg" alt="Profile Picture"/>
            </div>
            <div class="profile-info">
                <h2>Profile Name</h2>
                <p>Last Appointment: Today</p>
            </div>
        </div>
    </div>

  )
}

export default Profile