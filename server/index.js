const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const multer = require('multer')
const path = require('path')
const fs = require('fs')

const bcrypt = require('bcryptjs')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'images')))

app.use(session({
  key:"userId",
  secret: "photo",
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 365 * 24 * 60 * 60 * 1000
  }
}))

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'blog',
})

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, './images',),
  filename: (req, file, cb) =>{
    cb(null, Date.now()+file.originalname)
  }
})

const fileUpload = multer({
  storage: diskStorage,

}).single('image')

app.post('/registrer',  (req, res) =>{
  const name = req.body.name;
  const lastname =  req.body.lastname
  const age =  req.body.age
  const email =  req.body.email
  const password = req.body.password;

  bcrypt.hash(password, 8, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO authors (name,lastname,age,email,password) VALUES (?,?,?,?,?)",
      [name,lastname,age,email,hash],
      (err, result) => {
        console.log(result);
      }
    );
  });
});

app.post('/login', (req, res) =>{
  const email = req.body.email;
  const pass = req.body.password

  db.query(
      "SELECT * FROM authors WHERE email = ?",
      [email],
      (error, result) =>{
        if(error){
          res.send({error:error})
        }

        if(result.length  > 0){
          bcrypt.compare(pass, result[0].password, (error,response) =>{
            if(response){
              req.session.user = result;
              res.send(result);
            }else{
              res.send({message: "Wrong email/password combination"})
            }
          })
        }else{
          res.send({message: "User doesn't exist"})
        }
    });
});

app.post("/sendphoto/:id", fileUpload, (req, res) =>{
  let id = req.params.id
  const img = req.file.filename
  db.query(
      "UPDATE authors SET img_profile=? WHERE id=?",
      [img,id],
      (err, result) => {
        console.log(result);
      }
    );

})

app.get("/session", (req, res) => {
    if(req.session.user){
      res.send({loggedIn: true, user: req.session.user})
    }else{
      res.send({loggedIn: false})
    }
  });

app.get("/logout", (req, res) =>{
  res.send(req.session.destroy())
})

app.post('/createpost/:id',  (req, res) =>{
  const title = req.body.title;
  const description =  req.body.description
  let id = req.params.id

    db.query(
      "INSERT INTO images (title,description,id_author) VALUES (?,?,?)",
      [title,description,id],
      (err, result) => {
        console.log(result);
      }
    );
});

app.listen(3001, () =>{
    console.log("El servidor corre")
});