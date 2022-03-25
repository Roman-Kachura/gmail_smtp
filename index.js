const express = require('express');
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const smtp_login = process.env.SMTP_LOGIN || 'roma.kachyra@gmail.com';
const smtp_password = process.env.SMTP_PASSWORD || 'Roma.kachyra181195';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello Big World!')
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
    res.send('Message sent!');
})

const port = process.env.PORT || 3010;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});