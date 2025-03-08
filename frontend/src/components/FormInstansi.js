import React, { useState } from 'react';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Progress
} from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import { FaTrashAlt } from 'react-icons/fa';

const SubmissionForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [hashCode, setHashCode] = useState('');
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const uploadedFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      progress: 0,
      status: 'Uploading',
    }));

    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);

    // Simulate file upload progress
    uploadedFiles.forEach((uploadedFile) => {
      const interval = setInterval(() => {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.name === uploadedFile.name
              ? { ...f, progress: f.progress + 10 }
              : f
          )
        );

        if (uploadedFile.progress >= 100) {
          clearInterval(interval);
          setFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.name === uploadedFile.name
                ? { ...f, status: 'File uploaded successfully' }
                : f
            )
          );
        }
      }, 500);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf, image/*',
  });

  const handleDelete = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert("Form submitted!");
  };

  return (
    <Container className="mt-5">
      <h3>Kirim Sertifikat</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Masukan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label for="name">Nama</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Masukan nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label for="hashCode">Alamat Sertifikat</Label>
          <Input
            type="text"
            name="hashCode"
            id="hashCode"
            placeholder="Masukan kode hash"
            value={hashCode}
            onChange={(e) => setHashCode(e.target.value)}
          />
        </FormGroup>
        
        <div {...getRootProps()} className="p-3 border border-secondary rounded text-center mb-3 py-5" style={{ cursor: 'pointer', color: '#6c757d' }}>
          <input {...getInputProps()} />
          <p>Browse...Or drop files here</p>
        </div>

        {files.map((file, index) => (
          <div key={index} className="d-flex align-items-center justify-content-between border-bottom py-2">
            <div>
              <strong>{file.name}</strong>
              <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>{file.size}</p>
              <p className="mb-0 text-success" style={{ fontSize: '0.9rem' }}>{file.status}</p>
            </div>
            <div style={{ flex: 1, marginLeft: '10px' }}>
              <Progress value={file.progress} color="primary" style={{ height: '8px' }} />
            </div>
            <Button color="link" onClick={() => handleDelete(file.name)}>
              <FaTrashAlt color="gray" />
            </Button>
          </div>
        ))}

        <Button color="primary" type="submit" className="mt-3">Kirim</Button>
      </Form>
    </Container>
  );
};

export default SubmissionForm;
