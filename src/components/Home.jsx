import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Styles/Home.css'; // Archivo de estilos CSS

const Home = () => {
  const navigate = useNavigate();
  const fullText = "Discover the latest trends in fashion and upgrade your wardrobe!";
  const [displayedText, setDisplayedText] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff'); // Color de fondo
  const [textColor, setTextColor] = useState('#000000'); // Color del texto

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  // Lista de colores pastel para el fondo y el texto
  const pastelBgColors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'];
  const pastelTextColors = ['#FFE0E0', '#F5D3D3', '#F7F0D3', '#D3F5D3', '#D3E0F5'];

  // Función para cambiar colores sin que se solapen
  const changeColors = () => {
    const randomBgColor = pastelBgColors[Math.floor(Math.random() * pastelBgColors.length)];
    let randomTextColor = pastelTextColors[Math.floor(Math.random() * pastelTextColors.length)];

    // Asegurarse de que los colores de fondo y texto sean diferentes
    while (randomBgColor === randomTextColor) {
      randomTextColor = pastelTextColors[Math.floor(Math.random() * pastelTextColors.length)];
    }

    setBgColor(randomBgColor);
    setTextColor(randomTextColor);
  };

  useEffect(() => {
    const colorInterval = setInterval(changeColors, 3000); // Cambia los colores cada 3 segundos
    return () => clearInterval(colorInterval); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  return (
    <div className="home-container" style={{ backgroundColor: bgColor }}> {/* Color de fondo dinámico */}
      <div className="overlay"></div>
      <div className="welcome-message" style={{ color: textColor }}> {/* Color de texto dinámico */}
        <h1>WELCOME TO STYLE STORE</h1>
        <p>{displayedText}</p> {/* Muestra el texto que se escribe progresivamente */}
        <button className="shop-now-button" onClick={() => navigate('/login')}>
          Comprar
        </button>
      </div>
      <button className="login-button" onClick={() => navigate('/login')}>
        Login
      </button>
    </div>
  );
};

export default Home;
