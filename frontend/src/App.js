

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';
// import Footer from './components/footer/footer';
// import Navigation from './Navigation';
// import Candidature from './pages/candidature/candidature';
// import Recrutement from './pages/recrutement/recrutement';
// import Offre from './pages/offre/offre';
// import NavBar from './components/navbar/navbar';
// import LoginPage from './pages/login/login';
// import RegisterPage from './pages/login/inscription';
// import ListeCandidat from './pages/candidature/ListeCandidat';
// import EditCandidat from './pages/candidature/EditCandidat';

// const App = () => {
//   const { isLoggedIn, setLoginState } = useAuth();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('userRole');

//     if (token && userRole) {
//       axios.post('http://localhost:5000/api/auth/validateToken', { token, userRole })
//         .then(response => {
//           if (response.data.isValid) {
//             setLoginState(true, userRole);
//           } else {
//             localStorage.removeItem('token');
//             localStorage.removeItem('userRole');
//             setLoginState(false, null);
//           }
//           setLoading(false);
//         })
//         .catch(error => {
//           console.error('Token validation failed:', error);
//           localStorage.removeItem('token');
//           localStorage.removeItem('userRole');
//           setLoginState(false, null);
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, [setLoginState]);

//   if (loading) return <div>Loading...</div>;

//   // Redirection en fonction du rôle après la connexion
//   const getRedirectPath = () => {
//     const userRole = localStorage.getItem('userRole'); // Lisez le rôle à partir du localStorage

//     if (isLoggedIn) {
//       if (userRole === 'candidat') {
//         return '/candidature';
//       } else if (userRole === 'recruteur') {
//         return '/recrutement';
//       }
//     } else {
//       return '/';
//     }
//   };

//   return (
//     <Router>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<Navigation />} />
//         <Route path="/candidature" element={isLoggedIn ? <Candidature /> : <Navigate replace to="/connexion" />} />
//         <Route path="/listeCandidat" element={<ListeCandidat />} />
//         <Route path="/editCandidat/:id" element={<EditCandidat />} />
//         <Route path="/recrutement" element={isLoggedIn ? <Recrutement /> : <Navigate replace to="/connexion" />} />
//         <Route path="/offre" element={<Offre />} />
//         <Route path="/connexion" element={!isLoggedIn ? <LoginPage /> : <Navigate replace to={getRedirectPath()} />} />
//         <Route path="/inscription" element={!isLoggedIn ? <RegisterPage /> : <Navigate replace to={getRedirectPath()} />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Footer from './components/footer/footer';
import Navigation from './Navigation';
import Candidature from './pages/candidature/candidature';
import Recrutement from './pages/recrutement/recrutement';
import Offre from './pages/offre/offre';
import NavBar from './components/navbar/navbar';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/login/inscription';
import ListeCandidat from './pages/candidature/ListeCandidat';
import EditCandidat from './pages/candidature/EditCandidat';

const App = () => {
  const { isLoggedIn, setLoginState } = useAuth();
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem('userRole'); // Add this line to define userRole

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && userRole) {
      axios.post('http://localhost:5000/api/auth/validateToken', { token, userRole })
        .then(response => {
          if (response.data.isValid) {
            setLoginState(true, userRole);
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            setLoginState(false, null);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Token validation failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          setLoginState(false, null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [setLoginState, userRole]); // Make sure userRole is added to the dependency array

  if (loading) return <div>Loading...</div>;

  const getRedirectPath = () => {
    if (isLoggedIn) {
      if (userRole === 'candidat') {
        return '/candidature';
      } else if (userRole === 'recruteur') {
        return '/recrutement';
      }
    } else {
      return '/';
    }
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/candidature" element={isLoggedIn ? <Candidature /> : <Navigate replace to="/connexion" />} />
        <Route path="/listeCandidat" element={isLoggedIn && userRole === 'recruteur' ? <ListeCandidat /> : <Navigate replace to="/connexion" />} />
        <Route path="/editCandidat/:id" element={isLoggedIn && userRole === 'recruteur' ? <EditCandidat /> : <Navigate replace to="/connexion" />} />
        <Route path="/recrutement" element={isLoggedIn ? <Recrutement /> : <Navigate replace to="/connexion" />} />
        <Route path="/offre" element={<Offre />} />
        <Route path="/connexion" element={!isLoggedIn ? <LoginPage /> : <Navigate replace to={getRedirectPath()} />} />
        <Route path="/inscription" element={!isLoggedIn ? <RegisterPage /> : <Navigate replace to={getRedirectPath()} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
