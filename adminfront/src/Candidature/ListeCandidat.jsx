

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button, Modal, Form, Alert, Container, Row, Col } from "react-bootstrap";
// import jsPDF from "jspdf";
// import "jspdf-autotable"; 
// import "bootstrap/dist/css/bootstrap.min.css";
// import EditCandidat from "./EditCandidat";

// const ListeCandidat = () => {
//   const [files, setFiles] = useState([]);
//   const [error, setError] = useState("");
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [filterSkills, setFilterSkills] = useState("");
//   const [filterPosition, setFilterPosition] = useState("");

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/get-files");
//         setFiles(res.data.data);
//       } catch (err) {
//         setError("Échec de la récupération des fichiers");
//       }
//     };

//     fetchFiles();
//   }, []);

//   const handleDetail = (candidate) => {
//     setSelectedCandidate(candidate);
//     setShowDetailModal(true);
//   };

//   const handleCloseDetailModal = () => {
//     setShowDetailModal(false);
//   };

//   const handleEdit = (candidate) => {
//     setSelectedCandidate(candidate);
//     setShowEditModal(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/delete-file/${id}`);
//       setFiles(files.filter((file) => file._id !== id));
//     } catch (err) {
//       setError("Échec de la suppression du fichier");
//     }
//   };

//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//   };

//   const filteredFiles = files.filter((file) => {
//     return (
//       (filterSkills === "" || file.skillsTitle.toLowerCase().includes(filterSkills.toLowerCase())) &&
//       (filterPosition === "" || file.position.toLowerCase().includes(filterPosition.toLowerCase()))
//     );
//   });

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Détails du candidat", 14, 22);

//     doc.setFontSize(12);
//     filteredFiles.forEach((file, index) => {
//       if (index > 0) {
//         doc.addPage();
//       }

//       doc.autoTable({
//         startY: 30,
//         body: [
//           ["Nom", file.name],
//           ["Prénom", file.prenom],
//           ["Email", file.email],
//           ["Date de naissance", file.birthdate],
//           ["Téléphone", file.phone],
//           ["Poste actuel", file.currentPosition],
//           ["Poste souhaité", file.position],
//           ["Type d'emploi", file.employmentType],
//           ["Expérience", file.experience],
//           ["Description du poste", file.jobDescription],
//           ["Titre du poste", file.jobTitle],
//           ["Entreprise actuelle", file.company],
//           ["Lieu", file.location],
//           ["Date de début", file.startDate],
//           ["Date de fin", file.endDate],
//           ["Réalisations", file.achievements],
//           ["Compétences utilisées", file.skillsUsed],
//           ["Titre des compétences", file.skillsTitle],
//           ["Outils techniques", file.outil],
//           ["Description des compétences", file.skillsDescription],
//           ["Années d'expérience des compétences", file.skillsYears],
//           ["Certificats obtenus", file.certificat],
//           ["Titre des compétences transversales", file.skillsTitleTransversal],
//           ["Description des compétences transversales", file.skillsDescriptionTransversal],
//           ["Années d'expérience des compétences transversales", file.skillsYearsTransversal],
//         ],
//         styles: { cellPadding: 3, fontSize: 10 },
//         columnStyles: {
//           0: { fontStyle: "bold" },
//           1: { columnWidth: "auto" },
//         },
//         margin: { top: 30, left: 14, right: 14 },
//         tableWidth: "wrap",
//         showHead: "never",
//       });
//     });

//     doc.save("details-candidats.pdf");
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="mb-4">
//         <Col>
//           <h2 className="text-center">Liste des Candidatures</h2>
//         </Col>
//       </Row>

//       {error && (
//         <Row>
//           <Col>
//             <Alert variant="danger">{error}</Alert>
//           </Col>
//         </Row>
//       )}

// <Row className="justify-content-center mb-4">
//         <Col md={4} className="mb-3">
//           <Form.Group controlId="filterSkills">
//             <Form.Label>Compétence :</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Recherche par compétence"
//               value={filterSkills}
//               onChange={(e) => setFilterSkills(e.target.value)}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={4}>
//           <Form.Group controlId="filterPosition">
//             <Form.Label>Poste envisagé :</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Recherche par poste envisagé"
//               value={filterPosition}
//               onChange={(e) => setFilterPosition(e.target.value)}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         <Col className="text-center">
//           <Button variant="success" onClick={generatePDF}>
//             Exporter en PDF
//           </Button>
//         </Col>
//       </Row>

