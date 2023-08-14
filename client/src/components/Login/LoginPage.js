import './Login.css';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const navigate = useNavigate();
    const [ email, SetEmail ] = useState("");
    const [ registrationEmail, SetRegistrationEmail ] = useState("");
    const [ registrationPassword, SetRegistrationPassword ] = useState(""); 
    const [ password, SetPassword ] = useState("");
    const [ show, setShow ] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleEmail = (e) => {
        SetEmail(e.target.value);
    }

    const handlePassword = (e) => {
        SetPassword(e.target.value);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('/login', {
           username: email,
           password: password 
        }).then((response) => {
            if(response.status === 200){
                //console.log(response.data);
                navigate(`/home/${response.data}`);
            } else {
                navigate("/failed-login");
            }
        }).catch((error) => {
            console.log(error);
            navigate("/failed-login");
        })           
    }


    const handleRegistrationEmail = (e) => {
        SetRegistrationEmail(e.target.value);
    }

    const handleRegistrationPassword = (e) => {
        SetRegistrationPassword(e.target.value);
    }

    const handleRegistrationSubmit = (e) => {

        e.preventDefault();

        axios.post('http://localhost:5000/register', {
           username: registrationEmail,
           password: registrationPassword 
        }).then((response) => {
            if(response.status === 200){
                alert("Account created");
            } else {
                alert("Something Went Wrong")
            }
        }).catch((error) => {
            console.log(error);
        })

        handleClose();
    }

    return (
        <div className="root">

            <Form  className="form1" onSubmit={handleSubmit}>

                <div style={{ paddingBottom: '5%'}}>
                    <FloatingLabel
                        controlId='email'
                        label="Email address"
                    >
                        <Form.Control className='formControl' type="email" placeholder='name@example.com' required onChange={handleEmail}/>
                    </FloatingLabel>
                </div>
                

                <div style={{ paddingBottom: '5%'}}>
                    <FloatingLabel
                        controlId='password'
                        label="Password"
                    >
                        <Form.Control className='formControl' type="password" placeholder='password' required onChange={handlePassword}/>
                    </FloatingLabel>
                </div>
                
                <div className='buttonGroup'>
                    <Button variant='primary' onClick={handleShow}>Register</Button>
                    <div style={{ paddingLeft: '17.5em'}}>
                        <Button variant='success' type='submit'>Login</Button>
                    </div>
                    
                </div>
            </Form>

            {/*************************************************  Modal ***************************************/}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FloatingLabel
                        controlId='email'
                        label="Email address"
                    >
                        <Form.Control type="email" placeholder='name@example.com' required onChange={handleRegistrationEmail}/>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId='password'
                        label="Password"
                    >
                        <Form.Control type="password" placeholder='password' required onChange={handleRegistrationPassword}/>
                    </FloatingLabel>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleRegistrationSubmit}>
                        Create Account
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
