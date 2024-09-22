import "./App.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Home() {
  const historyData = [
    {
      id: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1RIDBpopQWp6W-9iYyd_Dey4ol4GjTxZwA&s",
      name: "Sansuay Shop",
      description: "ร้านแสนสวยช็อป บริการตัดผมชายหญิง บริการทุกระดับประทีบใจ ร้านทำผมที่มีคุณภาพในเรื่องยืด ดัด ทำสีและทรีทเม้นท์ รักษาผมร่วง ผมเสียให้มีสุขภาพแข็งแรง ทำสีผมสวย ดัดเพิ่มวอลลุ่มเพิ่มวอลุ่มโคนผม แก้ปัญหาผมเสียให้สุขภาพผมแข็งแรง ช่างผมที่คุณไว้วางใจ แก้ผมพังให้ปังสวย ที่อยู่ ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพฯ 10520 ประเทศไทย" ,             
      open: 1,
      timeOpen : "10.00",
      timeClose :"19.00"
      
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1RIDBpopQWp6W-9iYyd_Dey4ol4GjTxZwA&s",
      name: "Sansuay Shop",
      description: "สระผม",
      open: 0,
      timeOpen : "10.00",
      timeClose :"19.00"
    },

    {
      id: 3,
    },
  ];

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
  
  const navigate = useNavigate();
  const goToShopProfile = (id) => {
    navigate(`/Shop/${id}`);
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/History">History</Link>
      </nav>

      <div className="history-section">
        {historyData.map((item) => (
          <div
            className="history-item"
            key={item.id}
            onClick={() => goToShopProfile(item.id)}
          >
            <img src={item.image} alt={item.name} className="shop-image" />
            <div className="shop-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div className="shop-meta">
              { isOpen(item.timeOpen, item.timeClose) ? <div style={{backgroundColor : "#72D572" }}>เปิดอยู่</div> : <div style={{backgroundColor : "#d66767" }} >ปิด</div>}
              <p>{item.timeOpen} - {item.timeClose}</p>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;