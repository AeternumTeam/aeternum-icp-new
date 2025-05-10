import React, { useState } from "react";
import { FaEdit, FaLink, FaExternalLinkAlt, FaCheck } from 'react-icons/fa';
import useAuth from "../hooks/auth-check";
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

const ContainerProfile = () => {
  const { isAuthenticated } = useAuth();
  const [editUrlModal, setEditUrlModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const data = isAuthenticated ? JSON.parse(localStorage.getItem('user')) : null;
  const baseUrl = window.location.origin;
  const profileUrl = data ? `${data.url}` : `${baseUrl}/your-name`;

  // Toggle edit URL modal
  const toggleEditUrlModal = () => {
    setEditUrlModal(!editUrlModal);
    if (!editUrlModal) {
      // Initialize with current URL when opening modal
      setNewUrl(data?.url || `${baseUrl}/your-name`);
    }
  };

  // Handle URL update
  const handleUpdateUrl = async () => {
    try {
      
      // Here you would make an API call to update the URL
      // For now, we'll just update it in localStorage for demonstration
      const updatedUser = { ...data, url: newUrl };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('URL updated successfully');
      toggleEditUrlModal();
      
      // In a real app, you would refresh the user data or update state
    } catch (error) {
      console.error('Error updating URL:', error);
      toast.error('Failed to update URL');
    }
  };

  // Copy URL to clipboard
  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        setIsCopied(true);
        toast.success('URL copied to clipboard');
        
        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy URL:', err);
        toast.error('Failed to copy URL');
      });
  };

  // Open public profile in new tab
  const openPublicProfile = () => {
    window.open(profileUrl, '_blank');
  };

  return (
    <div className="card text-center mx-auto w-100 pt-5" style={{ backgroundColor: '#F6F4F4' }}>
      <div className="card-body mx-auto">
        <div className="d-flex align-items-start justify-content-center gap-5">
          <div className="mb-3">
              <img
                src= {data ? data.user.picture : "https://via.placeholder.com/80"}
                alt="Profile"
                style={{ borderRadius: '50%', width: '80%', height: '80%' }}
              />
              <h4 className="card-title mt-3">{data ? data.user.name : "Your name"}</h4>
              <button className="btn btn-primary w-100 btn-sm mt-3">Edit</button>
          </div>
        </div>


        <div className="d-flex align-items-center justify-content-center flex-wrap gap-3 mt-3">
          <span className="text-muted text-center w-100 w-md-auto">
              {profileUrl}
          </span>
          
          <a
              href="#"
              className="text-decoration-none text-success d-flex align-items-center"
              onClick={(e) => {
                e.preventDefault();
                toggleEditUrlModal();
              }}
          >
              <FaEdit className="me-1" />
              Edit URL
          </a>

          <button
              className="btn btn-link text-muted text-decoration-none d-flex align-items-center"
              style={{ padding: 0 }}
              onClick={copyUrlToClipboard}
          >
              {isCopied ? <FaCheck className="me-1" /> : <FaLink className="me-1" />}
              {isCopied ? 'Copied!' : 'Copy URL'}
          </button>

          <a
              href="#"
              className="text-decoration-none text-muted d-flex align-items-center"
              onClick={(e) => {
                e.preventDefault();
                openPublicProfile();
              }}
          >
              <FaExternalLinkAlt className="me-1" />
              Preview Public Profile
          </a>
        </div>
      </div>

      {/* Edit URL Modal */}
      <Modal isOpen={editUrlModal} toggle={toggleEditUrlModal} centered>
        <ModalHeader toggle={toggleEditUrlModal}>Edit Profile URL</ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <label htmlFor="profileUrl" className="form-label">Your profile URL</label>
            <div className="input-group">
              <Input
                type="text"
                id="profileUrl"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="your-name"
              />
            </div>
            <small className="text-muted">
              URL can only contain letters, numbers, hyphens, and underscores.
            </small>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleEditUrlModal}>Cancel</Button>
          <Button color="success" onClick={handleUpdateUrl}>Save Changes</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ContainerProfile;