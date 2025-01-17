import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/Styles/UsuarioList.css';

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]); // Lista de roles disponibles
  const [selectedRole, setSelectedRole] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuarios(response.data);
      } catch (err) {
        setError('No se pudo obtener la lista de usuarios');
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/roles', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRoles(response.data);
      } catch (err) {
        console.error('Error al obtener roles', err);
      }
    };

    fetchUsuarios();
    fetchRoles();
  }, []);

  const handleRoleChange = (e, username) => {
    setSelectedRole({ ...selectedRole, [username]: e.target.value });
  };

  const handleAsignarRol = async (username) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        'http://localhost:8080/api/users/asignar-rol',
        { username, roleName: selectedRole[username] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Rol asignado exitosamente a ${username}`);
    } catch (error) {
      alert('Error al asignar rol');
    }
  };

  return (
    <div className="usuarios-list-container">
      <h2 className="title">Lista de Usuarios</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Usuario</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Asignar Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.username}</td>
              <td>{usuario.fullName}</td>
              <td>{usuario.email}</td>
              <td>
                <select
                  className="role-select"
                  value={selectedRole[usuario.username] || ''}
                  onChange={(e) => handleRoleChange(e, usuario.username)}
                >
                  <option value="">Seleccionar Rol</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <button
                  className="assign-role-button"
                  onClick={() => handleAsignarRol(usuario.username)}
                >
                  Asignar Rol
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosList;
