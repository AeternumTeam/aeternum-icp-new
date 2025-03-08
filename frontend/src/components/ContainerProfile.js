import React from "react";
import { FaEdit, FaLink, FaExternalLinkAlt } from 'react-icons/fa';
import useAuth from "../hooks/auth-check";

const ContainerProfile = () => {
  const { isAuthenticated } = useAuth();

  const data = isAuthenticated ? JSON.parse(localStorage.getItem('user')) : null;
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
              { data ? data.url : 'http://localhost:3000/your-name' }
          </span>
          
          <a
              href="#"
              className="text-decoration-none text-success d-flex align-items-center"
          >
              <FaEdit className="me-1" />
              Edit URL
          </a>

          <button
              className="btn btn-link text-muted text-decoration-none d-flex align-items-center"
              style={{ padding: 0 }}
          >
              <FaLink className="me-1" />
              Copy URL
          </button>

          <a
              href="#"
              className="text-decoration-none text-muted d-flex align-items-center"
          >
              <FaExternalLinkAlt className="me-1" />
              Preview Public Profile
          </a>
      </div>
      </div>
    </div>
  );
}

export default ContainerProfile;
