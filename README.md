# message-app
Pivot Follow Up Project
Hi, thanks for using my message-app, I hope you like it!

Before Lunch the App
Under client directory:
run: npm install
under server directory:
run: npm install

### `npm start`
Under client directory
Runs the app.
Open [http://localhost:3000/login](http://localhost:3000/login) to view the user login page in the browser.

### `npm run devStart`
Under the server directory
Runs the backend server


User Notes:
- You can creat your account in `register` page and then login on `login` page.
- Since I'm using `LocalStorage` for conversations, please open multiple new window(not new tab) for different user.
- After succesfully login to the dashboard for several diffenrent user. you can start to create contacts for a user
by clicking on the `New Contact` button. The Id will be the other users' registred email. And you can give this new contact a remark as the name.
- Then you can go to conversation tab to create a new conversation by clicking on the `New Conversation` button and select contacts you want to chat with.
- The side bar will show all the conversation your user has joined.
- After chating, there is a `Logout` button on the top right corner, let you to go back to login page.

Frontend Tools:
- bootstrap
- react-bootstrap
- socket.io-client
- localStorage

Backend Tools:
- cors
- mongoDb
- socket.io
- nodemon

Things need to be improved:
- show incoming message name
- message history in database
- prevent duplcate contact

References:
- https://stackoverflow.com/questions/60903335/warning-finddomnode-is-deprecated-in-strictmode-finddomnode-was-passed-an-inst
- https://stackoverflow.com/questions/13827915/location-of-the-mongodb-database-on-mac/13828103
- https://blog.e-zest.com/basic-commands-for-mongodb
- https://react-bootstrap.netlify.app/components
- https://www.youtube.com/watch?v=5yU-P0grJjk&ab_channel=ToThePointCode
- https://docs.mongodb.com/manual/reference/command/
- https://www.valentinog.com/blog/socket-react/
