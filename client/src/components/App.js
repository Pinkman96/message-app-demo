import React, { useState } from 'react';
import { ContactsProvider } from '../context/ContactsProvider';
import { ConversationsProvider } from '../context/ConversationsProvider';
import { SocketProvider } from '../context/SocketProvider';
import useLocalStorage from '../hooks/useLocalStorage';
import Contacts from './Contacts';
import Dashboard from './Dashboard'
import Login from './Login';
import RegisterUser from './RegisterUser'
import LoginPW from './LoginPW';
import { BrowserRouter, Route} from 'react-router-dom';




function App() {
  const [id, setId] = useLocalStorage('id'); //getting from LocalStorage
  // const [id, setId] = useState();
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id}></Dashboard>
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )
    
  
  return (
      //Check if we have user status already, if has id then direct to chat dashboard, otherwise go to user login page!
      // id ? <Dashboard id={id}></Dashboard> : <Login OnIdSubmit={setId}></Login>


      // id ? dashboard : <Login OnIdSubmit={setId}></Login>

      <div>
        <BrowserRouter>
          <Route path="/login" exact render={(props) => <LoginPW OnIdSubmit={setId} {...props} />}></Route>
          <Route path="/register" exact component={RegisterUser}></Route>
          {id && <Route path="/dashboard" exact render={(props) => <SocketProvider id={id} {...props}>
                                                              <ContactsProvider>
                                                                <ConversationsProvider id={id} {...props}>
                                                                  <Dashboard id={id} {...props}></Dashboard>
                                                                </ConversationsProvider>
                                                              </ContactsProvider>
                                                            </SocketProvider>}></Route>}
        </BrowserRouter>
      </div>
  );
}

export default App;
