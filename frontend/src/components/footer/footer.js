import React from 'react';
import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <div className='foot container-fluid'>
      <div className='row'>
        <div className='foot-cont col-12 col-md-4'>
          <p><span className="label">Email:</span><span className="value">contact.hoagtarget@gmail.com</span></p>
          <p><span className="label">Phone:</span><span className="value">+261 34 70 481 76</span></p>
          <p><span className="label">Address:</span><span className="value">Lot IVD 89A Behoririka Antananarivo, Madagascar</span></p>
        </div>
        <div className='foot-form col-12 col-md-4'>
          <p>
            Si vous souhaitez discuter avec nous, n'hésitez pas à nous contacter.
          </p>
          <button className='btn btn-primary'>Contact</button>
        </div>
        <div className='foot-lien col-12 col-md-4'>
          <p><a href='/offre'>Offres</a></p>
          <p><a href='/connexion'>Candidature</a></p>
          <p><a href='/connexion'>Recrutement</a></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
