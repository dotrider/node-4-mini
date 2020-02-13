require('dotenv').config();
const express = require('express');
const session = require('express-session');
let {SERVER_PORT, SESSION_SECRET} = process.env;
const app = express();
app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));



const MC = require('./controller/messagesCtrl');

app.use((req, res, next) => {
    let cusWords = ['jerk', 'punk'];
    
    if(req.body.message) {
        for (let i = 0; i < cusWords.length; i++){
            let regex = new RegExp(cusWords[i], 'g');
            req.body.message = req.body.message.replace(regex, '*****');
        }
        next();
    }else{
        next();
    }
});

app.get(`/api/messages`, MC.getAllMessages);
app.post(`/api/messages`, MC.createMessage);

app.get(`/api/messages/history`, MC.history);

app.listen(SERVER_PORT, () => console.log(`Live from port ${SERVER_PORT}`))