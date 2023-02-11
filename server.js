//require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const userRouter = require('./userRouter');
const { response } = require('express');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://wamutitu:Czuvibce1OsMgmR8@cluster0.vpsalie.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
  }).then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error(error));

//const db = mongoose.connection;

//console.log(process.env.PORT);

app.get('/testing',(req,resp)=>{
    resp.status(200).json({
        message:'all is fine'
    })
})

app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});
