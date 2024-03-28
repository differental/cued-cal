import './App.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function App() {

  useEffect(() => {
    document.title = 'CUED Calendar Assistant';
  }, []);

  const pleaseFillForm = () => {
    withReactContent(Swal).fire({
      icon: "error",
      title: "Form Incomplete",
      text: "I'm here to protect you from executing the unknown.",
      timer: 3000,
      showConfirmButton: false,
      showCloseButton: false,
      timerProgressBar: true
    });
  };

  const downloadFile = (fileLink) => {
    withReactContent(Swal).fire({
      icon: "success",
      title: "Yessir",
      text: "Download Successful!",
      timer: 3000,
      footer: '<a style="color: #FF0000">Timings are not final and subject to change before term.</a> <br/> <a style="color: #FF0000">Subscribe to webcal to keep them updated.</a>',
      showConfirmButton: false,
      showCloseButton: false,
      timerProgressBar: true
    }).then(
      setTimeout(() => {
        window.location.href = fileLink;
      }, 3000)
    );
  };

  const disclaimer = () => {
    withReactContent(Swal).fire({
      icon: "warning",
      title: "Disclaimer",
      text: 'These calendars are NOT definitive . They are provided for convenience only. It is your responsibility to make sure you know when all your lectures are by checking the timetable published by the teaching office, and the online module details.',
      showConfirmButton: true,
      confirmButtonText: 'Official Calendar Page',
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          window.location.href = "http://td.eng.cam.ac.uk/tod/public/list_icals.php";
        }, 0)
      }
    });
  };

  const [formData, setFormData] = useState({
    year: '1',
    term: 'easter',
    generateOption: '',
    labGroup: '',
    fileMode: '2'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'year') {
      setFormData({ ...formData, [name]: value, generateOption: '' });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGenerateOptionChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      generateOption: value,
      labGroup: value === 'lecture' ? '' : formData.labGroup, // Reset lab group when "Lectures Only" is chosen
      fileMode: value === 'lab' ? '' : formData.fileMode
    });
  };

  const handleDownload = (event) => {
    event.preventDefault();

    if (formData.generateOption === '' || (formData.generateOption !== 'lecture' && formData.labGroup === '') || (formData.generateOption !== 'lab' && formData.fileMode === '') || parseInt(formData.labGroup, 10) >= 180 || parseInt(formData.labGroup, 10) <= 0) {
      pleaseFillForm();
      return;
    }

    let fileLink = '';

    let a = parseInt(formData.labGroup, 10)
    // Assuming you have a known link to the file
    if (formData.generateOption === 'lecture') {
      fileLink = `/ical_new/${encodeURIComponent(formData.year)}_${encodeURIComponent(formData.term)}_lecture_${encodeURIComponent(formData.fileMode)}.ics`;
    }
    else if (formData.generateOption === 'combined') {
      fileLink = `/ical_new/${encodeURIComponent(formData.year)}_${encodeURIComponent(formData.term)}_${encodeURIComponent(a)}_combined_${encodeURIComponent(formData.fileMode)}.ics`;
    }
    else { //lab
      fileLink = `/ical_new/${encodeURIComponent(formData.year)}_${encodeURIComponent(formData.term)}_${encodeURIComponent(a)}_lab.ics`;
    }
    //const randomNumber = getRandomNumber(1, 4);
    //console.log(randomNumber)
    //if (randomNumber >= 2) {
    downloadFile(fileLink);
    //Success();
    
    //}
    //else {
    //  Fail();
    //  setTimeout(() => {
    //    window.location.href = `#`;
    //  }, 3000);
   // }
  };

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (formData.generateOption === '' || (formData.generateOption !== 'lecture' &&  formData.labGroup === '') || (formData.generateOption !== 'lab' && formData.fileMode === '') || parseInt(formData.labGroup, 10) >= 180 || parseInt(formData.labGroup, 10) <= 0) {
      pleaseFillForm();
      return;
    }

    let fileLink = '';

    let a = parseInt(formData.labGroup, 10)
    // Assuming you have a known link to the file
    if (formData.generateOption === 'lecture') {
      fileLink = `webcal://edcal.brianc.xyz/ical_new/${encodeURIComponent(formData.year)}_${encodeURIComponent(formData.term)}_lecture_${encodeURIComponent(formData.fileMode)}.ics`;
    }
    else if (formData.generateOption === 'combined') {
      fileLink = `webcal://edcal.brianc.xyz/ical_new/${encodeURIComponent(formData.year)}_${encodeURIComponent(formData.term)}_${encodeURIComponent(a)}_combined_${encodeURIComponent(formData.fileMode)}.ics`;
    }
    else { //lab
      fileLink = `webcal://edcal.brianc.xyz/ical_new/${encodeURIComponent(formData.year)}_${encodeURIComponent(formData.term)}_${encodeURIComponent(a)}_lab.ics`;
    }
    setTimeout(() => {
      window.location.href = fileLink;
    }, 0)
  };

  return (
    <Container className="App">
      <Row className="justify-content-md-center"><Col md="auto">
      <h1>CUED Calendar Assistant</h1>
      <div class="alert alert-warning" role="alert">
        It is your responsibility to check the timetable published by the teaching office.<br/>
        <a href="#" onClick={disclaimer}>Learn More</a>
      </div>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Year</Form.Label>
          <Col sm={10}>
            <label className={formData.year === '1'?"btn btn-primary":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="year"
                value="1"
                checked={formData.year === '1'}
                onChange={handleInputChange}
                required
              />
              IA
            </label>
            <label className={formData.year === '2'?"btn btn-primary":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="year"
                value="2"
                checked={formData.year === '2'}
                onChange={handleInputChange}
              />
              IB
            </label>
            <label className={formData.year === '3'?"btn btn-primary":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="year"
                value="3"
                checked={formData.year === '3'}
                onChange={handleInputChange}
                disabled
              />
              IIA
            </label>
            <label className={formData.year === '4'?"btn btn-primary":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="year"
                value="4"
                checked={formData.year === '4'}
                onChange={handleInputChange}
                disabled
              />
              IIB
            </label>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Term</Form.Label>
          <Col sm={10}>
            <label className={formData.term === 'mich'?"btn btn-primary":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="term"
                value="mich"
                checked={formData.term === 'mich'}
                onChange={handleInputChange}
                required
              />
              Michaelmas
            </label>
            <label className={formData.term === 'lent'?"btn btn-primary":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="term"
                value="lent"
                checked={formData.term === 'lent'}
                onChange={handleInputChange}
                required
              />
              Lent
            </label>
            <label className={formData.term === 'easter'?"btn btn-primary":"btn btn-default"}>
              <Form.Check
                inline
                type="radio"
                name="term"
                value="easter"
                checked={formData.term === 'easter'}
                onChange={handleInputChange}
                required
                disabled={formData.year === '2' && (formData.generateOption === 'lab' || formData.generateOption === 'combined')}
              />
              Easter
            </label>
          </Col>
        </Form.Group>
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
                disabled={formData.year === '2' && formData.term === 'easter'}
              />
              Both
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
              Lectures
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
                disabled={formData.year === '2' && formData.term === 'easter'}
              />
              Labs
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
        {formData.generateOption !== 'lab' && (
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Lectures</Form.Label>
            <Col sm={10}>
              <label className={formData.fileMode === '1'?"btn btn-danger":"btn btn-default"}>
                <Form.Check
                  inline
                  type="radio"
                  name="fileMode"
                  value="1"
                  checked={formData.fileMode === '1'}
                  onChange={handleInputChange}
                  required
                />
                Minimum
              </label>
              <label className={formData.fileMode === '2'?"btn btn-warning":"btn btn-default"}>
                <Form.Check
                  inline
                  type="radio"
                  name="fileMode"
                  value="2"
                  checked={formData.fileMode === '2'}
                  onChange={handleInputChange}
                  required
                />
                Essential
              </label>
              <label className={formData.fileMode === '3'?"btn btn-success":"btn btn-default"}>
                <Form.Check
                  inline
                  type="radio"
                  name="fileMode"
                  value="3"
                  checked={formData.fileMode === '3'}
                  onChange={handleInputChange}
                  required
                />
                Full
              </label>
            </Col>
          </Form.Group>
        )}
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 5, offset: 1 }}>
            <Button type="submit" onClick={handleDownload}>Download ics</Button>
          </Col>
          <Col sm={{ span: 5, offset: 1 }}>
            <Button type="submit" onClick={handleSubscribe}>Subscribe to webcal</Button>
          </Col>
        </Form.Group>
      </Form>
      <div class="alert alert-info" role="alert">
        Latest Update: 25/03/2024 02:37
      </div>
      </Col></Row>
    </Container>
  );
}

export default App;
