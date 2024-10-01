import React from 'react';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const booking = {
    hairCut: {
      name: "ทรง two block",
      price: 120
    },
    hairDye: {
      name: "ทำสีดำธรรมชาติ",
      price: 150
    },
    // hairWash: ไม่มีการสระผม
    hairWash: {
      name: "สระผมธรรมดา",
      time: "15 นาที",
      price: 150
    },
    totalPrice: 270,
    date: "10/12/2567",
    startTime: "11:00 น.",
    endTime: "12:00 น."
  };
  
  return (
    <div className="modal">
      <h2>ยืนยันการจอง</h2>
      <table>
        <tbody>
          {/* ตรวจสอบและแสดงเฉพาะเมื่อมีข้อมูล hairCut */}
          {booking.hairCut && (
            <tr>
              <td>ตัดผม</td>
              <td>{booking.hairCut.name}</td>
              <td>{booking.hairCut.price}.-</td>
            </tr>
          )}

          {/* ตรวจสอบและแสดงเฉพาะเมื่อมีข้อมูล hairDye */}
          {booking.hairDye && (
            <tr>
              <td>ทำสีผม</td>
              <td>{booking.hairDye.name}</td>
              <td>{booking.hairDye.price}.-</td>
            </tr>
          )}

          {/* ตรวจสอบและแสดงเฉพาะเมื่อมีข้อมูล hairWash */}
          {booking.hairWash && (
            <tr>
              <td>สระผม</td>
              <td>{booking.hairWash.name}</td>
              <td>{booking.hairWash.price}.-</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="summary">
        <p>ราคารวม: {booking.totalPrice}.-</p>
        <p>วันที่จอง: {booking.date}</p>
        <p>เวลา: {booking.startTime} - {booking.endTime}</p>
      </div>

      <div className="actions">
        <button className="cancel-button">ยกเลิก</button>
        <button className="confirm-button">ยืนยัน</button>
      </div>
    </div>
  );
};
export default BookingConfirmation;
