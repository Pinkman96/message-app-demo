import React from 'react'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'
import {useConversations} from '../context/ConversationsProvider';
export default function Dashboard( { id } ) {
    const { selectedConversation } = useConversations();
    function backToLogin(){
        window.location.href = "./login";
    }
    const renderTooltip = (props) => (
        <Tooltip variant="danger" id="button-tooltip" {...props}>
          Log out
        </Tooltip>
      );
      
    return (
        <div className="d-flex" style={{height: '100vh'}}>
            
            <Sidebar id={id}></Sidebar>
            {selectedConversation && <OpenConversation/>}
            <div style={{position: 'fixed', right:'1px'}}>
            <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <Button onClick={backToLogin} variant="outline-danger">X</Button>
            </OverlayTrigger>
            
            </div>
        </div>
        
    )
}
