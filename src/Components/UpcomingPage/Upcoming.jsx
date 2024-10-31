import './Upcoming.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Upcoming() {
    const navigate = useNavigate();

    const [bookingData, setBookings] = useState([]);

    useEffect(() => {
      const token = sessionStorage.getItem('token'); // Assuming the JWT token is stored in localStorage

      if (!token) {
        console.log('Token not found');
        navigate('/login'); 
        return;
      }
  
      // Fetch bookings with token
      axios.get('http://localhost:3000/booking', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request
        },
      })
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error);
          if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            //navigate('/');
          }
        });
    }, [navigate]);
  
    const handleCancelBooking = (bookingId) => {
      const token = sessionStorage.getItem('token'); // Assuming the JWT token is stored in localStorage
      if (window.confirm("Are you sure you want to cancel this booking?")) {
        axios.delete(`http://localhost:3000/booking/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
          .then((response) => {
            // Remove the canceled booking from the state
            setBookings(prevBookings => prevBookings.filter(item => item.bookingId !== bookingId));
            console.log('Booking canceled:', response.data);
          })
          .catch((error) => {
            console.error('Error canceling booking:', error);
          });
      }
    };

    
    const formatDate = (dateString) => {
      return dateString.replace(/-/g, '/');
    };
  
    const formatTimeRange = (startTime, endTime) => {
      // Ensure startTime and endTime are in correct format
      
      const start = startTime.slice(-5);
      const end = endTime.slice(-5);
    
      return `${start}-${end}`;
    };
  
    return (
    <div className='upcoming-container'>
      

      
        <h2>Upcoming</h2>
        {bookingData.map((item) => {
          // Concatenate the service names from haircut, hairDry, and hairWash
          const services = [
            item.services?.haircut,
            item.services?.hairdyeing,
            item.services?.hairwashing
          ];

          const serviceDetails = services
            .filter(Boolean)
            .map(service => {
              // Start with the service name
              const parts = [service.serviceName];
            
              // Add shampoo if it exists
              if (service.shampoo) {
                parts.push(service.shampoo);
              }

              // Add additional requirement if it exists
              if (service.additionalRequirement) {
                parts.push(service.additionalRequirement);
              }
            
              // Join parts with ' | '
              return parts.join(' | ');
          });
         
          const formattedDate = formatDate(item.date);
          const formattedTimeRange = formatTimeRange(item.startTime, item.endTime);

          return (
            <div className="shop-item" key={item.bookingId}>
              <img src={item.image} alt={item.name} className="shop-image" />
              <div className="shop-details">
                <h3>{item.shopName}</h3>
                <h2>{item.barberName}</h2>
                {serviceDetails.map((detail, index) => (
                  <p key={index}>{detail} </p>
                ))}
              </div>
              <div className="shop-meta">
                <p>{formattedDate}</p>
                <p>{formattedTimeRange}</p>
                <p>{item.price} บาท</p>
                <button onClick={() => handleCancelBooking(item.bookingId)}>
                  ยกเลิกการจอง
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
    );
  };

export default Upcoming;