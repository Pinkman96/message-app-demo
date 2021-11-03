import React, { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../context/ContactsProvider';
import useLocalStorage from '../hooks/useLocalStorage';
export default function NewContactModal({ closeModal }) {
    const idRef = useRef();
    const nameRef = useRef();
    const { createContact } = useContacts();
    const [id, setId] = useLocalStorage('id'); //getting from LocalStorage

    async function handleSubmit(e){
        e.preventDefault();

        createContact(idRef.current.value, nameRef.current.value);
        // console.log('createContact=>',createContact);

        const email = id; //the current user's email 
        // console.log('your id=>',email);
        const contact = {email: idRef.current.value,
                         name: nameRef.current.value};

        const response = await fetch('http://localhost:1337/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				contact,
			})
		}).then(()=>{
            // console.log('cloooose');
            closeModal();
        });

        // const data = await response.json();
        // if(data.user){
        //     closeModal();
        //     console.log('we close the panel.')
        // }else{
            
        // }

    }
    return (
        <>
            <Modal.Header closeButton>Create Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Id/Email</Form.Label>
                        <Form.Control type="text" ref={idRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required></Form.Control>
                    </Form.Group>
                    <Button type="submit">
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </>
    );
}
