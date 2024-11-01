import React from "react" ;

const BarberBox = ({name,pic,exp,spec}) =>{
    return(
        <div className="barberBox">
            <img 
            src = {pic || "https://cdn-icons-png.flaticon.com/512/147/147144.png"} 
            className="barberPic"
            />
            <div className="barberTextContainer">
            <p>{name}</p>
            <p>ประสบการณ์ {exp} ปี</p>
            <p>ความถนัด: {spec}</p>
            </div>
        </div>
    )
}

export default BarberBox;