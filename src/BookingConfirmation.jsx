import React from 'react';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const booking = {
    shopId: 1,
    services: {
      hairCut: {
        serviceId: 1,
        name: "ทรง two block",
        additionalRequirement: "ไว้ผมหน้ายาว ไม่โกนหนวด",
        price: 120
      },
      hairDry: {
        serviceId: 4,
        color: "ทำสีแดง",
        additionalRequirement: null,
        price: 150
      },
      hairWash: {
        serviceId: 7,
        champoo: "L'OREAL Paris",
        additionalRequirement: "สระผมเบาๆ",
        price: 150
      },
      barber: "ช่างชุ่ย",
      price: 400,
      timeTotal: 120,
      date: "11-10-2024",
      startTime: "09:30",
      endTime: "11:30"
    }
  };
  
  return (
    <div className="bookingconfirm">
      <div className='box-container'>
        <div className='title'>ยืนยันการจอง</div>
        <table>
          <tbody>
            {/* ตรวจสอบและแสดงข้อมูล hairCut */}
            {booking.services.hairCut && (
              <tr>
                <td style={{ verticalAlign: 'top' }}>ตัดผม</td>
                <td style={{ verticalAlign: 'top' }}>
                  {booking.services.hairCut.name}
                  <br /> 
                  <small>{booking.services.hairCut.additionalRequirement}</small>
                </td>
                <td style={{ verticalAlign: 'top' }}>{booking.services.hairCut.price}.-</td>
              </tr>
            )}

            {/* ตรวจสอบและแสดงข้อมูล hairDry */}
            {booking.services.hairDry && (
              <tr>
                <td style={{ verticalAlign: 'top' }}>ทำสีผม</td>
                <td style={{ verticalAlign: 'top' }}>
                  {booking.services.hairDry.color}
                  <br />
                  <small>{booking.services.hairDry.additionalRequirement}</small>
                </td>
                <td style={{ verticalAlign: 'top' }}>{booking.services.hairDry.price}.-</td>
              </tr>
            )}

            {/* ตรวจสอบและแสดงข้อมูล hairWash */}
            {booking.services.hairWash && (
              <tr>
                <td style={{ verticalAlign: 'top' }}>สระผม</td>
                <td style={{ verticalAlign: 'top' }}>
                  {booking.services.hairWash.champoo}
                  <br />
                  <small>{booking.services.hairWash.additionalRequirement}</small>
                </td>
                <td style={{ verticalAlign: 'top' }}>{booking.services.hairWash.price}.-</td>
              </tr>
            )}

            <tr>
              <td></td>
              <td style={{ fontWeight: 'bold' ,fontSize:''}}>ราคารวม</td>
              <td>{booking.services.price}.-</td>
            </tr>
            
          </tbody>
        </table>

        <div className="summary">
          <div className="booking-info">
            <p>วันที่จอง: {booking.services.date}</p>
            <p>เวลา: {booking.services.startTime} - {booking.services.endTime}</p>
          </div>
        </div>

        <div className="actions">
          <button className="cancel-button">ยกเลิก</button>
          <button className="confirm-button">ยืนยัน</button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
