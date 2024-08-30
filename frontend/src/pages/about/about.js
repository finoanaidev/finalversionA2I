import React from "react";
import './about.css';
import { useNavigate } from "react-router-dom"; 
import { useAuth } from '../../context/AuthContext'; // Importer le contexte d'authentification
import aboutImage from '../../assets/images/view-professional-handshake-business-people.jpg'; // Chemin relatif corrigé

const About = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth(); // Utiliser le contexte d'authentification

    const handleSignup = () => {
        navigate("/connexion");
    };

    return (
        <div className="about-container">
            <div className="about-title">
                <h1><strong>À Propos</strong></h1>
            </div>
            <div className="about">
                <div className="about-left">
                    <img src={aboutImage} alt="About Hoag A2I" className="about-image" />
                </div>
                <div className="about-right">
                    <strong><h1>Hoag A2I</h1></strong>
                    <p className="presentation">
                        Hoag A2I joue un rôle crucial dans la gestion des ressources humaines à Madagascar.
                        Nous facilitons le recrutement et aidons les entreprises à trouver les talents appropriés.
                    </p>
                    <br/><br/>
                    <ul>
                        <li>Soutenir les entreprises dans leurs besoins en ressources humaines.</li>
                        <li>Aider à trouver des emplois et des stages pour les demandeurs.</li>
                        {/* <li>Soutenir les entreprises dans leurs besoins en ressources humaines.</li> */}
                    </ul>
                    {!isLoggedIn && (
                        <button onClick={handleSignup}>S'inscrire</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default About;
