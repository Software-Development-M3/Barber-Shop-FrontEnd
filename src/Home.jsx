import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // ถ้าไม่มี token ให้เปลี่ยนไปหน้า login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to Home Page</h1>
    </div>
  );
}

export default Home;
