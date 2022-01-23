const express = require ('express');
const app = express();
const nodemailer = require ('nodemailer');
const dotenv = require ('dotenv')
var path = require('path');
var logger = require("morgan");

const contacto = require("./public/js/contacto");




dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(logger('dev'));
const oContacto =  new contacto({
    host: "localhost",
    user: "root",
    password: "",
    database: "contactos"
});

app.get('/', function(req, res, next) {
    res.render('ContactForm', { title: 'Express' });
});


app.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ivan30294686@gmail.com",
            pass: "15161234"
        }
    })
    const mailOptions = {
        from: 'ivan30294686@gmail.com',
        to: req.body.email,
        subject: `Message from ${req.body.email}`,
        html: `
        <div>
        <h1>Informacion del usuario</h1>
        <p>Nombre: ${req.body.name}</p>
        <p>Correo: ${req.body.email}</p>
        <p>Mensaje: ${req.body.message}</p>
        </div>
        <div>
        <h1>Correos de Contacto</h1>
        <p>programacion2ais@dispostable.com</p>
        <p>ivanrodri30294686@gmail.com</p>
        </p>
        </div>
    `
    }

    oContacto.agregarUsuario(req.body.name,req.body.email);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.log(error);
            res.send('error');
        } else{
            console.log('Email sent '+ info.response);
            res.send('success')
        }
    })
})
app.listen(3000, () => {
    console.log("Server up http://localhost:3000/");
})

