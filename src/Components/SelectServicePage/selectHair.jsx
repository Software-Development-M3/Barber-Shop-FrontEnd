import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./selectHair.css";

function HairStyleSelection() {
  const {shopid} = useParams();
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

  return (
    <div className="hairStyleSelection">
      <h1>Hairstyle Selection</h1>
      
      <div className="serviceSelection">
        {/* Shampoo */}
        <div className = "selectedPart">
          <label>Shampoo</label>
          <select onChange={(e) => setSelectedShampoo(e.target.value)}>
            <option value="">Select Shampoo</option>
            {services.shampoos.map((shampoo, index) => (
              <option key={index} value={shampoo}>
                {shampoo}
              </option>
            ))}
          </select>
        </div>
  
        {/* Hair wash */}
        <div className = "selectedPart">
          <label>Hair Wash</label>
          <select
            onChange={(e) =>
              setSelectedHairWash(services.haircut.find((cut) => cut.serviceId === parseInt(e.target.value)))
            }
          >
            <option value="">Select hair wash</option>
            {services.hairwashing.map((wash) => (
              <option key={wash.serviceId} value={wash.serviceId}>
                {wash.serviceName} - {wash.duration} mins - {wash.price} baht
              </option>
            ))}
          </select>
        </div>
        <div className="textArea">
          <label>Description for hair wash</label>
          <textarea
            value={washDescription}
            onChange={(e) => setWashDescription(e.target.value)}
            placeholder="Additional details about the hairwash..."
          />
        </div>
  
        {/* Hair Cut */}
        <div className = "selectedPart">
          <label>Hair Cut</label>
          <select
            onChange={(e) =>
              setSelectedHairCut(services.haircut.find((cut) => cut.serviceId === parseInt(e.target.value)))
            }
          >
            <option value="">Select hair cut</option>
            {services.haircut.map((cut) => (
              <option key={cut.serviceId} value={cut.serviceId}>
                {cut.serviceName} - {cut.duration} mins - {cut.price} baht
              </option>
            ))}
          </select>
        </div >
        <div className="textArea">
          <label>Description for hair cut</label>
          <textarea
            value={cutDescription}
            onChange={(e) => setCutDescription(e.target.value)}
            placeholder="Additional details about the haircut..."
          />
        </div>
  
        {/* Hair Dye */}
        <div className = "selectedPart">
          <label>Hair Dye</label>
          <select
            onChange={(e) =>
              setSelectedHairDye(services.hairdyeing.find((dye) => dye.serviceId === parseInt(e.target.value)))
            }
          >
            <option value="">Select Hair Dye</option>
            {services.hairdyeing.map((dye) => (
              <option key={dye.serviceId} value={dye.serviceId}>
                {dye.serviceName} - {dye.duration} mins - {dye.price} baht
              </option>
            ))}
          </select>
        </div>
        <div className="textArea">
          <label>Description for Hair Dye</label>
          <textarea
            value={dyeDescription}
            onChange={(e) => setDyeDescription(e.target.value)}
            placeholder="Additional details about the hair dye..."
          />
        </div>
  
        {/* Colors */}
        <div className = "selectedPart">
          <label>Colors</label>
          <select onChange={(e) => setColorSelected(e.target.value)}>
            <option value="">Select Color</option>
            {services.colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>
  
      <div className="summary">
        <h2>Total Time: {totalTime} mins</h2>
        <h2>Total Price: {totalPrice} baht</h2>
      </div>
    </div>
  );
}  

export default HairStyleSelection;