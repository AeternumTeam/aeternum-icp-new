import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink, Form, FormGroup, Button,
  Spinner, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input
} from 'reactstrap';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { BsUpload, BsXCircle } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";
import { addCredential, analyzerFile, getBadges } from '../fetch/issuer';

const BadgeWalletCard = (args) => {
  const [modal, setModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [badges, setBadges] = useState([]);
  const [error, setError] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [dynamicInputs, setDynamicInputs] = useState([]);

  const toggle = () => setModal(!modal);

  const fetchBadges = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedBadges = await getBadges();
      const processedBadges = fetchedBadges.map(badge => ({
        url: `${process.env.REACT_APP_SERVER_URL}/api/img/${badge.data.certificateName}`,
      }));
      setBadges(processedBadges);
    } catch (err) {
      setError('Failed to fetch badges. Please try again later.');
      console.error('Error fetching badges:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const {labels, values} = await analyzerFile(file);

        setSelectedFile(file);
        setFileData({labels, values});

      if (labels && values) {
        const inputs = Object.keys(labels).map((key) => ({
          id: key,
          label: labels[key],
          value: values[key] || '',
        }));
        setDynamicInputs(inputs);
      }

      } catch (error) {
        console.error('Error analyzing file:', error);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  // const handleAddBadge = async () => {
  //   if (!selectedFile) return;
  //   setIsLoading(true);
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   setIsLoading(false);
  //   toggle();
  // };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="w-100">
        <Card className="p-3" style={{ borderRadius: '10px', minHeight: '500px', backgroundColor: '#F6F4F4' }}>
          <CardBody>
            {/* Header */}
            {/* <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 font-weight-bold">Badge Wallet</h5>
              <a href="#" className="text-decoration-none text-success d-flex align-items-center">
                <FaEdit className="me-1" /> Reorder/Edit
              </a>
            </div> */}

            {/* Add Badge Link */}
            <span className="text-decoration-none text-success d-flex align-items-center mb-3" style={{ cursor: 'pointer' }} onClick={toggle}>
              <FaPlus className="me-1" /> Tambah badge dari platform lain
            </span>

            {/* Tabs */}
            <Nav tabs>
              <NavItem>
                <NavLink href="#" className="text-dark active">Aeternum ({badges.length})</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" className="text-dark">Other (0)</NavLink>
              </NavItem>
            </Nav>

            {/* Message */}
            <div className="text-center text-muted mt-4">
              {badges.length === 0 ? (
                <p>Gunakan opsi +Tambah di atas untuk membagikan lencana Anda dari penyedia lain.</p>
              ) : (
                <div className="row mt-4">
                  {badges.map((img, index) => (
                    <div key={index} className="col-6 col-md-4 col-lg-3 mb-4 position-relative">
                      <img
                        src={img.url}
                        alt={`Lencana ${index + 1}`}
                        className="img-fluid rounded h-100"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div onClick={() => openImageModal(img.url)} className="overlay position-absolute top-0 start-0 h-100 d-flex align-items-center justify-content-center">
                        <Link to="#" className="image-popup text-white fs-3">
                          <MdOutlineArrowOutward size={28} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Add Badge Modal */}
      <Modal isOpen={modal} toggle={toggle} {...args} centered>
        <Form onSubmit={addCredential}>
          <ModalHeader toggle={toggle}>Tambah Badge</ModalHeader>
          <ModalBody>
            <p>
              Tambahkan kredensial dari penyedia lain dengan mengunggah file.
            </p>
            <FormGroup>
              <Label for="email">Email Penerima</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Masukan email penerima"
              />
            </FormGroup>
            
            {/* <FormGroup>
              <Label for="name">Nama Penerima</Label>
              <Input
                type="text"
                name="recipient"
                id="name"
                placeholder="Masukan nama penerima"
              />
            </FormGroup> */}

            {/* Render dynamic inputs based on file analysis */}
            {dynamicInputs.map((input) => (
              <FormGroup key={input.id}>
                <Label for={input.id}>{input.label}</Label>
                <Input
                  type="text"
                  id={input.id}
                  name={input.id}
                  value={input.value}
                  readOnly
                />
              </FormGroup>
            ))}

            <FormGroup>
              <div className="text-center">
                <Button color="link" className="text-decoration-none text-primary" tag="label" style={{ cursor: 'pointer' }}>
                  <BsUpload size={24} className="me-2" /> Upload credential
                  <Input type="file" name = "certificateFile" accept=".png, .svg, .pdf, .json" onChange={handleFileChange} style={{ display: 'none' }} />
                </Button>
                <p className="small text-muted">File Types: png, svg, pdf, or json</p>

                {selectedFile && (
                  <div className="d-inline-flex align-items-center border border-primary p-2 rounded mt-2">
                    <span>{selectedFile.name}</span>
                    <Button color="link" onClick={removeFile} className="ms-2 p-0">
                      <BsXCircle size={20} />
                    </Button>
                  </div>
                )}
              </div>
            </FormGroup>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-between">
            <Button color="link" onClick={toggle} className="text-success">Cancel</Button>
            <Button color="success" disabled={!selectedFile || isLoading}>
              {isLoading ? <Spinner size="sm" color="light" /> : 'Tambah Badge'}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* Image Modal */}
      <Modal isOpen={isOpen} toggle={closeModal} centered size="lg">
        <ModalBody>
          <img src={selectedImage} alt="Selected" className="img-fluid" />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BadgeWalletCard;