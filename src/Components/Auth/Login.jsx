import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation(); // ใช้ useLocation เพื่อเก็บข้อมูลหน้าก่อนหน้า

  // เก็บ state ของที่มาหน้าก่อนหน้า
  const from = location.state?.from?.pathname || '/'; 

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError('กรุณากรอกอีเมลล์ที่ถูกต้อง');
      return false;
    }

    // ตรวจสอบรหัสผ่าน
    // if (password.length < 6) {
    //   setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
    //   return false;
    // }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const loginData = { email, password };

    try {
      const response = await axios.post('http://localhost:3000/login', loginData);
      
      if (response.data.access_token) {
        // เก็บ token ใน sessionStorage
        sessionStorage.setItem('token', response.data.access_token);
        
        // Redirect ไปยังหน้าที่ผู้ใช้เข้าถึงก่อนหน้า
        window.location = `${from}`;
      } else {
        setError('ข้อมูลอีเมลล์หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ. กรุณาลองใหม่อีกครั้ง.');
    }
  };
  
  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className='login'>
      <div className='form-container'>
        <div className='title'>เข้าสู่ระบบ</div>      
        <form onSubmit={handleSubmit}>
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
          <button className = 'btn_btn' type="submit" >เข้าสู่ระบบ</button>
          <div className ='movetoregister' onClick={handleNavigateToRegister}>หากยังไม่มีบัญชี สมัครสมาชิกที่นี่</div>
        </form>
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>} {/* แสดง error message */}
      </div>  
    </div>
  );
}

export default Login;
