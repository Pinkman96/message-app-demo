import React, {useRef, useState} from 'react'
import { Container, Form, Button } from 'react-bootstrap';
export default function RegisterUser() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    async function registerUser(event) {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			})
		})

		const data = await response.json()
        // console.log(data);
        if (data.status === 'ok') {
            alert('User Create Successful! :) Please Login!');
            window.location.href = "./login";
		}else{
            alert('This email has been used. Please use another email.');
        }
        
		// if (data.status === 'ok') {
		// 	history.push('/login')
		// }
	}
    return (
        <Container className="align-items-center d-flex" style={{height: '100vh'}}>
            <Form className="w-100" onSubmit={registerUser}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Button type="submit">
                        Create
                    </Button>
                </Form>
        </Container>
    )
}
