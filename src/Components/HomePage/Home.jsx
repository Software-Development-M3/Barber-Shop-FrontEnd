import "./Home.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState,useEffect } from 'react';
import axios from 'axios';


function Home() {
  const [shopData, setShops] = useState([]);
  const navigate = useNavigate();
  const { search } = useParams();
  const [selectedTag, setSelectedTags] = useState([]);

  useEffect(() => {
    const url = search 
      ? `http://localhost:3000/shop/search/name/${search}` 
      : `http://localhost:3000/shop`; 

    axios
      .get(url)
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => {
        console.error('Error fetching shops:', error);
      });
  }, [search]);
       

  
  

  // ฟังก์ชันสำหรับการกรองร้านค้า
  const filterShopsByTag = (tag) => {
    if (selectedTag.includes(tag)) {
      // If the tag is already selected, remove it
      setSelectedTags(selectedTag.filter((t) => t !== tag));
    } else {
      // Otherwise, add the new tag
      setSelectedTags([...selectedTag, tag]);
    }
  };
  const filteredShops = selectedTag.length > 0 
  ? shopData.filter((shop) => 
      shop.tags && selectedTag.every(tag => shop.tags.includes(tag))
    ) 
  : shopData;
    
  

  //เช็คว่าเปิดหรือปิด
  const parseTime = (timeString) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(":");
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

  return (
    <>
      
      <div className="tag-div">
      <button onClick={() => filterShopsByTag('korean')}
          style={{
            background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)',
            color: 'white',
            opacity: selectedTag.length === 0 || selectedTag.includes('korean') ? 1 : 0.3,
          }}>korean</button>
        <button onClick={() => filterShopsByTag('modern')}
          style={{
            background: 'linear-gradient(45deg, #a1c4fd, #c2e9fb)' ,
            color: 'white',
            opacity: selectedTag.length === 0 || selectedTag.includes('modern') ? 1 : 0.3,
          }}>modern</button>
        <button onClick={() => filterShopsByTag('vintage')}
          style={{
            background: 'linear-gradient(45deg, #fceabb, #f8b500)',
            color: 'white',
            opacity: selectedTag.length === 0 || selectedTag.includes('vintage') ? 1 : 0.3,
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
              
                {item.tags?.map((tag) => {
                  let tagStyle = {};
                                
                  switch (tag) {
                    case 'korean':
                      tagStyle = { background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)' }; // Pink gradient for Korean
                      break;
                    case 'modern':
                      tagStyle = { background: 'linear-gradient(45deg, #a1c4fd, #c2e9fb)' }; // Blue gradient for Modern
                      break;
                    case 'vintage':
                      tagStyle = { background: 'linear-gradient(45deg, #fceabb, #f8b500)' }; // Purple gradient for Vintage
                      break;
                    default:
                      tagStyle = { background: 'linear-gradient(45deg, #ddd, #eee)' }; // Default gray gradient
                      break;
                  }
                
                  return (
                    <span key={tag} className="tag" style={{ ...tagStyle }}>
                      #{tag}
                    </span>
                  );
                })}

              </div>
              <p>{item.description}</p>
              <p>ที่อยู่ {item.location}</p>

            </div>
            <div className="shop-meta">
              { isOpen(item.timeOpen, item.timeClose) ? 
              <div style={{background: 'linear-gradient(to right, #72D572, #A8D9A1)' }}>เปิดอยู่</div> 
              : <div style={{background : 'linear-gradient(to right, #d66767, #e4a4a4)'}} >ปิด</div>}
              <p>{item.timeOpen} - {item.timeClose}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;