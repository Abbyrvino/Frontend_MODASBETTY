import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/Styles/ProductosList.css'; // Asegúrate de crear este archivo CSS

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/productos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProductos(response.data);
      } catch (err) {
        setError('No se pudo obtener la lista de productos');
        console.error(err);
      }
    };

    fetchProductos();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="productos-list-container">
      <h2>Catálogo de Productos</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img src={`http://localhost:8080/api/productos/imagen/${producto.imagenUrl.split('/').pop()}`} alt={producto.nombre} className="producto-imagen" />

            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosList;
