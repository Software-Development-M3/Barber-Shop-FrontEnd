import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // เพิ่ม state สำหรับ error message
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loginData = { email, password };
  
    try {
      // ส่งข้อมูลเพื่อดึงผู้ใช้ทั้งหมด
      const response = await axios.get('http://localhost:3000/users');
      
      // ค้นหาผู้ใช้ที่ตรงกับข้อมูลที่ป้อน
      const user = response.data.find(user => user.email === email && user.password === password);
      
      if (user) {
        // หากพบผู้ใช้ รับ JWT token (คุณสามารถสร้าง token นี้เองได้)
        const token = "mock-token"; // ตัวอย่าง token
        localStorage.setItem('token', token);
        
        // เปลี่ยน path ไปหน้า home
        navigate('/home');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please check your credentials and try again.');
    }
  };
  
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* แสดง error message */}
    </div>
  );
}

export default Login;
