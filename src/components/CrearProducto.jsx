import React, { useState } from 'react';
import axios from 'axios';
import '../components/Styles/CrearProducto.css';  // Asegúrate de tener un archivo de estilos

const CrearProducto = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });
  const [imagen, setImagen] = useState(null);  // Para manejar el archivo de imagen
  const [mensaje, setMensaje] = useState('');

  const handleInputChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);  // Capturar el archivo de imagen
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('descripcion', producto.descripcion);
    formData.append('precio', producto.precio);
    formData.append('imagen', imagen);  // Adjuntar la imagen al formData

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/productos/crear-con-imagen', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'  // Especificar el tipo de contenido
        }
      });
      setMensaje('Producto creado exitosamente');
      setProducto({ nombre: '', descripcion: '', precio: '' });
      setImagen(null);  // Limpiar el archivo de imagen
    } catch (error) {
      console.error('Error al crear el producto', error);
      setMensaje('Error al crear el producto');
    }
  };

  return (
    <div className="crear-producto-container">
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Subir Imagen:</label>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleImagenChange}
            required
          />
        </div>

        <button type="submit" className="crear-producto-boton">Crear Producto</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default CrearProducto;
