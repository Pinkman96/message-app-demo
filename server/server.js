const io = require('socket.io')(5000,{
    cors:{
        origin:'*'
    }
});
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./modles/user.model')


const url = "mongodb://localhost:27017/message-ap"//alternet url
//when running mongoDb on your localhost, you may want to change the URL
mongoose.connect('mongodb://127.0.0.1:27017/message-app').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

app.use(cors());
app.use(express.json()); //notice node that we are going to use Json, so parsh everything in req.body to into Json
app.get('/hello',(req,res)=>{
    res.send('hello world');
})

app.listen(1337, ()=>{
    console.log('server started on 1337...');
})

app.post('/api/register', async (req, res) => {
	console.log('Server=> User Registration Action.');
    console.log(req.body);

    try {
        await User.create({
            name: req.body.name,
			email: req.body.email,
			password: req.body.password,
        });
        res.json({ status: 'ok' })
        console.log('Creating new User Success!');
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'Duplicate email' })
    }
});

app.post('/api/login', async (req, res) => {
    console.log('Server=> User Login Action.');
    const user = await User.findOne({
		email: req.body.email,
        password: req.body.password
	});

    if(user){
        return res.json({status:'ok',user: true ,email: user.email, name:user.name});
    }else{
        return res.json({status:'error', user: false});
    }
});

// app.post('/api/conversation', async (req, res) => {
//     console.log('Server=> User Conversation Action.');
//     const user = await User.findOneAndUpdate({
// 		email: req.body.email,
// 	},{
//         $push:{
//             message: req.body.message
//         }
//     }
//     );
//     console.log('Chat history saved');
// });

app.post('/api/contact', async (req, res) => {
    let user;
    console.log('Server=> Add Contact Action.', req.body);
    try {
            user = await User.findOneAndUpdate({
            email: req.body.email,
        },{
            $push:{
                contact: req.body.contact
            }
        }
        );
    } catch (error) {
        console.log('Failed to add New Contact.',error);
    }

    if(user){
        return res.json({status:'ok',user: true ,email: user.email, name:user.name});
    }else{
        return res.json({status:'error', user: false});
    }
});

app.post('/api/conversation', async (req, res) => {
    console.log('Server=> Add Conversation Action.');
    const user = await User.findOneAndUpdate({
		email: req.body.email,
	},{
        $push:{
            conversation: req.body.conversation
        }
    });
    if(user){
        return res.json({status:'ok',user: true ,email: user.email, name:user.name});
    }else{
        return res.json({status:'error', user: false});
    }
    console.log('Contact Person saved');
});

//SOCKET IO FUNCTION
io.on('connect', socket =>{

    const id = socket.handshake.query.id; 
    //allowing us to stay in the same id even if we refresh the page! so keep the id consistently.
    socket.join(id);

    socket.on('send-message', ({recipients , text})=>{
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r!==recipient)//removing the sender recipient from the list
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, send: id, text
            })
        });
    })
})