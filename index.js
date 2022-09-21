const express = require('express')
const mongoose = require('mongoose');
const app = express()
require('./Database/db');
const DAILYRESULT = require('./Models/DailyResult');
const QUIZ = require('./Models/Quiz');
const csv         = require('csvtojson');
app.set('view engine','ejs');
const QUESTIONS = require('./Models/Questions');
const path = require('path');
app.use(express.static(path.resolve(__dirname,'public')));

// Start File upload management
const multer = require('multer');
const fileStorage = multer.diskStorage({
    destination : (req, res , callback)=>{
        callback(null , './csvSheet');
    },
    filename :(req, file,callback)=>{
        callback(null , Date.now()+'--'+file.originalname.split(' ')[0])
    }
})
const upload = multer({ storage: fileStorage })
// End file upload management


app.get('/', async(req, res) => {
    const data = new DAILYRESULT({
        newsName  : "Delhi",
        todayResult :"33",
        yesterdayResult: "55"
    });
    data.save().then(()=>{
        console.log("done");
    })
    .catch((err)=>{
        console.log(err);
    });
    // console.log(dailyResult);
    // Model.save(data);
    // db.Model.save(data);
    res.send('Yo!')
})

app.get('/todayResult', async(req, res)=>{
    // const date = new Date();
    // console.log(date.getFullYear()+'-'+parseInt(date.getMonth())+p1+'-'+date.getDate());
    // let todayDate = new Date(date.toISOString().split('T')[0]);
    
    const result =await DAILYRESULT.find();
    if(result && result.length)
        res.send(result);
})

// Import Csv for quizzes

app.get('/uploadExcel', (req, res)=>{
    res.sendFile(__dirname +"/upload.html");
})

app.post('/uploadfile' , upload.single('csvFile'),async (req, res)=>{
    console.log(req.file);
    const jsonObj = await csv().fromFile(req.file.path)
    let value =0;
    let object= {};
    let finalData =[];
    jsonObj.forEach((data)=>{
        object.question = data.questions;
        object.options = [];
        if(data.option1)
            object.options.push(data.option1);
        if(data.option2)
            object.options.push(data.option2);
        if(data.option3)
            object.options.push(data.option3);
        if(data.option4)
            object.options.push(data.option4);
        object.rightAnswer = data.rightAnswer;
        object.date = data.date;
        finalData.push(object);
    })
    const result = await QUIZ.insertMany(finalData);
    res.send(result);
   
})
// End Quizzes import process


app.listen(process.env.PORT || 3000, ()=>{
    
    console.log("ur app is listening at 3000");
})