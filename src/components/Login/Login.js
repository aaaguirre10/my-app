// React libraries
import React from 'react'
import { useState} from "react";

// Styling
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { Row} from 'react-bootstrap';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye} from '@fortawesome/free-solid-svg-icons'
import {fetchProfileLogin, submitProfile} from '../../backend/login'





function Login() {
  // Constants for login form
  const [passwordShown, setPasswordShown] = useState(false);
  const [validated, setValidated] = useState(false);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const eye = <FontAwesomeIcon icon={faEye} />;


  
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // change inverse the boolean state passwordShown
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    setValidated(true);
    
    const loginResponse = await fetchProfileLogin(username, password);

    if (loginResponse === 'NOT_FOUND') {
      //redirect to profile creation
      alert('Profile not found, redirect to create profile');
    } else {
      //redirect to home screen and log in
      alert('Profile found, redirect to home');
    }
    /*
    await fetch('http://localhost:8080/add_block/profile', {
      method: 'POST',
      headers : {
        'Access-Control-Allow-Origin' : '*', //Needed to enable CORS fetches
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify( {
        'id': 'TODO',//TODO: Combination of sha256(username+password),
        'signature': 'TODO', //TODO: rsa.sign(id+'It is me', private_key)
      })
    }).then(function (response) {
      if(response.ok) {
        response.json().then(function(response) {
          console.log(response);
        });
      }
      else {
        alert('Error creating logging in please try again');
      }
    });
    */
  };



  return (
    // Login Screen Page
    <main className='login-screen'>
      {/* Brand Logo, Brand Name, Brand Slogan */}
      <picture>
        <img src="Radius-Icon.png" alt="Radius Logo"/>
      </picture>
      <div className='brand-name'>
        <h1>RADIUS</h1>
      </div>
      <div className='brand-slogan'>
        <p>Are we in reach?</p>
      </div>

      {/* Login form */}
      <div className='login-form-container'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

          {/* Email Section */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className='username-input'
              type="text"
              placeholder="Enter username" 
              onChange={e => {setUsername(e.target.value)}}
              required
            />
            {/* <Form.Check className='remember-me' type="checkbox" label="Remember Me" /> */}
          </Form.Group>

          {/* Password Section */}
          <Form.Group className="mb-3 pass-wrapper" controlId="formBasicPassword">
            <Form.Control
              className='password-input'
              type={passwordShown ? "text" : "password"} 
              placeholder="Password" 
              onChange={e => {setPassword(e.target.value)}}
              required
            />
            <i onClick={togglePassword} className='icon-position'>{eye}</i>

            {/* Remember Me Checkbox */}
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
            <Form.Check className='remember-me' type="checkbox" label="Remember Me" />

            </Form.Group>
          </Form.Group>

          {/* Login Button */}
          <Button className="login-btn" type="submit">
            Login
          </Button>
        </Form>
        <p className="forgot-password" onClick={event => window.location.href='/sign-up'}>Don't have an account? Sign up</p>
      </div>
    </main>
  )
}

export default Login