import React, { useEffect, useState } from 'react';
import './BookingConfirmation.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookingConfirmation = () => {
  const [selectTime, setSelectTime] = useState(null);
  const [selectedServices, setSelectedServices] = useState(null);
  const navigate = useNavigate();
  const { shopid } = useParams(); // รับ shopId จาก URL

  useEffect(() => {
    const storedTime = JSON.parse(sessionStorage.getItem("selectTime"));
    const storedServices = JSON.parse(sessionStorage.getItem("selectedServices"));

    if (storedTime) setSelectTime(storedTime);
    if (storedServices) setSelectedServices(storedServices);
  }, []);

  if (!selectTime || !selectedServices) {
    return <div>Loading...</div>;
  }

  const handlerConfirm = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const payload = {
        shopId: shopid, // ใช้ shopId จาก useParams
        services: {
          hairCut: selectedServices.selectedHairCut
            ? {
                serviceId: selectedServices.selectedHairCut.serviceId,
                additionalRequirement: selectedServices.cutDescription || "",
              }
            : null,
          hairWash: selectedServices.selectedHairWash
            ? {
                serviceId: selectedServices.selectedHairWash.serviceId,
                brand: selectedServices.selectedHairWash.selectedShampoo,
                additionalRequirement: "Add scalp massage",
              }
            : null,
          hairDye: selectedServices.selectedHairDye
            ? {
                serviceId: selectedServices.selectedHairDye.serviceId,
                color: selectedServices.selectedHairDye.colorSelected,
              }
            : null,
        },
        barberId: selectTime.barberId,
        startTime: selectTime.startDate,
      };

      await axios.post(`http://localhost:3000/booking`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
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
                  <small>{selectedServices.selectedHairDye.colorSelected}</small>
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
                  <small>{selectedServices.selectedHairWash.selectedShampoo}</small>
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
          </tbody>
        </table>

        <div className="summary">
          <div className="booking-info">
            <p>วันที่จอง: {selectTime.startDate.split("T")[0]}</p>
            <p>เวลา: {selectTime.startDate.split("T")[1]} - {selectTime.endDate.split("T")[1]}</p>
            <p>ช่าง: {selectTime.barberName}</p>
          </div>
        </div>

        <div className="actions">
          <button className="cancel-button" onClick={handlerCancel}>ยกเลิก</button>
          <button className="confirm-button" onClick={handlerConfirm}>ยืนยัน</button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
