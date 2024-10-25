import React from 'react';
import './BookingConfirmation.css';


const BookingConfirmation = () => {
  const selectHair = {
    selectedHairCut: {
      serviceId: 1,
      serviceName:  "Two block",
      duration: 30,
      price: 120,
    },
    selectedHairDye: {
      serviceId: 2,
      serviceName:  "ทำสีผมแฟชั่น ชาย",
      selectedHairColor: "สีแดง",
      duration: 30,
      price: 120,
    },
    selectedHairWash: {
      serviceId: 3,
      serviceName:  "สระพรีเมี่ยม",
      selectedShampoo: "L'OREAL Paris",
      duration: 95,
      price: 300,
    },
    hairCutDescription: "ไว้ผมหน้ายาว",
    hairDyeDescription: "",
    hairWashDescription: "สระผมเบาๆ",
    totalTime: 180,
    totalPrice: 500,
  };

  const selecttime = {
    barberId: 1234,
    barberName: "ช่างชุ้ย",
    startDate: "28-10-2024T09:30",
    endDate: "28-10-2024T12:30",
    duration: "9:30-12:30",
  };

  
  return (
    <div className="bookingconfirm">
      <div className='box-container'>
        <div className='title'>ยืนยันการจอง</div>
        <table>
          <tbody>
            {/* ตรวจสอบและแสดงข้อมูล hairCut */}
            {selectHair.selectedHairCut && (
              <tr>
                <td style={{ verticalAlign: 'top' }}>ตัดผม</td>
                <td style={{ verticalAlign: 'top' }}>
                  {selectHair.selectedHairCut.serviceName}
                  <br /> 
                  <small>{selectHair.hairCutDescription}</small>
                </td>
                <td style={{ verticalAlign: 'top' }}>{selectHair.selectedHairCut.price}.-</td>
              </tr>
            )}

            {/* ตรวจสอบและแสดงข้อมูล hairDry */}
            {selectHair.selectedHairDye && (
              <tr>
                <td style={{ verticalAlign: 'top' }}>ทำสีผม</td>
                <td style={{ verticalAlign: 'top' }}>
                  {selectHair.selectedHairDye.serviceName}
                  <br />
                  <small>{selectHair.selectedHairDye.selectedHairColor}</small>
                  <br />
                  <small>{selectHair.hairDyeDescription}</small>
                </td>
                <td style={{ verticalAlign: 'top' }}>{selectHair.selectedHairDye.price}.-</td>
              </tr>
            )}

            {/* ตรวจสอบและแสดงข้อมูล hairWash */}
            {selectHair.selectedHairWash && (
              <tr>
                <td style={{ verticalAlign: 'top' }}>สระผม</td>
                <td style={{ verticalAlign: 'top' }}>
                  {selectHair.selectedHairWash.serviceName}
                  <br />
                  <small>{selectHair.selectedHairWash.selectedShampoo}</small>
                  <br />
                  <small>{selectHair.hairWashDescription}</small>
                </td>
                <td style={{ verticalAlign: 'top' }}>{selectHair.selectedHairWash.price}.-</td>
              </tr>
            )}

            <tr>
              <td></td>
              <td style={{ fontWeight: 'bold' ,fontSize:''}}>ราคารวม</td>
              <td>{selectHair.totalPrice}.-</td>
            </tr>
            
          </tbody>
        </table>

        <div className="summary">
          <div className="booking-info">
            <p>วันที่จอง: {selecttime.startDate.split("T")[0]}</p>
            <p>เวลา: {selecttime.duration}</p>
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
