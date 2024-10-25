import React from "react" ;

const BarberBox = ({name,pic}) =>{
    return(
        <div className="barberBox">
            <img 
            src = {pic || "https://via.placeholder.com/100"} 
            className="barberPic"
            />
            <p>{name}</p>
        </div>
    )
}

export default BarberBox;