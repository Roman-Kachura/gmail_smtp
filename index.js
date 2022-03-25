const express = require('express');
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const smtp_login = process.env.SMTP_LOGIN;
const smtp_password = process.env.SMTP_PASSWORD;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello My World!')
});

app.post('/sendMessage', async function (req, res) {
    let info = await transporter.sendMail({
        email: req.body.email,
        from: req.body.name, // sender address
        to: "roma.kachyra@gmail.com", // list of receivers
        subject: "Message sent from my portfolio", // Subject line
        text: req.body.message, // plain text body
        html: `${req.body.message} <br/><br/><br/> 
        <em>Sender name: ${req.body.name}</em><br/>
        <b>Sender address: ${req.body.email}</b>`, // html body
    });
    req.socket.write(req.body);
    res.send(req.body);
    return req.body;
})

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});