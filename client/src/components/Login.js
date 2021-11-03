import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidV4} from 'uuid';

//the user login interface
export default function Login({ OnIdSubmit }) {
    const idRef = useRef();

    function handleSubmit(e){
        e.preventDefault(); //this function is to prevent refresh web page since we submit the form.
        // console.log('we are now login!!!')
        OnIdSubmit(idRef.current.value);
    }

    function createNewId(){
        OnIdSubmit(uuidV4());
    }
    return (
        <Container className="align-items-center d-flex" style={{height: '100vh'}}>
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    <Form.Label>Enter You Id</Form.Label>
                    <Form.Control type="text" ref={idRef} required></Form.Control>
                </Form.Group>
                <Button type="submit" className="mr-2">Login</Button>
                <Button onClick={createNewId} variant="secondary" type="submit">New User</Button>
            </Form>
        </Container>
    )
}
