import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // นำเข้า axios
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');  // สำหรับแสดง error ถ้ามี
  const [success, setSuccess] = useState('');  // สำหรับแสดงข้อความสำเร็จ

  const navigate = useNavigate();

  const validateForm = () => {
    // ตรวจสอบรูปแบบอีเมลล์
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError('กรุณากรอกอีเมลล์ที่ถูกต้อง');
      return false;
    }

    // ตรวจสอบรหัสผ่าน
    if (password.length < 6) {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return false;
    }

    // ตรวจสอบหมายเลขโทรศัพท์
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง (10 หลัก)');
      return false;
    }

    // ถ้าผ่านการตรวจสอบทั้งหมด
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      fullname: username,
      email: email,
      password: password,
      telephone: phoneNumber
    };

    try {
      // ส่งข้อมูลไปที่ backend โดยใช้ axios
      const response = await axios.post('http://localhost:3000/register', userData);
      console.log('Response from server:', response.data);

      // ถ้าการสมัครสมาชิกสำเร็จ แสดงข้อความสำเร็จ และเปลี่ยน path ไปหน้า login
      setSuccess('สมัครสมาชิกสำเร็จ!');
      setError('');

      // เปลี่ยน path ไปหน้า login หลังจากสำเร็จ
      setTimeout(() => {
        navigate('/login');
      }, 2000);  // รอ 2 วินาทีแล้วค่อยเปลี่ยนหน้า
    } catch (err) {
      console.error('Error during registration:', err);
      if (err.response && err.response.status === 400) {
        setError('อีเมลล์นี้ถูกใช้งานแล้ว');
      } else {
        setError('เกิดข้อผิดพลาดในการสมัครสมาชิก. กรุณาลองใหม่อีกครั้ง.');
      }
      setSuccess('');
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='register'>
      <div className='form-container'>
        <div className='title'>สมัครสมาชิก</div>
        <form onSubmit={handleSubmit}>
          <div className='text_area'>
            <label>ชื่อผู้ใช้งาน:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ชื่อผู้ใช้งาน"
              required
            />
          </div>
          <div>
            <label>อีเมลล์:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="อีเมลล์"
              required
            />
          </div>
          <div>
            <label>รหัสผ่าน:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"
              required
            />
          </div>
          <div>
            <label>เบอร์โทรศัพท์:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="เบอร์โทรศัพท์"
              required
            />
          </div>
          <button type="submit">สมัครสมาชิก</button>

          {/* แสดง error message ถ้ามี */}
          {error && <p className="error-message">{error}</p>}

          {/* แสดง success message ถ้าการสมัครสำเร็จ */}
          {success && <p className="success-message">{success}</p>}

          <div className='movetologin' onClick={handleNavigateToLogin}>
            มีบัญชีอยู่แล้ว? เข้าสู่ระบบที่นี่
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