//       <Row>
//         <Col>
//           <Table striped bordered hover responsive="md" className="table-custom">
//             <thead className="table-dark">
//               <tr>
//                 <th>Nom</th>
//                 <th>Email</th>
//                 <th>Compétence</th>
//                 <th>Poste Actuel</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredFiles.map((file) => (
//                 <tr key={file._id}>
//                   <td>{file.name}</td>
//                   <td>{file.email}</td>
//                   <td>{file.skillsTitle}</td>
//                   <td>{file.currentPosition}</td>
//                   <td>
//                     <Button variant="primary" size="sm" onClick={() => handleDetail(file)}>
//                       Détail
//                     </Button>{" "}
//                     <Button variant="warning" size="sm" onClick={() => handleEdit(file)}>
//                       Modifier
//                     </Button>{" "}
//                     <Button variant="danger" size="sm" onClick={() => handleDelete(file._id)}>
//                       Supprimer
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Détails du candidat</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedCandidate && (
//             <Table bordered responsive>
//               <tbody>
//                 <tr>
//                   <td><strong>Nom</strong></td><td>{selectedCandidate.name}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Prénom</strong></td><td>{selectedCandidate.prenom}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Email</strong></td><td>{selectedCandidate.email}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Date de naissance</strong></td><td>{selectedCandidate.birthdate}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Téléphone</strong></td><td>{selectedCandidate.phone}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Poste actuel</strong></td><td>{selectedCandidate.currentPosition}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Poste souhaité</strong></td><td>{selectedCandidate.position}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Type d'emploi</strong></td><td>{selectedCandidate.employmentType}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Expérience</strong></td><td>{selectedCandidate.experience}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Description du poste</strong></td><td>{selectedCandidate.jobDescription}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Titre du poste</strong></td><td>{selectedCandidate.jobTitle}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Entreprise actuelle</strong></td><td>{selectedCandidate.company}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Lieu</strong></td><td>{selectedCandidate.location}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Date de début</strong></td><td>{selectedCandidate.startDate}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Date de fin</strong></td><td>{selectedCandidate.endDate}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Réalisations</strong></td><td>{selectedCandidate.achievements}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Compétences utilisées</strong></td><td>{selectedCandidate.skillsUsed}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Titre des compétences</strong></td><td>{selectedCandidate.skillsTitle}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Outils techniques</strong></td><td>{selectedCandidate.outil}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Description des compétences</strong></td><td>{selectedCandidate.skillsDescription}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Années d'expérience des compétences</strong></td><td>{selectedCandidate.skillsYears}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Certificats obtenus</strong></td><td>{selectedCandidate.certificat}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Titre des compétences transversales</strong></td><td>{selectedCandidate.skillsTitleTransversal}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Description des compétences transversales</strong></td><td>{selectedCandidate.skillsDescriptionTransversal}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Années d'expérience des compétences transversales</strong></td><td>{selectedCandidate.skillsYearsTransversal}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <p>
//                       CV:{" "}
//                       <a
//                         href={`http://localhost:5000/files/${selectedCandidate.pdf}`}
//                         download
//                       >
//                         {selectedCandidate.pdf}
//                       </a>
//                     </p>
//                   </td>
//                 </tr>
//               </tbody>
//             </Table>
//           )}
//         </Modal.Body>
//       </Modal>

//       <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Modifier le candidat</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <EditCandidat candidate={selectedCandidate} onClose={handleCloseEditModal} />
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default ListeCandidat;






import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Alert, Container, Row, Col } from "react-bootstrap";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import EditCandidat from "./EditCandidat";

