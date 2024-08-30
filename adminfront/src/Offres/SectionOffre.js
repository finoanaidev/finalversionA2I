


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable'; // pour le support de l'extension autotable
// import EditOffre from './EditOffre'; // Assurez-vous d'importer le composant EditOffre

// const SectionOffre = () => {
//   const [offres, setOffres] = useState([]);
//   const [filteredOffres, setFilteredOffres] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [message, setMessage] = useState('');
//   const [selectedOffre, setSelectedOffre] = useState(null); // Etat pour stocker l'offre sélectionnée pour modification
//   const [showEditModal, setShowEditModal] = useState(false); // Etat pour contrôler l'affichage de la modal
//   const [showDetailModal, setShowDetailModal] = useState(false); // Etat pour contrôler l'affichage de la modal de détails
//   const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false); // Etat pour contrôler la modal de confirmation de suppression
//   const [offreToDelete, setOffreToDelete] = useState(null); // Etat pour stocker l'offre à supprimer

//   useEffect(() => {
//     const fetchOffres = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/sectionOffres');
//         setOffres(response.data);
//         setFilteredOffres(response.data); // Initialize filteredOffres with the complete list
//       } catch (error) {
//         setMessage('Erreur lors du chargement des offres');
//         console.error('Error fetching offers:', error);
//       }
//     };

//     fetchOffres();
//   }, []);

//   useEffect(() => {
//     // Filter offres based on the searchTerm
//     if (searchTerm === '') {
//       setFilteredOffres(offres);
//     } else {
//       const filtered = offres.filter(offre =>
//         offre.titre.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredOffres(filtered);
//     }
//   }, [searchTerm, offres]);

//   const handleDelete = async () => {
//     if (!offreToDelete) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/sectionOffres/${offreToDelete._id}`);
//       const updatedOffres = filteredOffres.filter(offre => offre._id !== offreToDelete._id);
//       setOffres(updatedOffres); // Update original offres list
//       setFilteredOffres(updatedOffres); // Update filtered list
//       setMessage('Offre supprimée avec succès');
//       setShowConfirmDeleteModal(false); // Fermer la modal de confirmation après suppression
//     } catch (error) {
//       setMessage('Erreur lors de la suppression de l\'offre');
//       console.error('Error deleting offer:', error);
//     }
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Liste des Offres', 10, 10);

//     const tableData = filteredOffres.map(offre => [offre.titre, offre.description, offre.mission, offre.competence, offre.atouts]);
//     doc.autoTable({
//       head: [['Titre', 'Description', 'Mission', 'Competence', 'Atouts']],
//       body: tableData,
//     });

//     doc.save('offres.pdf');
//   };

//   const handleEdit = (offre) => {
//     setSelectedOffre(offre);
//     setShowEditModal(true);
//   };

//   const handleDetail = (offre) => {
//     setSelectedOffre(offre);
//     setShowDetailModal(true);
//   };

//   const handleConfirmDelete = (offre) => {
//     setOffreToDelete(offre);
//     setShowConfirmDeleteModal(true);
//   };

