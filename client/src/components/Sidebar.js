import React, { useState } from 'react';
import {Tab, Nav, Button, Modal} from 'react-bootstrap';
import Contacts from './Contacts';
import Conversations from './Conversations';
import NewContactModal from './NewContactModal';
import NewConversationModal from './NewConversationModal';

const CONVERSATION_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';


export default function Sidebar( { id }) {
    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY);
    const conversationsOpen = activeKey === CONVERSATION_KEY;
    const [modalOpen, setmodalOpen] = useState(false);
    
    function closeModal(){
        setmodalOpen(false);
    }
    return (
        <div style={{width: '250px'}} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATION_KEY}>
                            Conversations
                        </Nav.Link >
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>
                            Contacts
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1" style={{backgroundColor: 'aliceblue'}}>
                    <Tab.Pane eventKey={CONVERSATION_KEY}>
                        <Conversations></Conversations>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts></Contacts>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <div className="p-2 border-top border-right small">
                Your Id/Email: <span className="text-muted">{id}</span>
            </div>
            <Button onClick={()=>{setmodalOpen(true)}} className="rounded-0">
                New {conversationsOpen ? 'Conversation' : 'Contact'}
            </Button>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationsOpen? <NewConversationModal closeModal={closeModal}/> : <NewContactModal closeModal={closeModal}/>}
            </Modal>
        </div>
    )
}
