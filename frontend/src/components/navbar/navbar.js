


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './navbar.css'

// const NavBar = () => {
//   const { isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();
//   const [selectedRole, setSelectedRole] = useState(
//     localStorage.getItem("userRole") || ""
//   );

//   const handleRoleSelect = (role) => {
//     setSelectedRole(role);
//     navigate(`/connexion?role=${role}`); // Redirige vers la page de connexion avec le rôle dans les paramètres d'URL
//   };

//   useEffect(() => {
//     const storedRole = localStorage.getItem("userRole");
//     if (storedRole) {
//       setSelectedRole(storedRole);
//     }
//   }, []);

//   return (
//     <nav className="navbar navbar-expand-lg">
//     <div className="container-fluid">
//       <Link to='/' className='navbar-brand text-custom-yellow font-weight-bold'>
//         <img src='/images/logo.png' alt="Logo" />
//       </Link>
//       <div className="collapse navbar-collapse">
//         <ul className="navbar-nav ms-auto">
//           <li className="nav-item">
//             <Link className="nav-link" to="/offre">Offre</Link>
//           </li>
//           {isLoggedIn && selectedRole === "candidat" ? (
//             <>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/candidature">Candidature</Link>
//               </li>
//               <li className="nav-item">
//                 <button className="btn btn-outline-danger" onClick={logout}>Se Déconnecter</button>
//               </li>
//             </>
//           ) : isLoggedIn ? (
//             <>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/recrutement">Recrutement</Link>
//               </li>
//               <li className="nav-item">
//                 <button className="btn btn-outline-danger" onClick={logout}>Se Déconnecter</button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/inscription">Candidature</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/inscription">Recrutement</Link>
//               </li>
//               <li className="nav-item dropdown">
//   <a
//     className="nav-link dropdown-toggle"
//     href="#"
//     id="navbarDropdownMenuLink"
//     role="button"
//     data-bs-toggle="dropdown"
//     aria-expanded="false"
//   >
//     <i className="fas fa-sign-in-alt"></i> {/* Icône de connexion */}
//     Se Connecter
//   </a>
//   <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
//     <li>
//       <button className="dropdown-item" onClick={() => handleRoleSelect("candidat")}>Candidat</button>
//     </li>
//     <li>
//       <button className="dropdown-item" onClick={() => handleRoleSelect("recruteur")}>Recruteur</button>
//     </li>
//   </ul>
// </li>

//             </>
//           )}
//         </ul>
//       </div>
//     </div>
//   </nav>
  
//   );
// };

// export default NavBar;







import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './navbar.css'

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(
    localStorage.getItem("userRole") || ""
  );

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    navigate(`/connexion?role=${role}`); // Redirige vers la page de connexion avec le rôle dans les paramètres d'URL
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setSelectedRole(storedRole);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-custom-purple-dark fixed-top">
  <div className="container-fluid">
    <Link to='/' className='navbar-brand text-custom-yellow font-weight-bold'>
      <img src='/images/logo.png' alt="Logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/offre">Offre</Link>
        </li>
        {isLoggedIn && selectedRole === "candidat" ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/candidature">Candidature</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={logout}>Se Déconnecter</button>
            </li>
          </>
        ) : isLoggedIn ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/recrutement">Recrutement</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={logout}>Se Déconnecter</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/inscription">Candidature</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/inscription">Recrutement</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-sign-in-alt"></i> Se Connecter
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                  <button className="dropdown-item" onClick={() => handleRoleSelect("candidat")}>Candidat</button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleRoleSelect("recruteur")}>Recruteur</button>
                </li>
              </ul>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>

  
  );
};

export default NavBar;

