import React from 'react';
import './activite.css';
import { useNavigate } from 'react-router-dom';
import nurseImage from '../../assets/images/nurse-portrait-hospital.jpg';
import lawyerImage from '../../assets/images/medium-shot-woman-working-as-lawyer.jpg';
import { useAuth } from '../../context/AuthContext'; // Assurez-vous d'importer useAuth

const Activite = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth(); // Utilisez useAuth pour accéder au rôle de l'utilisateur

  const handleRecrutement = () => {
   navigate('/connexion')
  };

  return (
    <div className='activite container-fluid'>
      <br/><br/><br/>
      <div className='welcome-text'>
        <h1><strong><span className='hoag'>HOAG</span><span className='a2i'>-A2I</span></strong></h1>
        <strong><p>Activités d'Intérim et d'Insertion professionnelle</p></strong>
      </div>
      <div className='activ row'>
        <div className='act-left col-md-5 col-sm-10 col-12 card'>
          <div className='card-image'>
            <img src={nurseImage} alt='Nurse Portrait' />
          </div>
          <div className='card-body'>
            <h5>Boostez vos compétences pour décrocher votre job de rêve</h5>
            <p className='taille'>Découvrez comment améliorer vos compétences et vous démarquer sur le marché du travail. Laissez-nous vous guider vers le succès avec des conseils pratiques et des stratégies efficaces pour atteindre vos objectifs professionnels.</p>
            <button className='btn btn-primary'>Rejoindre</button>
          </div>
        </div>
        <div className='act-right col-md-5 col-sm-10 col-12 card'>
          <div className='card-image'>
            <img src={lawyerImage} alt='Woman Working as Lawyer' />
          </div>
          <div className='card-body'>
            <h5>Dénichez vos talents les plus précieux dès maintenant</h5>
            <p>Que vous cherchiez des profils déjà opérationnels ou des talents prometteurs avec un potentiel énorme à développer, nous vous ferons découvrir les talents qui feront la différence dès le premier jour.</p>
            <button className='btn btn-primary' onClick={handleRecrutement}>Rejoindre</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activite;
