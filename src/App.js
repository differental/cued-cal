import './App.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import 'bootstrap/dist/css/bootstrap.min.css';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function App() {

  const Warn = (fileLink) => {
    withReactContent(Swal).fire({
      icon: "warning",
      title: "Non-Final Calendar",
      text: "The department might change things around before term starts!",
      footer: 'Feel free to star this page and check back later!',
      showConfirmButton: true,
      showDenyButton: true,
      showCloseButton: false,
      confirmButtonText: 'Yes, download now!',
      denyButtonText: 'No, later'
    }).then((result) => {
      if (result.isConfirmed) {
        Success();
        setTimeout(() => {
          window.location.href = fileLink;
        }, 3000);
      }
    });
  };

  const Success = () => {
    withReactContent(Swal).fire({
      icon: "success",
      title: "Yessir",
      text: "Download Successful!",
      timer: 3000,
      showConfirmButton: false,
      showCloseButton: false,
      timerProgressBar: true
    });
  };

  const [formData, setFormData] = useState({
    generateOption: '',
    labGroup: '',
    fileMode: '1'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerateOptionChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      generateOption: value,
      labGroup: value === 'lecture' ? '' : formData.labGroup // Reset lab group when "Lectures Only" is chosen
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let fileLink = '';

    let a = parseInt(formData.labGroup, 10)
    // Assuming you have a known link to the file
    if (formData.generateOption === 'lecture') {
      fileLink = `/ical/lecture.ics`;
    }
    else {
      fileLink = `/ical/${encodeURIComponent(formData.generateOption)}_${encodeURIComponent(a)}.ics`;
    }
    //const randomNumber = getRandomNumber(1, 4);
    //console.log(randomNumber)
    //if (randomNumber >= 2) {
    Warn(fileLink);
    //Success();
    
    //}
    //else {
    //  Fail();
    //  setTimeout(() => {
    //    window.location.href = `#`;
    //  }, 3000);
   // }
  };

  return (
    <Container className="App">
      <Row className="justify-content-md-center"><Col md="auto">
      <h1>IA Easter</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Calendar</Form.Label>
          <Col sm={10}>
            <label className={formData.generateOption === 'combined'?"btn btn-primary":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="generateOption"
                value="combined"
                checked={formData.generateOption === 'combined'}
                onChange={handleGenerateOptionChange}
                required
              />
              Combined
            </label>
            <label className={formData.generateOption === 'lecture'?"btn btn-primary":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="generateOption"
                value="lecture"
                checked={formData.generateOption === 'lecture'}
                onChange={handleGenerateOptionChange}
                required
              />
              Lectures Only
            </label>
            <label className={formData.generateOption === 'lab'?"btn btn-primary":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="generateOption"
                value="lab"
                checked={formData.generateOption === 'lab'}
                onChange={handleGenerateOptionChange}
                required
              />
              Labs Only
            </label>
          </Col>
        </Form.Group>
        {formData.generateOption !== 'lecture' && (
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} htmlFor="labGroup">Lab Group</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                id="labGroup"
                name="labGroup"
                min="1"
                max="179"
                value={formData.labGroup}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>
        )}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Lectures</Form.Label>
          <Col sm={10}>
            <label className={formData.fileMode === '0'?"btn btn-danger":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="fileMode"
                value="0"
                checked={formData.fileMode === '0'}
                onChange={handleInputChange}
                required
                disabled
              />
              Minimum
            </label>
            <label className={formData.fileMode === '1'?"btn btn-warning":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="fileMode"
                value="1"
                checked={formData.fileMode === '1'}
                onChange={handleInputChange}
                required
              />
              Essential
            </label>
            <label className={formData.fileMode === '2'?"btn btn-success":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="fileMode"
                value="2"
                checked={formData.fileMode === '2'}
                onChange={handleInputChange}
                required
              />
              Full
            </label>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Download ics</Button>
          </Col>
        </Form.Group>
      </Form>
      </Col></Row>
    </Container>
  );
}

export default App;