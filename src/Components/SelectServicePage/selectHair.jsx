import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./selectHair.css";

function HairStyleSelection() {
  const {shopid} = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState(null);
  const [selectedShampoo, setSelectedShampoo] = useState("");
  const [selectedHairCut, setSelectedHairCut] = useState(null);
  const [selectedHairWash, setSelectedHairWash] = useState(null);
  const [selectedHairDye, setSelectedHairDye] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [colorSelected , setColorSelected] = useState("");
  const [cutDescription , setCutDescription] = useState("");
  const [washDescription , setWashDescription] = useState("");
  const [dyeDescription , setDyeDescription] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`http://localhost:3000/shop/service/${shopid}`);
        const data = await response.json();
        console.log(data);
        setServices(data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };
    fetchServices();
  }, [shopid]);

  const handleNavigate = (path) => {
    navigate(path);
};
  useEffect(() => {
    let time = 0;
    let price = 0;

    if (selectedHairCut) {
      time += selectedHairCut.duration;
      price += selectedHairCut.price;
    }
    if (selectedHairDye) {
      time += selectedHairDye.duration;
      price += selectedHairDye.price;
    }

    if (selectedHairWash) {
      time += selectedHairWash.duration;
      price += selectedHairWash.price;
    }

    setTotalTime(time);
    setTotalPrice(price);


    sessionStorage.setItem(
      "selectedServices",
      JSON.stringify({selectedShampoo,
                      selectedHairWash,
                      selectedHairCut,
                      selectedHairDye,
                      totalTime,
                      totalPrice,
                      washDescription,
                      cutDescription,
                      dyeDescription,
                      colorSelected
                    })
    );
  }, [selectedShampoo,
      selectedHairWash,
      selectedHairCut,
      selectedHairDye,
      totalTime,
      totalPrice,
      washDescription,
      cutDescription,
      dyeDescription,
      colorSelected
    ]);

  if (!services) {
    return <div>Loading services...</div>;
  }
  console.log(JSON.parse(sessionStorage.getItem("selectedServices")))
  return (
    <div className="selectionPageContainer">

    <div className="hairStyleSelection">

      <h1>เลือกบริการที่ต้องการ</h1>
      
      <div className="serviceSelection">
        {/* Hair wash */}
        <div className="servicesContainer">
          <div className="servicePic"><img src="\src\assets\781589.png"/></div>
          <div className = "selectedPart">
            <label className="hairCatagories">บริการสระผม</label>
            <select
              onChange={(e) =>
                setSelectedHairWash(services.hairwashing.find((cut) => cut.serviceId === parseInt(e.target.value)))
              }
            >
              <option value="">Select hair wash</option>
              {services.hairwashing && services.hairwashing.map((wash) => (
                <option key={wash.serviceId} value={wash.serviceId}>
                  {wash.serviceName} - {wash.duration} mins - {wash.price} baht
                </option>
              ))}
              </select>
            </div>
            {/* Shampoo */}
            <div className = "selectedPart">
              <label></label>
              <select onChange={(e) => setSelectedShampoo(e.target.value)}>
                <option value="">Select Shampoo</option>
                {services.shampoos && services.shampoos.map((shampoo, index) => (
                  <option key={index} value={shampoo}>
                    {shampoo}
                  </option>
                ))}
              </select>
            </div>
            <div className="textArea">
              <label></label>
              <textarea
                value={washDescription}
                onChange={(e) => setWashDescription(e.target.value)}
                placeholder="Additional details about the hairwash..."
              />
            </div>
          </div>
          {/* Hair Dye */}
          <div className="servicesContainer">
          <div className="servicePic"><img src="\src\assets\1005689.png"/></div>
            <div className = "selectedPart">
              <label className="hairCatagories">บริการย้อมผม</label>
              <select
                onChange={(e) =>
                  setSelectedHairDye(services.hairdyeing.find((dye) => dye.serviceId === parseInt(e.target.value)))
                }
              >
                <option value="">Select Hair Dye</option>
                {services.hairdyeing && services.hairdyeing.map((dye) => (
                  <option key={dye.serviceId} value={dye.serviceId}>
                    {dye.serviceName} - {dye.duration} mins - {dye.price} baht
                  </option>
                ))}
              </select>
            </div>
            {/* Colors */}
            <div className = "selectedPart">
              
              <label></label>
              <select onChange={(e) => setColorSelected(e.target.value)}>
                <option value="">Select Color</option>
                {services.colors && services.colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="textArea">
              <label></label>
              <textarea
                value={dyeDescription}
                onChange={(e) => setDyeDescription(e.target.value)}
                placeholder="Description for hair wash...."
              />
            </div>
          </div>
  
    
          {/* Hair Cut */}
          <div className="servicesContainer">
          <div className="servicePic"><img src="\src\assets\40861.png"/></div>
            <div className = "selectedPart">
              <label className="hairCatagories">บริการตัดผม</label>
              <select
                onChange={(e) =>
                  setSelectedHairCut(services.haircut.find((cut) => cut.serviceId === parseInt(e.target.value)))
                }
                >
                <option value="">Select hair cut</option>
                {services.haircut && services.haircut.map((cut) => (
                  <option key={cut.serviceId} value={cut.serviceId}>
                    {cut.serviceName} - {cut.duration} mins - {cut.price} baht
                  </option>
                ))}
              </select>
            </div >
            <div className="textArea">
              <label></label>
              <textarea
                value={cutDescription}
                onChange={(e) => setCutDescription(e.target.value)}
                placeholder="Description for hair cut...."
                />
            </div>
          </div>
        </div>
    
        
        <div className="summary">
          <h2>เวลาที่ใช้ทั้งหมด: {totalTime} นาที</h2>
          <h2>ราคารวม: {totalPrice} บาท</h2>
          <div className="sumButtonContainer">
            <div className="backBut"><button className="btn-hover goBack" onClick={() => handleNavigate(`/shop/${shopid}`)}>กลับหน้าร้านค้า</button></div>
            <div className="selectSchedBut"><button className="btn-hover bookNow" onClick={() => handleNavigate(`/booking/schedule/${shopid}`)}>จองเวลา</button></div>
            
          </div>
        </div>
      </div>
    </div>
  );
}  

export default HairStyleSelection;
