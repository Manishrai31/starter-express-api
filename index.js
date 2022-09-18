const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.get('/dailyResult' , (req, res)=>{
    res.send("This is the result");
})
app.listen(process.env.PORT || 3000, ()=>{
    console.log("ur app is listening at 3000");
})