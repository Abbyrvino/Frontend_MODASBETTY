

//--------------------------------------------------------------------------------------------
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from '../src/components/Login';
// import Menu from '../src/components/Menu';
// import Register from './components/Register';
// import Navbar from './components/Navbar'; // Importa el Navbar

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Login y Register no tendrán el Navbar */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Rutas con el Navbar */}
//         <Route path="/menu" element={
//           <>
//             <Navbar /> {/* El Navbar estará visible aquí */}
//             <Menu />
//           </>
//         } />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/components/Login';
import Menu from '../src/components/Menu';
import Register from './components/Register';
import Perfil from './components/Perfil';
import Navbar from './components/Navbar';
import UsuariosList from './components/UsuariosList';
import ProductosList from './components/ProductoList';
import CrearProducto from './components/CrearProducto';
import Home from './components/Home';  // Importa el nuevo componente Home

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={authenticated ? <Navigate to="/menu" /> : <Home />} />
        <Route path="/login" element={authenticated ? <Navigate to="/menu" /> : <Login onLoginSuccess={() => setAuthenticated(true)} />} />
        <Route path="/register" element={authenticated ? <Navigate to="/menu" /> : <Register />} />
        <Route path="/menu" element={authenticated ? <><Navbar onLogout={handleLogout} /><Menu /></> : <Navigate to="/login" />} />
        <Route path="/perfil" element={authenticated ? <><Navbar onLogout={handleLogout} /><Perfil /></> : <Navigate to="/login" />} />
        <Route path="/usuarios" element={authenticated ? <><Navbar onLogout={handleLogout} /><UsuariosList /></> : <Navigate to="/login" />} />
        <Route path="/productolist" element={authenticated ? <><Navbar onLogout={handleLogout} /><ProductosList /></> : <Navigate to="/login" />} />
        <Route path="/crear-producto" element={authenticated ? <><Navbar onLogout={handleLogout} /><CrearProducto /></> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={authenticated ? "/menu" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default App;

