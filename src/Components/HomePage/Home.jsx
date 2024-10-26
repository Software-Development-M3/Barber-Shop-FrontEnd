import "./Home.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState,useEffect } from 'react';
import axios from 'axios';


function Home() {
  const [shopData, setShops] = useState([]);
  const navigate = useNavigate();
  const { search } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3000/shop')
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
        if (error.response && error.response.status === 401) {
        
        }
    });
  }, []);
       

  // const shopData = [
  //   {
  //     id: 4,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1RIDBpopQWp6W-9iYyd_Dey4ol4GjTxZwA&s",
  //     name: "Sansuay Shop",
  //     description: "ร้านแสนสวยช็อป บริการตัดผมชายหญิง บริการทุกระดับประทีบใจ ร้านทำผมที่มีคุณภาพในเรื่องยืด ดัด ทำสีและทรีทเม้นท์ รักษาผมร่วง ผมเสียให้มีสุขภาพแข็งแรง ทำสีผมสวย ดัดเพิ่มวอลลุ่มเพิ่มวอลุ่มโคนผม แก้ปัญหาผมเสียให้สุขภาพผมแข็งแรง ช่างผมที่คุณไว้วางใจ แก้ผมพังให้ปังสวย" ,             
  //     open: 1,
  //     timeOpen : "10.00",
  //     timeClose :"19.00",
  //     tags: ['korean', 'modern'],
  //     location: "ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพฯ 10520, ประเทศไทย"
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1RIDBpopQWp6W-9iYyd_Dey4ol4GjTxZwA&s",
  //     name: "Sansuay Shop",
  //     description: "สระผม",
  //     open: 0,
  //     timeOpen : "10.00",
  //     timeClose :"19.00",
  //     tags: ['classic'],
  //     location: "ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพฯ 10520, ประเทศไทย"

  //   },

  //   {
  //     id: 3,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1RIDBpopQWp6W-9iYyd_Dey4ol4GjTxZwA&s",
  //     name: "Fighter Shop",
  //     description: "ร้านแสนสวยช็อป บริการตัดผมชายหญิง บริการทุกระดับประทีบใจ ร้านทำผมที่มีคุณภาพในเรื่องยืด ดัดทำสีและทรีทเม้นท์ รักษาผมร่วง ผมเสียให้มีสุขภาพแข็งแรง ทำสีผมสวย ดัดเพิ่มวอลลุ่มเพิ่มวอลุ่มโคนผมแก้ปัญหาผมเสียให้สุขภาพผมแข็งแรง ช่างผมที่คุณไว้วางใจ แก้ผมพังให้ปังสวย",
  //     tags: ['korean']

  //   },
  // ];

  const [selectedTag, setSelectedTag] = useState('');

  // ฟังก์ชันสำหรับการกรองร้านค้า
  const filterShopsByTag = (tag) => {
    // ถ้าแท็กที่เลือกอยู่เท่ากับแท็กที่ถูกกดซ้ำ จะยกเลิกการเลือก
    if (selectedTag === tag) {
      setSelectedTag(''); // ยกเลิกการเลือกแท็ก
    } else {
      setSelectedTag(tag); // เลือกแท็กใหม่
    }
  };
  const filteredShops = selectedTag
    ? shopData.filter((shop) => shop.tags && shop.tags.includes(selectedTag))
    : shopData;
    
  

  //เช็คว่าเปิดหรือปิด
  const parseTime = (timeString) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(".");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0);
    return date;
  };

  
  const isOpen = (openTime, closeTime) => {
    const now = new Date();
    const open = parseTime(openTime);
    const close = parseTime(closeTime);
    console.log(now >= open && now <= close)
    
    return now >= open && now <= close;
  };
  //เช็คว่าเปิดหรือปิด
  
  const goToShopProfile = (shopid) => {
    navigate(`/shop/${shopid}`);
  };

  const convertToArray = (input) => {
    if (typeof input !== 'string') {
      return []; // Return an empty array if input is not a string
    }
    
    const trimmed = input.replace(/^{|}$/g, '').replace(/"/g, '');
    return trimmed.split(',').map((tag) => tag.trim());
  };

  return (
    <>
      
      <div className="tag-div">
      <button onClick={() => filterShopsByTag('korean')}
          style={{
            backgroundColor: selectedTag === 'korean' ? '#72D572' : 'white',
            color: selectedTag === 'korean' ? 'white' : 'black',
          }}>korean</button>
        <button onClick={() => filterShopsByTag('cool')}
          style={{
            backgroundColor: selectedTag === 'cool' ? '#72D572' : 'white',
            color: selectedTag === 'cool' ? 'white' : 'black',
          }}>cool</button>
        <button onClick={() => filterShopsByTag('modern')}
          style={{
            backgroundColor: selectedTag === 'modern' ? '#72D572' : 'white',
            color: selectedTag === 'modern' ? 'white' : 'black',
          }}>modern</button>
        <button onClick={() => filterShopsByTag('vintage')}
          style={{
            backgroundColor: selectedTag === 'vintage' ? '#72D572' : 'white',
            color: selectedTag === 'vintage' ? 'white' : 'black',
          }}>vintage</button>
      </div>
      <div className="main-section">
        {filteredShops.map((item) => (
          <div
            className="shop-item"
            key={item.id}
            onClick={() => goToShopProfile(item.id)}
          >
            <img src={item.image} alt={item.name} className="shop-image" />
            <div className="shop-details">
              <div className="shop-name">
                <h3>{item.name}</h3>              
              
                {convertToArray(item.tags).map((tag) => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              <p>{item.description}</p>
              <p>ที่อยู่ {item.location}</p>

            </div>
            <div className="shop-meta">
              { isOpen(item.timeOpen, item.timeClose) ? 
              <div style={{backgroundColor : "#72D572" }}>เปิดอยู่</div> 
              : <div style={{backgroundColor : "#d66767" }} >ปิด</div>}
              <p>{item.timeOpen} - {item.timeClose}</p>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;