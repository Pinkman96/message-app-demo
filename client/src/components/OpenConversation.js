import React, {useRef, useState, useEffect} from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversations } from '../context/ConversationsProvider';


export default function OpenConversation() {
    const [text, setText] = useState('');
    const {sendMessage, selectedConversation} = useConversations();
    // console.log("selectedConversation=>",selectedConversation);
    // const lastMessageRef = useRef();
    function handleSubmit(e){

        e.preventDefault();
        sendMessage(
            selectedConversation.recipients.map(recipient => recipient.id),
            text    
        );

        // const response = await fetch('http://localhost:1337/api/login', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		email,
		// 		password,
		// 	}),
		// })

		// const data = await response.json()
        
        setText('');
    }

    function testHandleSubmit(){
        console.log(text);
    }

    useEffect(()=>{
        // if(lastMessageRef.current){
        //     lastMessageRef.current.scrollIntoView({smooth: true})
        // }
    })
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="h-100 flex-column align-items-start justify-content-end px-3 overflow-auto">
                    {selectedConversation.messages.map((message, index)=>{
                        const lastMessage = selectedConversation.messages.length - 1 === index;
                        // console.log(message);
                        return(
                            <div
                                key={index}
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                                    <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>{message.text}</div>
                                    <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                            {message.fromMe ? 'You' : message.senderName}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control 
                            as="textarea" 
                            required 
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{height: '75px', resize: 'none'}}
                        />
                        <InputGroup.Append>
                            <Button type="submit">send</Button>
                        </InputGroup.Append>  
                    </InputGroup> 
                </Form.Group> 
            </Form>
        </div>
    )
}
