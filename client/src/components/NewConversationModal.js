import React, { useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../context/ContactsProvider';
import { useConversations } from '../context/ConversationsProvider';
import useLocalStorage from '../hooks/useLocalStorage';
export default function NewConversationModal({closeModal}) {
    
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { contacts } = useContacts();
    // console.log('all contacts=>', contacts);
    const { createConversation } = useConversations();


    const [id, setId] = useLocalStorage('id'); //getting from LocalStorage
    const email = id;
    const conversation = {contacts: selectedContactIds};
    // console.log('the conversation adding=>',conversation);
    async function handleSubmit(e){
        e.preventDefault();
        createConversation(selectedContactIds);
        // console.log(createConversation);
        const response = await fetch('http://localhost:1337/api/conversation', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				conversation,
			})
		}).then(()=>{
            // console.log('cloooose');
            closeModal();
        })
    }
    function handleCheckboxChange(contactId){
        setSelectedContactIds(prevSelectedIds => {
            if(prevSelectedIds.includes(contactId)){
                return prevSelectedIds.filter(prevId =>{
                    return contactId !== prevId;
                })
            } else {
                return [...prevSelectedIds, contactId];
            }
        })
    }
    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check 
                            type="checkbox"
                            value={selectedContactIds.includes(contact.id)}
                            label={contact.name}
                            onChange={()=>{handleCheckboxChange(contact.id)}}>
                            </Form.Check>
                        </Form.Group>
                    ))}
                    <Button type="submit">
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </>
    )
}
