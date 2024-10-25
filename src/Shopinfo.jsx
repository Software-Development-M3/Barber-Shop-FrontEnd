import React, { useEffect, useState } from "react";
import shopImg from "./assets/test.jpeg"
import BarberBox from "./Barberbox.jsx"
import './Shopinfo.css'

function ShopInfo(){
    
    const [shopData, setShopData] = useState(null);

    //fetching
    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const response = await fetch('/test.json');
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
            {shopData && shopData.map(shop => {
                const barberList = shop.barber;
                const shopName = shop.name;
                const shopImg = shop.image;

                return (
                    <div className="shopContainer" key={shop.id}>
                        <div className="shopInfoContainer">
                            <div className="shopPic">
                                <img src={shopImg} alt={shopName}></img>
                            </div>
                            <div className="shopInfo">
                                <h1>{shopName}</h1>
                                <div className="shopDescription">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta delectus facilis culpa perspiciatis corporis sequi consequuntur ex eius! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta delectus facilis culpa perspiciatis corporis sequi consequuntur ex eius! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta delectus facilis culpa perspiciatis corporis sequi consequuntur ex eius! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta delectus facilis culpa perspiciatis corporis sequi consequuntur ex eius! 
                                </div>
                                <div className="buttonContainer">
                                    <div className="reserveBut"><button>จองเลย</button></div>
                                    <div className="barberScdBut"><button>ดูตารางงานช่าง</button></div>
                                    <div className="allServcBut"><button>ดูบริการทั้งหมด</button></div>
                                </div>
                            </div>
                        </div>
                        <div className="barberContainer">
                            {barberList.map((barber, index) => (
                                <BarberBox key={index} name={barber.name} pic={barber.img} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
export default ShopInfo;