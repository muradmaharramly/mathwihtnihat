import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import './AdminLogin.scss';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data.token);
      toast.success('Uğurla daxil oldunuz');
      navigate('/admin');
    } catch (error) {
      toast.error('Giriş məlumatları yanlışdır');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Girişi</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>İstifadəçi adı</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Şifrə</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Daxil ol</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
