import React, { useState, useEffect } from "react";
import "./selectHair.css";

function HairStyleSelection() {
  const [services, setServices] = useState(null);
  const [selectedShampoo, setSelectedShampoo] = useState("");
  const [selectedHairCut, setSelectedHairCut] = useState(null);
  const [selectedHairDye, setSelectedHairDye] = useState(null);
  const [selectedHairWash, setSelectedHairWash] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // State for additional descriptions
  const [hairCutDescription, setHairCutDescription] = useState("");
  const [hairDyeDescription, setHairDyeDescription] = useState("");
  const [hairWashDescription, setHairWashDescription] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/hair.json");
        const data = await response.json();
        setServices(data[0]); // Ensure this matches the structure of your JSON
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };
    fetchServices();
  }, []);

  // Calculate total time and price based on selected services
  useEffect(() => {
    let time = 0;
    let price = 0;

    if (selectedHairCut) {
      time += selectedHairCut.time;
      price += selectedHairCut.price;
    }
    if (selectedHairDye) {
      time += selectedHairDye.time;
      price += selectedHairDye.price;
    }
    if (selectedHairWash) {
      time += selectedHairWash.time;
      price += selectedHairWash.price;
    }

    setTotalTime(time);
    setTotalPrice(price);

    // Store selected items in sessionStorage
    sessionStorage.setItem(
      "selectedServices",
      JSON.stringify({
        selectedShampoo,
        selectedHairCut,
        selectedHairDye,
        selectedHairWash,
        totalTime,
        totalPrice,
        hairCutDescription,
        hairDyeDescription,
        hairWashDescription,
      })
    );
  }, [selectedHairCut, selectedHairDye, selectedHairWash, hairCutDescription, hairDyeDescription, hairWashDescription]);

  if (!services) {
    return <div>Loading services...</div>; // Handle the loading state
  }

  console.log(JSON.parse(sessionStorage.getItem("selectedServices")))

  return (
    <div className="hairStyleSelection">
      <h1>Hairstyle Selection</h1>

      <div className="serviceSelection">
        <label>Shampoo</label>
        <select onChange={(e) => setSelectedShampoo(e.target.value)}>
          <option value="">Select Shampoo</option>
          {services.shampoo &&
            services.shampoo.map((shampoo, index) => (
              <option key={index} value={shampoo}>
                {shampoo}
              </option>
            ))}
        </select>

        <label>Hair Cut</label>
        <select
          onChange={(e) =>
            setSelectedHairCut(services.hairCut.find((hair) => hair.id === parseInt(e.target.value)))
          }
        >
          <option value="">Select Hair Cut</option>
          {services.hairCut &&
            services.hairCut.map((cut) => (
              <option key={cut.id} value={cut.id}>
                {cut.name} - {cut.time} mins - {cut.price}
              </option>
            ))}
        </select>
        <textarea
          placeholder="Additional description for Hair Cut"
          value={hairCutDescription}
          onChange={(e) => setHairCutDescription(e.target.value)}
        />

        <label>Hair Dye</label>
        <select
          onChange={(e) =>
            setSelectedHairDye(services.hairDye.find((dye) => dye.id === parseInt(e.target.value)))
          }
        >
          <option value="">Select Hair Dye</option>
          {services.hairDye &&
            services.hairDye.map((dye) => (
              <option key={dye.id} value={dye.id}>
                {dye.name} - {dye.time} mins - {dye.price} baht
              </option>
            ))}
        </select>
        <textarea
          placeholder="Additional description for Hair Dye"
          value={hairDyeDescription}
          onChange={(e) => setHairDyeDescription(e.target.value)}
        />

        <label>Hair Wash</label>
        <select
          onChange={(e) =>
            setSelectedHairWash(services.hairWash.find((wash) => wash.id === parseInt(e.target.value)))
          }
        >
          <option value="">Select Hair Wash</option>
          {services.hairWash &&
            services.hairWash.map((wash) => (
              <option key={wash.id} value={wash.id}>
                {wash.name} - {wash.time} mins - {wash.price} baht
              </option>
            ))}
        </select>
        <textarea
          placeholder="Additional description for Hair Wash"
          value={hairWashDescription}
          onChange={(e) => setHairWashDescription(e.target.value)}
        />
      </div>

      <div className="summary">
        <h2>Total Time: {totalTime} mins</h2>
        <h2>Total Price: {totalPrice} baht</h2>
      </div>
    </div>
  );
}

export default HairStyleSelection;
