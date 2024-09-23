import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/Styles/Perfil.css'; // Asegúrate de crear este archivo CSS

const Perfil = () => {
  const [userData, setUserData] = useState({ fullName: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Usuario no autenticado');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/users/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (error) {
        setError('Error al obtener los datos del usuario');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/api/users/perfil', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Perfil actualizado exitosamente');
      setError('');
    } catch (error) {
      setError('Error al actualizar el perfil');
      setSuccess('');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/api/users/perfil/cambiar-contraseña', passwords, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Contraseña actualizada exitosamente');
      setError('');
    } catch (error) {
      setError('Error al cambiar la contraseña');
      setSuccess('');
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>Perfil del Usuario</h2>
      <form className="profile-form" onSubmit={handleProfileUpdate}>
        <label>Nombre:</label>
        <input
          type="text"
          name="fullName"
          value={userData.fullName}
          onChange={handleInputChange}
          required
        />
        <label>Correo electrónico:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="btn">Actualizar Perfil</button>
      </form>
      <br />
      <h3>Cambiar Contraseña</h3>
      <form className="password-form" onSubmit={handlePasswordChange}>
        <label>Contraseña actual:</label>
        <input
          type="password"
          name="oldPassword"
          value={passwords.oldPassword}
          onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
          required
        />
        <label>Nueva contraseña:</label>
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          required
        />
        <button type="submit" className="btn">Cambiar Contraseña</button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Perfil;
