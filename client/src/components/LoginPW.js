import React, {useRef, useState} from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap';
export default function LoginPW( { OnIdSubmit } ) {
    const emailRef = useRef();
    const passwordRef = useRef();

    function goToRegister(){
        window.location.href = "./register";
    }

    async function loginUser(event) {
		event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json();
        // console.log(data);
        if(data.user){
            localStorage.setItem('loginUser',data);
            OnIdSubmit(emailRef.current.value);
            alert('Login Successful! :) Happy Chat!');
            window.location.href = "./dashboard"
        }else{
            alert('Please check your email and password. :(');
        }
	}
    return (
        <Container className="align-items-center d-flex" style={{height: '100vh'}}>
            <Form className="w-100" onSubmit={loginUser}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Button type="submit" className="m-2">
                        Login
                    </Button>
                    <Button onClick={goToRegister} variant="secondary" type="submit">
                        New User
                    </Button>
                </Form>
        </Container>
    )
}
