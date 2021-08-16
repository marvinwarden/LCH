const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require('dotenv').config()


app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {

    const contact = {
        from: "'LCH Contact Form Request' <devward1@outlook.com>", 
        to: "demarbeatz@gmail.com", 
        subject: req.body.subject, 
        text: req.body.message, 
        html: `<p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
          <li>Subject: ${req.body.subject}</li>
          <li>Contact no: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>`, 
      }

        let transporter = nodemailer.createTransport({
          host: "smtp-mail.outlook.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.CLIENT_EMAIL, 
            pass: process.env.CLIENT_KEY, 
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
      
        
       transporter.sendMail(contact, (error, info) => {
            if (!error) {
                console.log("sent: message ID " + info.messageId)
            } else {
                console.log(error)
            }
        }
    );
      
});



let port = process.env.PORT;

if (port == null || port =="") {
    port = 3000;
}

app.listen(port, function(){
    console.log("Server started")
});