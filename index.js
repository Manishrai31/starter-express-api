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
const LUCKYNUMBER = require('./Models/LuckyNumber');
// Start File upload management
const multer = require('multer');
const reader = require('xlsx')
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
    // const data = new DAILYRESULT({
    //     newsName  : "Delhi",
    //     todayResult :"33",
    //     yesterdayResult: "55",
    //     backgroundColor : "#223344",
    //     time : "5:05"
    // });
    // data.save().then(()=>{
    //     console.log("done");
    // })
    // .catch((err)=>{
    //     console.log(err);
    // });

    const data = new LUCKYNUMBER({
        newsName : "Delhi",
        text : `Huruf :- 11 ,55,77
        Jodi :- 34, 56,78`
    })
    data.save().then(()=>{
        console.log('done');
    })
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
app.get('/luckyNumber', async(req, res)=>{
    const result = await LUCKYNUMBER.find();
    res.send(result);
})
// Import Csv for quizzes

app.get('/uploadExcel', (req, res)=>{
    res.sendFile(__dirname +"/upload.html");
})

app.get('/upload', (req, res)=>{
    res.sendFile(__dirname +"/upload2.html");
})
app.post('/uploadfile' , upload.single('csvFile'),async (req, res)=>{
    console.log(req.file);
    const jsonObj = await csv().fromFile(req.file.path)
    let value =0;
    let finalData =[];
    // let value = 0;
    jsonObj.forEach((data)=>{
        let object= {};
        
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
        // console.log("Date printed" + data.date);
        // value = value +1;
        // console.log(value);
        finalData.push(object);
        // console.log(finalData);
        // console.log("data pushed");
    })
    // console.log(finalData);
    const result = await QUIZ.insertMany(finalData);
    res.send(result);
   
})

app.post('/uploadQue' , upload.single('csvFile'),async (req, res)=>{
    console.log(req.file);
    const jsonObj = await csv().fromFile(req.file.path)
    let value =0;
    let finalData =[];
    // let value = 0;
    jsonObj.forEach((data)=>{
        let object= {};
        object.question = data.question;
        object.answer = data.answer;
        object.date = data.date;
        object.type = data.type;
        finalData.push(object);
        // console.log(finalData);
        // console.log("data pushed");
    })
    // console.log(finalData);
    const result = await QUESTIONS.insertMany(finalData);
    res.send(result);
   
})

app.post('/uploadQue2' , upload.single('csvFile'),async (req, res)=>{
    console.log(req.file);
    const file = reader.readFile(req.file.path);
    const sheets = file.SheetNames;

    let data=[];
    for(let i = 0; i < sheets.length; i++)
    {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push(res)
        })
    }

    const result = await QUESTIONS.insertMany(data);

        res.send(result);
   
})


// End Quizzes import process
// console.log(new Date());
app.get('/getQueCards' , async(req, res)=>{
    let date = new Date('2022-09-22');
    date = date.toISOString().split('T')[0];
    const result = await QUESTIONS.find({date : {$eq: date}});
    res.send(result);
})
app.get('/getQuestion', async(req, res)=>{
    if(req.headers['content-type']==='application/json'){
        return res.status(200).json({
            data:'sdd',
            msg:"Dekho yaar",
            status:false
        })
    }
    else{
        return res.status(200).json({
            data:'sdd',
            msg:"Dekho yaar",
            status:false
        })
    }

    // const result = await QUIZ.find({date : {$eq : new Date('2022-09-21')}});
    // res.send(result);
})


app.post('/apiTest', (req, res)=>{
    console.log(req);
    res.status(200).json({
        data: {
            abc: "abcd"
        },
        status: true,
        msg:"api response"
    })
})

app.get('/apiGetTesting', (req, res)=>{
    console.log(req);
    res.status(200).json({
        data: {
            abc: "abcd"
        },
        status: true,
        msg:"api response"
    })
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("ur app is listening at 3000");
})