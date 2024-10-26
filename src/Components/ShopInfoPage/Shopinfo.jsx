import React, { useEffect, useState } from "react";
import BarberBox from "./Barberbox.js"
import './Shopinfo.css'

function ShopInfo(){
    
    const [shopData, setShopData] = useState(null);

    //fetching
    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const response = await fetch('http://localhost:3000/shop/34942e32-7904-45cc-83a6-d4130ee0fe6e');
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

    return (
        <div>
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
                                    <div className="reserveBut"><button>จองเลย</button></div>
                                    <div className="barberScdBut"><button>ดูตารางงานช่าง</button></div>
                                    <div className="allServcBut"><button>ดูบริการทั้งหมด</button></div>
                                </div>
                            </div>
                        </div>
                        <div className="barberContainer">
                            {shopData.barbers.map((barber, index) => (
                                <BarberBox key={index} name={barber.name} pic={barber.img} />
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
}
export default ShopInfo;