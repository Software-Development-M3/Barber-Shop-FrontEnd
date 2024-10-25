import './Upcoming.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';

function Upcoming() {
    const navigate = useNavigate();

    //const [bookingData, setBooking] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage

      //if (!token) {
      //  console.log('Token not found');
      //  navigate('/'); 
      //  return;
      //}
  
      // Fetch bookings with token
      axios.get('/booking', {
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
      if (window.confirm("Are you sure you want to cancel this booking?")) {
        axios.delete(`/booking/${bookingId}`)
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

    const bookingData = [
      {
        "bookingId": 90,
        "shopId": 3,
        "shopName": "สุดหล่อ shop",
        "services": {
          "haircut": {
            "serviceName": "COMMA",
            "additionalRequirement": "ไว้ผมหน้ายาว ไม่โกนหนวด"
          },
          "hairDry": null,
          "hairWash": null
        },
        "barberName": "ช่างเจมส์",
        "price": 400,
        "date": "11-8-2024",
        "startTime": "11-8-2024T09:30",
        "endTime": "11-8-2024T11:30"
      },
      {
        "bookingId": 12,
        "shopId": 2,
        "shopName": "แสนสวน shop",
        "services": {
          "haircut": {
            "serviceName": "TWO BLOCK",
            "additionalRequirement": "ไว้ผมหน้ายาว ไม่โกนหนวด"
          },
          "hairDry": {
            "serviceName": "ย้อมสีผมชาย",
            "color": "ทอง",
            "additionalRequirement": null
          },
          "hairWash": {
            "serviceName": "สระธรรมดา",
            "champoo": "L'OREAL Paris",
            "additionalRequirement": "สระเบาๆ"
          }
        },
        "barberName": "ช่างแอม",
        "price": 400,
        "date": "11-10-2024",
        "startTime": "11-10-2024T09:30",
        "endTime": "11-10-2024T11:30"
      }
    ];

    const formatDate = (dateStr) => {
      const dateObj = new Date(dateStr);
      return dateObj.toLocaleDateString('th-TH', { day: 'numeric', month: 'numeric', year: 'numeric' });
    };
  
    const formatTimeRange = (startTime, endTime) => {
      // Ensure startTime and endTime are in correct format
      
      const start = startTime.slice(-5);
      const end = endTime.slice(-5);
    
      return `${start}-${end}`;
    };
  
    return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/upcoming">Upcoming</Link>
      </nav>

      <div className="main-section">
        <h2>Upcoming</h2>
        {bookingData.map((item) => {
          // Concatenate the service names from haircut, hairDry, and hairWash
          const serviceNames = [
            item.services?.haircut?.serviceName,
            item.services?.hairDry?.serviceName,
            item.services?.hairWash?.serviceName
          ].filter(Boolean).join(' + ');
          
          const formattedDate = formatDate(item.date);
          const formattedTimeRange = formatTimeRange(item.startTime, item.endTime);

          return (
            <div className="shop-item" key={item.bookingId}>
              <img src={item.image} alt={item.name} className="shop-image" />
              <div className="shop-details">
                <h3>{item.shopName}</h3>
                <p>{serviceNames}</p>
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
      </>
    );
  };

export default Upcoming;