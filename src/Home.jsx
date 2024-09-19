import "./App.css";
import { Link } from "react-router-dom";

function Home() {
  const historyData = [
    {
      id: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1RIDBpopQWp6W-9iYyd_Dey4ol4GjTxZwA&s",
      name: "Sansuay Shop",
      description: "ร้านแสนสวยช็อป บริการตัดผมชายหญิง บริการทุกระดับประทีบใจ ร้านทำผมที่มีคุณภาพในเรื่องยืด ดัด ทำสีและทรีทเม้นท์ รักษาผมร่วง ผมเสียให้มีสุขภาพแข็งแรง ทำสีผมสวย ดัดเพิ่มวอลลุ่มเพิ่มวอลุ่มโคนผม แก้ปัญหาผมเสียให้สุขภาพผมแข็งแรง ช่างผมที่คุณไว้วางใจ แก้ผมพังให้ปังสวย ที่อยู่ ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพฯ 10520 ประเทศไทย" ,             
      open: 1,
      time: "13.00-15.00",
      
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1RIDBpopQWp6W-9iYyd_Dey4ol4GjTxZwA&s",
      name: "Sansuay Shop",
      description: "สระผม",
      open: 0,
      time: "13.00-15.00",
      
    },
    {
      id: 3,
    },
  ];

//  const isopen = (item) =>{
   // return item.open === 1 ? <p>เปิดอยู่</p> : <p>ปิด</p>}
  

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
            onClick={() => console.log(item.id)}
          >
            <img src={item.image} alt={item.name} className="shop-image" />
            <div className="shop-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div className="shop-meta">
              {item.open === 1 ? <div>เปิดอยู่</div> : <div>ปิด</div>}
              <p>{item.time}</p>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;