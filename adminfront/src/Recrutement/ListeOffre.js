


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable'; // Import the plugin for tables
// import './listeOffre.css';

// const ListeOffre = () => {
//   const [offres, setOffres] = useState([]);
//   const [filteredOffres, setFilteredOffres] = useState([]);
//   const [error, setError] = useState('');
//   const [showDetails, setShowDetails] = useState(false);
//   const [selectedOffre, setSelectedOffre] = useState(null);
//   const [filterPoste, setFilterPoste] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(3);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//   const [offreToDelete, setOffreToDelete] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOffres = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/recrutements');
//         setOffres(res.data);
//         setFilteredOffres(res.data);
//       } catch (err) {
//         setError('Erreur lors de la récupération des offres');
//       }
//     };

//     fetchOffres();
//   }, []);

//   useEffect(() => {
//     const result = offres.filter(offre =>
//       offre.poste.toLowerCase().includes(filterPoste.toLowerCase())
//     );
//     setFilteredOffres(result);
//   }, [filterPoste, offres]);

//   const toggleDetails = (offre) => {
//     setSelectedOffre(offre);
//     setShowDetails(true);
//   };

//   const closeDetails = () => {
//     setSelectedOffre(null);
//     setShowDetails(false);
//   };

//   const editOffre = (id) => {
//     navigate(`/editRecrutement/${id}`);
//   };

//   const deleteOffre = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/recrutements/${id}`);
//       setFilteredOffres(filteredOffres.filter(offre => offre._id !== id));
//       setOffres(offres.filter(offre => offre._id !== id));
//       setShowConfirmDelete(false);
//     } catch (err) {
//       setError('Erreur lors de la suppression de l\'offre');
//     }
//   };

//   const handleConfirmDelete = () => {
//     if (offreToDelete) {
//       deleteOffre(offreToDelete._id);
//     }
//   };

//   const handleCancelDelete = () => {
//     setShowConfirmDelete(false);
//     setOffreToDelete(null);
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text('Liste des Offres d\'Emploi', 14, 22);
//     doc.setFontSize(12);

//     const tableColumn = ["Entreprise", "Poste", "Référence", "Mission", "Description", "Compétence obligatoire", "Compétence souhaitée", "Certificat", "Autre"];
//     const tableRows = [];

//     offres.forEach(offre => {
//       const offreData = [
//         offre.entreprise,
//         offre.poste,
//         offre.reference,
//         offre.mission,
//         offre.description,
//         offre.competenceObligatoire,
//         offre.competenceSouhaite,
//         offre.certificat,
//         offre.autre,
//       ];
//       tableRows.push(offreData);
//     });

//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 30,
//     });

//     doc.save('liste_offres.pdf');
//   };

//   // Logic for pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredOffres.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="ListeOffre container">
//       <h2 className='text-center'>Liste des Offres d'Emploi</h2>
//       {error && <p className="text-danger">{error}</p>}

//       <Form.Group controlId="filterPoste">
//         <Form.Label>Filtrer par Poste</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Rechercher par poste"
//           value={filterPoste}
//           onChange={(e) => setFilterPoste(e.target.value)}
//           className="custom-search-bar"
//         />
//       </Form.Group>
//       <br/>
      
//       <Button variant="primary" onClick={exportPDF} className="mb-3">Exporter en PDF</Button>
      
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Poste</th>
//             <th>Entreprise</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map(offre => (
//             <tr key={offre._id}>
//               <td>{offre.poste}</td>
//               <td>{offre.entreprise}</td>
//               <td>
//                 <Button variant="primary" onClick={() => toggleDetails(offre)}>Détail</Button>{' '}
//                 <Button variant="success" onClick={() => editOffre(offre._id)}>Modifier</Button>{' '}
//                 <Button variant="danger" onClick={() => { setOffreToDelete(offre); setShowConfirmDelete(true); }}>Supprimer</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Pagination>
//         {Array.from({ length: Math.ceil(filteredOffres.length / itemsPerPage) }).map((_, index) => (
//           <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
//             {index + 1}
//           </Pagination.Item>
//         ))}
//       </Pagination>

//       {selectedOffre && (
//         <Modal show={showDetails} onHide={closeDetails}>
//           <Modal.Header closeButton>
//             <Modal.Title>Détails de l'Offre</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Table striped bordered hover>
//               <tbody>
//                 <tr>
//                   <th>Entreprise</th>
//                   <td>{selectedOffre.entreprise}</td>
//                 </tr>
//                 <tr>
//                   <th>Poste</th>
//                   <td>{selectedOffre.poste}</td>
//                 </tr>
//                 <tr>
//                   <th>Référence</th>
//                   <td>{selectedOffre.reference}</td>
//                 </tr>
//                 <tr>
//                   <th>Mission</th>
//                   <td>{selectedOffre.mission}</td>
//                 </tr>
//                 <tr>
//                   <th>Description</th>
//                   <td>{selectedOffre.description}</td>
//                 </tr>
//                 <tr>
//                   <th>Compétence obligatoire</th>
//                   <td>{selectedOffre.competenceObligatoire}</td>
//                 </tr>
//                 <tr>
//                   <th>Compétence souhaitée</th>
//                   <td>{selectedOffre.competenceSouhaite}</td>
//                 </tr>
//                 <tr>
//                   <th>Certificat</th>
//                   <td>{selectedOffre.certificat}</td>
//                 </tr>
//                 <tr>
//                   <th>Autre</th>
//                   <td>{selectedOffre.autre}</td>
//                 </tr>
//               </tbody>
//             </Table>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={closeDetails}>
//               Fermer
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}

