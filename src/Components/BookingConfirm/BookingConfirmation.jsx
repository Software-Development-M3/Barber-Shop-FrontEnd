import React, { useEffect, useState } from 'react';
import './BookingConfirmation.css';
import axios from 'axios';

const BookingConfirmation = () => {
  const [selectTime, setSelectTime] = useState(null);
  const [selectedServices, setSelectedServices] = useState(null);

  useEffect(() => {
    // ดึงข้อมูลจาก sessionStorage และแปลงข้อมูลเป็น JSON
    const storedTime = JSON.parse(sessionStorage.getItem("selectTime"));
    const storedServices = JSON.parse(sessionStorage.getItem("selectedServices"));

    // ตั้งค่า state ถ้ามีข้อมูล
    if (storedTime) setSelectTime(storedTime);
    if (storedServices) setSelectedServices(storedServices);
  }, []);

  // ตรวจสอบว่าข้อมูลพร้อมหรือไม่ ถ้าไม่พร้อมให้แสดง "Loading..."
  if (!selectTime || !selectedServices) {
    return <div>Loading...</div>;
  }

  const handlerConfirm = () => {
    axios.post(`http://localhost:3000/booking`, {{
      firstName: 'Finn',
      lastName: 'Williams'
    }})
  }

  return (
    <div className="bookingconfirm">
      <div className="box-container">
        <div className="title">ยืนยันการจอง</div>
        <table>
          <tbody>
            {/* แสดงข้อมูลการตัดผม */}
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

            {/* แสดงข้อมูลการทำสีผม */}
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

            {/* แสดงข้อมูลการสระผม */}
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

            {/* แสดงราคารวม */}
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
          <button className="cancel-button">ยกเลิก</button>
          <button className="confirm-button" onClick={handlerConfirm}>ยืนยัน</button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
