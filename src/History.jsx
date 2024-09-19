import './App.css'
import { Link } from "react-router-dom";

function History() {
    const historyData = [
      {
        id: 4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1RIDBpopQWp6W-9iYyd_Dey4ol4GjTxZwA&s',
        name: 'Sansuay Shop',
        description: 'ตัดผม รองทรงไว้ข้างหน้า ไม่ไถหมด ข้างหลังไว้ยาว',
        date: '1/1/2567',
        time: '13.00-15.00',
        price: '300 บาท'
      },
      {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1RIDBpopQWp6W-9iYyd_Dey4ol4GjTxZwA&s',
        name: 'Sansuay Shop',
        description: 'สระผม',
        date: '1/1/2567',
        time: '13.00-15.00',
        price: '300 บาท'
      },
      {
        id: 3
      }
    ];
    
  
    return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/History">History</Link>
      </nav>

      <div className="history-section">
        <h2>History</h2>
        {historyData.map((item) => (
          <div className="history-item"  key={item.id} onClick={() => console.log(item.id)}>
            <img src={item.image} alt={item.name} className="shop-image" />
            <div className="shop-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div className="shop-meta">
              <p>{item.date}</p>
              <p>{item.time}</p>
              <p>{item.price}</p>
            </div>
          </div>
        
        ))}
      </div>
      </>
    );
  };

export default History;