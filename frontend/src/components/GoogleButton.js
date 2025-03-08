import React from 'react';
import { Button, Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { loginGoogle } from '../fetch/auth.js';

const GoogleButton = () => {
  const navigate = useNavigate();

  return (
    <Form onSubmit={loginGoogle}>
      <Button 
        className="d-flex mb-4 align-items-center bg-white justify-content-center border border-dark-subtle btn btn-primary px-4 py-2 w-100"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" 
          alt="Google logo" 
          width="20" 
          height="20" 
          className="me-2"
        />
        <span className="text-dark">Google</span>
      </Button>
    </Form>
  );
};

export default GoogleButton;
