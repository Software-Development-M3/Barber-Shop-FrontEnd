import React, { useEffect, useState } from "react";
import BarberBox from "./Barberbox.jsx"
import './Shopinfo.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function ShopInfo(){
    const { shopid } = useParams();
    const [shopData, setShopData] = useState(null);
    const navigate = useNavigate();

    //fetching
    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const response = await fetch(`http://localhost:3000/shop/${shopid}`);
                const data =  await response.json();
                console.log(data)
                setShopData(data)
            }
            catch(error){
                console.error("Fetching Error:",error)
            }
        };
        fetchData();
    },[]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="shopInfoBody">
            {shopData && (
                    <div className="shopContainer" key={shopData.id}>
                        <div className="shopInfoContainer">
                            <div className="shopPic">
                                <img src={shopData.image} alt={shopData.name}></img>
                            </div>
                            <div className="shopInfo">
                                <h1>{shopData.name}</h1>
                                <div className="shopDescription">
                                {shopData.description}
                                </div>
                                <div className="buttonContainer">
                                    <div className="reserveBut"><button onClick={() => handleNavigate(`/booking/service/${shopData.id}`)}>จองเลย</button></div>
                                    <div className="barberScdBut"><button onClick={() => handleNavigate(`/view/schedule/${shopData.id}`)}>ตารางงานช่าง</button></div>
                                    <div className="allServcBut"><button onClick={() => handleNavigate(`/view/service/${shopData.id}`)}>บริการทั้งหมด</button></div>
                                </div>
                            </div>
                        </div>
                        <div className="barberContainer">
                            {shopData.barbers.map((barber, index) => (
                                <BarberBox key={index} name={barber.name} pic={barber.img} exp={barber.experience} spec={barber.specialization}/>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
}
export default ShopInfo;