const ListeCandidat = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filterSkills, setFilterSkills] = useState("");
  const [filterPosition, setFilterPosition] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get-files");
        setFiles(res.data.data);
      } catch (err) {
        setError("Échec de la récupération des fichiers");
      }
    };

    fetchFiles();
  }, []);

  const handleDetail = (candidate) => {
    setSelectedCandidate(candidate);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const handleEdit = (candidate) => {
    setSelectedCandidate(candidate);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-file/${id}`);
      setFiles(files.filter((file) => file._id !== id));
    } catch (err) {
      setError("Échec de la suppression du fichier");
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const filteredFiles = files.filter((file) => {
    return (
      (filterSkills === "" || file.skillsTitle.toLowerCase().includes(filterSkills.toLowerCase())) &&
      (filterPosition === "" || file.position.toLowerCase().includes(filterPosition.toLowerCase()))
    );
  });



  const handleUpdate = (updatedCandidate) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file._id === updatedCandidate._id ? updatedCandidate : file
      )
    );
    setShowEditModal(false); // Ferme le modal après la mise à jour
  };
  


  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredFiles.map((file) => ({
        Nom: file.name,
        Prénom: file.prenom,
        Email: file.email,
        "Date de naissance": file.birthdate,
        Téléphone: file.phone,
        "Poste actuel": file.currentPosition,
        "Poste souhaité": file.position,
        "Type d'emploi": file.employmentType,
        Expérience: file.experience,
        "Description du poste": file.jobDescription,
        "Titre du poste": file.jobTitle,
        "Entreprise actuelle": file.company,
        Lieu: file.location,
        "Date de début": file.startDate,
        "Date de fin": file.endDate,
        Réalisations: file.achievements,
        "Compétences utilisées": file.skillsUsed,
        "Titre des compétences": file.skillsTitle,
        "Outils techniques": file.outil,
        "Description des compétences": file.skillsDescription,
        "Années d'expérience des compétences": file.skillsYears,
        "Certificats obtenus": file.certificat,
        "Titre des compétences transversales": file.skillsTitleTransversal,
        "Description des compétences transversales": file.skillsDescriptionTransversal,
        "Années d'expérience des compétences transversales": file.skillsYearsTransversal,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidats");
    XLSX.writeFile(workbook, "details-candidats.xlsx");
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Liste des Candidatures</h2>
        </Col>
      </Row>

      {error && (
        <Row>
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

<Row className="justify-content-center mb-4">
        <Col md={4} className="mb-3">
          <Form.Group controlId="filterSkills">
            <Form.Label>Compétence :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Recherche par compétence"
              value={filterSkills}
              onChange={(e) => setFilterSkills(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="filterPosition">
            <Form.Label>Poste envisagé :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Recherche par poste envisagé"
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* <Row className="mb-4">
        <Col className="text-center">
          <Button variant="success" onClick={generatePDF}>
            Exporter en PDF
          </Button>
        </Col>
      </Row> */}
        <Row className="mb-4">
        <Col className="text-center">
          <Button variant="success" onClick={exportToExcel}>
            Exporter en Excel
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover responsive="md" className="table-custom">
            <thead className="table-dark">
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Compétence</th>
                <th>Poste Actuel</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file._id}>
                  <td>{file.name}</td>
                  <td>{file.email}</td>
                  <td>{file.skillsTitle}</td>
                  <td>{file.currentPosition}</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleDetail(file)}>
                      Détail
                    </Button>{" "}
                    <Button variant="warning" size="sm" onClick={() => handleEdit(file)}>
                      Modifier
                    </Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(file._id)}>
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Détails du candidat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCandidate && (
            <Table bordered responsive>
              <tbody>
                <tr>
                  <td><strong>Nom</strong></td><td>{selectedCandidate.name}</td>
                </tr>
                <tr>
                  <td><strong>Prénom</strong></td><td>{selectedCandidate.prenom}</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td><td>{selectedCandidate.email}</td>
                </tr>
                <tr>
                  <td><strong>Date de naissance</strong></td><td>{selectedCandidate.birthdate}</td>
                </tr>
                <tr>
                  <td><strong>Téléphone</strong></td><td>{selectedCandidate.phone}</td>
                </tr>
                <tr>
                  <td><strong>Poste actuel</strong></td><td>{selectedCandidate.currentPosition}</td>
                </tr>
                <tr>
                  <td><strong>Poste souhaité</strong></td><td>{selectedCandidate.position}</td>
                </tr>
                <tr>
                  <td><strong>Type d'emploi</strong></td><td>{selectedCandidate.employmentType}</td>
                </tr>
                <tr>
                  <td><strong>Expérience</strong></td><td>{selectedCandidate.experience}</td>
                </tr>
                <tr>
                  <td><strong>Description du poste</strong></td><td>{selectedCandidate.jobDescription}</td>
                </tr>
                <tr>
                  <td><strong>Titre du poste</strong></td><td>{selectedCandidate.jobTitle}</td>
                </tr>
                <tr>
                  <td><strong>Entreprise actuelle</strong></td><td>{selectedCandidate.company}</td>
                </tr>
                <tr>
                  <td><strong>Lieu</strong></td><td>{selectedCandidate.location}</td>
                </tr>
                <tr>
                  <td><strong>Date de début</strong></td><td>{selectedCandidate.startDate}</td>
                </tr>
                <tr>
                  <td><strong>Date de fin</strong></td><td>{selectedCandidate.endDate}</td>
                </tr>
                <tr>
                  <td><strong>Réalisations</strong></td><td>{selectedCandidate.achievements}</td>
                </tr>
                <tr>
                  <td><strong>Compétences utilisées</strong></td><td>{selectedCandidate.skillsUsed}</td>
                </tr>
                <tr>
                  <td><strong>Titre des compétences</strong></td><td>{selectedCandidate.skillsTitle}</td>
                </tr>
                <tr>
                  <td><strong>Outils techniques</strong></td><td>{selectedCandidate.outil}</td>
                </tr>
                <tr>
                  <td><strong>Description des compétences</strong></td><td>{selectedCandidate.skillsDescription}</td>
                </tr>
                <tr>
                  <td><strong>Années d'expérience des compétences</strong></td><td>{selectedCandidate.skillsYears}</td>
                </tr>
                <tr>
                  <td><strong>Certificats obtenus</strong></td><td>{selectedCandidate.certificat}</td>
                </tr>
                <tr>
                  <td><strong>Titre des compétences transversales</strong></td><td>{selectedCandidate.skillsTitleTransversal}</td>
                </tr>
                <tr>
                  <td><strong>Description des compétences transversales</strong></td><td>{selectedCandidate.skillsDescriptionTransversal}</td>
                </tr>
                <tr>
                  <td><strong>Années d'expérience des compétences transversales</strong></td><td>{selectedCandidate.skillsYearsTransversal}</td>
                </tr>
                <tr>
                  <td>
                    <p>
                      CV:{" "}
                      <a
                        href={`http://localhost:5000/files/${selectedCandidate.pdf}`}
                        download
                      >
                        {selectedCandidate.pdf}
                      </a>
                    </p>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Modifier le candidat</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <EditCandidat
      candidate={selectedCandidate}
      onClose={handleCloseEditModal}
      onUpdate={handleUpdate}
    />
  </Modal.Body>
</Modal>

    </Container>
  );
};

export default ListeCandidat;