//       {showConfirmDelete && (
//         <Modal show={showConfirmDelete} onHide={handleCancelDelete}>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirmer la Suppression</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             Êtes-vous sûr de vouloir supprimer cette offre ?
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCancelDelete}>
//               Annuler
//             </Button>
//             <Button variant="danger" onClick={handleConfirmDelete}>
//               Supprimer
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default ListeOffre;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import the xlsx library
import './listeOffre.css';

const ListeOffre = () => {
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [filterPoste, setFilterPoste] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [offreToDelete, setOffreToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recrutements');
        setOffres(res.data);
        setFilteredOffres(res.data);
      } catch (err) {
        setError('Erreur lors de la récupération des offres');
      }
    };

    fetchOffres();
  }, []);

  useEffect(() => {
    const result = offres.filter(offre =>
      offre.poste.toLowerCase().includes(filterPoste.toLowerCase())
    );
    setFilteredOffres(result);
  }, [filterPoste, offres]);

  const toggleDetails = (offre) => {
    setSelectedOffre(offre);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setSelectedOffre(null);
    setShowDetails(false);
  };

  const editOffre = (id) => {
    navigate(`/editRecrutement/${id}`);
  };

  const deleteOffre = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recrutements/${id}`);
      setFilteredOffres(filteredOffres.filter(offre => offre._id !== id));
      setOffres(offres.filter(offre => offre._id !== id));
      setShowConfirmDelete(false);
    } catch (err) {
      setError('Erreur lors de la suppression de l\'offre');
    }
  };

  const handleConfirmDelete = () => {
    if (offreToDelete) {
      deleteOffre(offreToDelete._id);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setOffreToDelete(null);
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(offres);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Offres d'emploi");
    XLSX.writeFile(workbook, 'liste_offres.xlsx');
  };

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOffres.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ListeOffre container">
      <h2 className='text-center'>Liste des Offres d'Emploi</h2>
      {error && <p className="text-danger">{error}</p>}

      <Form.Group controlId="filterPoste">
        <Form.Label>Filtrer par Poste</Form.Label>
        <Form.Control
          type="text"
          placeholder="Rechercher par poste"
          value={filterPoste}
          onChange={(e) => setFilterPoste(e.target.value)}
          className="custom-search-bar"
        />
      </Form.Group>
      <br/>
      
      <Button variant="primary" onClick={exportExcel} className="mb-3">Exporter en Excel</Button>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Poste</th>
            <th>Entreprise</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(offre => (
            <tr key={offre._id}>
              <td>{offre.poste}</td>
              <td>{offre.entreprise}</td>
              <td>
                <Button variant="primary" onClick={() => toggleDetails(offre)}>Détail</Button>{' '}
                <Button variant="success" onClick={() => editOffre(offre._id)}>Modifier</Button>{' '}
                <Button variant="danger" onClick={() => { setOffreToDelete(offre); setShowConfirmDelete(true); }}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: Math.ceil(filteredOffres.length / itemsPerPage) }).map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {selectedOffre && (
        <Modal show={showDetails} onHide={closeDetails}>
          <Modal.Header closeButton>
            <Modal.Title>Détails de l'Offre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Entreprise</th>
                  <td>{selectedOffre.entreprise}</td>
                </tr>
                <tr>
                  <th>Poste</th>
                  <td>{selectedOffre.poste}</td>
                </tr>
                <tr>
                  <th>Référence</th>
                  <td>{selectedOffre.reference}</td>
                </tr>
                <tr>
                  <th>Mission</th>
                  <td>{selectedOffre.mission}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{selectedOffre.description}</td>
                </tr>
                <tr>
                  <th>Compétence obligatoire</th>
                  <td>{selectedOffre.competenceObligatoire}</td>
                </tr>
                <tr>
                  <th>Compétence souhaitée</th>
                  <td>{selectedOffre.competenceSouhaite}</td>
                </tr>
                <tr>
                  <th>Certificat</th>
                  <td>{selectedOffre.certificat}</td>
                </tr>
                <tr>
                  <th>Autre</th>
                  <td>{selectedOffre.autre}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDetails}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showConfirmDelete && (
        <Modal show={showConfirmDelete} onHide={handleCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmer la Suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Êtes-vous sûr de vouloir supprimer cette offre ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>
              Annuler
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ListeOffre;

