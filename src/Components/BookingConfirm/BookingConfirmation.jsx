import React, { useEffect, useState } from 'react';
import './BookingConfirmation.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookingConfirmation = () => {
  const [selectTime, setSelectTime] = useState(null);
  const [selectedServices, setSelectedServices] = useState(null);
  const [shopName, setSetshopName] = useState(null);

  const navigate = useNavigate();
  const { shopid } = useParams(); // รับ shopId จาก URL

  useEffect(() => {
    const storedTime = JSON.parse(sessionStorage.getItem("selectTime"));
    const storedServices = JSON.parse(sessionStorage.getItem("selectedServices"));

    axios.get(`http://localhost:3000/shop/${shopid}`)
    .then(resp => resp.data)
    .then(data => setSetshopName(data.name))

    if (storedTime) setSelectTime(storedTime);
    if (storedServices) setSelectedServices(storedServices);
  }, []);

  if (!selectTime || !selectedServices) {
    return <div>Loading...</div>;
  }

  function toDDMMYYYY(dateString) {
    const [date, time] = dateString.split('T');
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}T${time}`;
  }

  const handlerConfirm = async () => {
    try {
      const token = sessionStorage.getItem("token");
  
      const services = {
        hairCut: selectedServices.selectedHairCut
          ? {
              serviceId: selectedServices.selectedHairCut.serviceId,
              style: '',
              hairLength: "",
              additionalRequirement: selectedServices.cutDescription || "",
            }
          : null,
        hairDye: selectedServices.selectedHairDye
          ? {
              serviceId: selectedServices.selectedHairDye.serviceId,
              color: selectedServices.colorSelected,
              brand: "",
              additionalRequirement: selectedServices.dyeDescription
            }
          : null,
        hairWash: selectedServices.selectedHairWash
          ? {
              serviceId: selectedServices.selectedHairWash.serviceId,
              brand: selectedServices.selectedShampoo,
              additionalRequirement: selectedServices.washDescription
            }
          : null,
      };
  
      // กรองเฉพาะ services ที่ไม่เป็น null
      const filteredServices = Object.fromEntries(
        Object.entries(services).filter(([key, value]) => value !== null)
      );
  
      const payload = {
        shopId: shopid, // ใช้ shopId จาก useParams
        services: filteredServices,
        barberId: selectTime.barberId,
        startTime: toDDMMYYYY(selectTime.startDate),
      };
  
      await axios.post(`http://localhost:3000/booking`, payload, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      alert("การจองสำเร็จ!");
      navigate(`/shop/${shopid}`);
    } catch (error) {
      console.error("Error in booking:", error);
      alert("การจองล้มเหลว กรุณาลองอีกครั้ง");
    }
  };

  const handlerCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bookingconfirm">
      <div className="box-container">
        <div className="title">ยืนยันการจอง</div>
        <div className='shopname'>
          {shopName}
        </div>
 
        <table>
          <tbody>
            {selectedServices.selectedHairCut && (
              <tr>
                <td style={{ verticalAlign: 'top' }}>ตัดผม</td>
                <td style={{ verticalAlign: 'top' }}>
                  {selectedServices.selectedHairCut.serviceName}
                  <br />
                  <small>{selectedServices.cutDescription}</small>
                </td>
                <td style={{ verticalAlign: 'top' }}>{selectedServices.selectedHairCut.price}.-</td>
              </tr>
            )}

            {selectedServices.selectedHairDye && (
              <tr>
                <td style={{ verticalAlign: 'top' }}>ทำสีผม</td>
                <td style={{ verticalAlign: 'top' }}>
                  {selectedServices.selectedHairDye.serviceName}
                  <br />
                  <small>{selectedServices.colorSelected}</small>
                  <br />
                  <small>{selectedServices.dyeDescription}</small>
                </td>
                <td style={{ verticalAlign: 'top' }}>{selectedServices.selectedHairDye.price}.-</td>
              </tr>
            )}

            {selectedServices.selectedHairWash && (
              <tr>
                <td style={{ verticalAlign: 'top' }}>สระผม</td>
                <td style={{ verticalAlign: 'top' }}>
                  {selectedServices.selectedHairWash.serviceName}
                  <br />
                  <small>{selectedServices.selectedShampoo}</small>
                  <br />
                  <small>{selectedServices.washDescription}</small>
                </td>
                <td style={{ verticalAlign: 'top' }}>{selectedServices.selectedHairWash.price}.-</td>
              </tr>
            )}

            <tr>
              <td></td>
              <td style={{ fontWeight: 'bold' }}>ราคารวม</td>
              <td>{selectedServices.totalPrice}.-</td>
            </tr>
            <tr>
              <td style={{width: 30}}>วันที่จอง <br /> {selectTime.startDate.split("T")[0]}</td>
              <td>เวลา <br /> {selectTime.startDate.split("T")[1]} - {selectTime.endDate.split("T")[1]}</td>
              <td>ช่าง<br /> {selectTime.barberName}</td>
            </tr>
          </tbody>
        </table>
        <div className="actions">
          <button className="cancel-button" onClick={handlerCancel}>ยกเลิก</button>
          <button className="confirm-button" onClick={handlerConfirm}>ยืนยัน</button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