//   const refreshOffres = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/sectionOffres');
//       setOffres(response.data);
//       setFilteredOffres(response.data);
//     } catch (error) {
//       console.error('Error refreshing offers:', error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Section des Offres</h2>
//       <form className="mb-4">
//         <div className="form-group">
//           <label htmlFor="search">Rechercher par titre:</label>
//           <input
//             type="text"
//             id="search"
//             className="form-control"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </form>
//       {message && <div className="alert alert-info">{message}</div>}
//       <button onClick={downloadPDF} className="btn btn-primary mb-3">Télécharger PDF</button>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Titre</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOffres.map(offre => (
//             <tr key={offre._id}>
//               <td>{offre.titre}</td>
//               <td>
//                 <button
//                   className="btn btn-info btn-sm me-2"
//                   onClick={() => handleDetail(offre)} // Utilisez handleDetail pour ouvrir la modal de détails
//                 >
//                   Voir
//                 </button>
//                 <button
//                   className="btn btn-warning btn-sm me-2"
//                   onClick={() => handleEdit(offre)} // Utilisez handleEdit pour ouvrir la modal d'édition
//                 >
//                   Modifier
//                 </button>
//                 <button
//                   onClick={() => handleConfirmDelete(offre)} // Utilisez handleConfirmDelete pour ouvrir la modal de confirmation
//                   className="btn btn-danger btn-sm"
//                 >
//                   Supprimer
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {selectedOffre && (
//         <>
//           <EditOffre
//             show={showEditModal}
//             handleClose={() => setShowEditModal(false)}
//             offreId={selectedOffre._id}
//             refreshOffres={refreshOffres}
//           />
//           <div
//             className={`modal fade ${showDetailModal ? 'show' : ''}`}
//             id="detailModal"
//             tabIndex="-1"
//             aria-labelledby="detailModalLabel"
//             aria-hidden={!showDetailModal}
//             style={{ display: showDetailModal ? 'block' : 'none' }} // Ajouté pour contrôler l'affichage
//           >
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title" id="detailModalLabel">Détails de l'Offre</h5>
//                   <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)} aria-label="Close"></button>
//                 </div>
//                 <div className="modal-body">
//                   {selectedOffre && (
//                     <>
//                       <h6>Titre:</h6>
//                       <p>{selectedOffre.titre}</p>
//                       <h6>Description:</h6>
//                       <p>{selectedOffre.description}</p>
//                       <h6>Mission:</h6>
//                       <p>{selectedOffre.mission}</p>
//                       <h6>Compétence:</h6>
//                       <p>{selectedOffre.competence}</p>
//                       <h6>Atouts:</h6>
//                       <p>{selectedOffre.atouts}</p>
//                     </>
//                   )}
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Fermer</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//       {showConfirmDeleteModal && (
//         <div
//           className="modal fade show"
//           id="confirmDeleteModal"
//           tabIndex="-1"
//           aria-labelledby="confirmDeleteModalLabel"
//           aria-hidden={!showConfirmDeleteModal}
//           style={{ display: 'block' }} // Ajouté pour afficher la modal
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="confirmDeleteModalLabel">Confirmer la suppression</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowConfirmDeleteModal(false)} aria-label="Close"></button>
//               </div>
//               <div className="modal-body">
//                 <p>Êtes-vous sûr de vouloir supprimer cette offre ?</p>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmDeleteModal(false)}>Annuler</button>
//                 <button type="button" className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SectionOffre;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import EditOffre from './EditOffre'; // Assurez-vous d'importer le composant EditOffre

const SectionOffre = () => {
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [offreToDelete, setOffreToDelete] = useState(null);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sectionOffres');
        setOffres(response.data);
        setFilteredOffres(response.data); // Initialize filteredOffres with the complete list
      } catch (error) {
        setMessage('Erreur lors du chargement des offres');
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffres();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredOffres(offres);
    } else {
      const filtered = offres.filter(offre =>
        offre.titre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOffres(filtered);
    }
  }, [searchTerm, offres]);

  const handleDelete = async () => {
    if (!offreToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/sectionOffres/${offreToDelete._id}`);
      const updatedOffres = filteredOffres.filter(offre => offre._id !== offreToDelete._id);
      setOffres(updatedOffres); // Update original offres list
      setFilteredOffres(updatedOffres); // Update filtered list
      setMessage('Offre supprimée avec succès');
      setShowConfirmDeleteModal(false); // Fermer la modal de confirmation après suppression
    } catch (error) {
      setMessage('Erreur lors de la suppression de l\'offre');
      console.error('Error deleting offer:', error);
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredOffres.map(offre => ({
      Titre: offre.titre,
      Description: offre.description,
      Mission: offre.mission,
      Competence: offre.competence,
      Atouts: offre.atouts,
    })));

    // Decorate the title row
    const titleRow = XLSX.utils.decode_range(worksheet['!ref']).s.r;
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellAddress = XLSX.utils.encode_cell({ c: C, r: titleRow });
      if (!worksheet[cellAddress]) continue;
      worksheet[cellAddress].s = {
        font: {
          bold: true,
          color: { rgb: 'FFFFFF' }, // White text color
        },
        fill: {
          fgColor: { rgb: '4F81BD' }, // Blue background color
        },
        alignment: {
          horizontal: 'center',
        },
      };
    }

    // Add the worksheet to a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Offres');

    // Export the workbook
    XLSX.writeFile(workbook, 'offres.xlsx');
  };

  const handleEdit = (offre) => {
    setSelectedOffre(offre);
    setShowEditModal(true);
  };

  const handleDetail = (offre) => {
    setSelectedOffre(offre);
    setShowDetailModal(true);
  };

  const handleConfirmDelete = (offre) => {
    setOffreToDelete(offre);
    setShowConfirmDeleteModal(true);
  };

  const refreshOffres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sectionOffres');
      setOffres(response.data);
      setFilteredOffres(response.data);
    } catch (error) {
      console.error('Error refreshing offers:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Section des Offres</h2>
      <form className="mb-4">
        <div className="form-group">
          <label htmlFor="search">Rechercher par titre:</label>
          <input
            type="text"
            id="search"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
      {message && <div className="alert alert-info">{message}</div>}
      <button onClick={downloadExcel} className="btn btn-primary mb-3">Télécharger Excel</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOffres.map(offre => (
            <tr key={offre._id}>
              <td>{offre.titre}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleDetail(offre)}
                >
                  Voir
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(offre)}
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleConfirmDelete(offre)}
                  className="btn btn-danger btn-sm"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOffre && (
        <>
          <EditOffre
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            offreId={selectedOffre._id}
            refreshOffres={refreshOffres}
          />
          <div
            className={`modal fade ${showDetailModal ? 'show' : ''}`}
            id="detailModal"
            tabIndex="-1"
            aria-labelledby="detailModalLabel"
            aria-hidden={!showDetailModal}
            style={{ display: showDetailModal ? 'block' : 'none' }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="detailModalLabel">Détails de l'Offre</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {selectedOffre && (
                    <>
                      <h6>Titre:</h6>
                      <p>{selectedOffre.titre}</p>
                      <h6>Description:</h6>
                      <p>{selectedOffre.description}</p>
                      <h6>Mission:</h6>
                      <p>{selectedOffre.mission}</p>
                      <h6>Compétence:</h6>
                      <p>{selectedOffre.competence}</p>
                      <h6>Atouts:</h6>
                      <p>{selectedOffre.atouts}</p>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Fermer</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showConfirmDeleteModal && (
        <div
          className="modal fade show"
          id="confirmDeleteModal"
          tabIndex="-1"
          aria-labelledby="confirmDeleteModalLabel"
          aria-hidden={!showConfirmDeleteModal}
          style={{ display: 'block' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmDeleteModalLabel">Confirmer la suppression</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmDeleteModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer cette offre ?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmDeleteModal(false)}>Annuler</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionOffre;
