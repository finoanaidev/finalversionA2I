import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Alert, Container, Row, Col, Form } from "react-bootstrap";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";

const ListeCandidat = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [filterPrenom, setFilterPrenom] = useState("");

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-file/${id}`);
      setFiles(files.filter((file) => file._id !== id));
    } catch (err) {
      setError("Échec de la suppression du fichier");
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      files.map((file) => ({
        Nom: file.name,
        Prénom: file.prenom,
        Email: file.email,
        Téléphone: file.phone,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidats");
    XLSX.writeFile(workbook, "details-candidats.xlsx");
  };

  const filteredFiles = files.filter((file) => {
    return (
      filterPrenom === "" || file.prenom.toLowerCase().includes(filterPrenom.toLowerCase())
    );
  });

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
        <Col md={4}>
          <Form.Group controlId="filterPrenom">
            <Form.Label>Prénom :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Recherche par prénom"
              value={filterPrenom}
              onChange={(e) => setFilterPrenom(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="text-center">
          <Button variant="success" onClick={exportToExcel}>
            Exporter en Excel
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="text-center">
          <h4>Nombre de candidats : {filteredFiles.length}</h4>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover responsive="md" className="table-custom">
            <thead className="table-dark">
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file._id}>
                  <td>{file.name}</td>
                  <td>{file.prenom}</td>
                  <td>{file.email}</td>
                  <td>{file.phone}</td>
                  <td>
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
    </Container>
  );
};

export default ListeCandidat;
