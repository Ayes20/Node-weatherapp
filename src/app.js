const path = require('path')
const express = require('express')
const forecast = require('./forecast.js')
const geoCode = require('./geoCode.js')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
//defined path for views cutomize
const publicPath = path.join(__dirname,"../public")
const viewspath = path.join(__dirname,"../templates/views")
const partialpath = path.join(__dirname,"../templates/partials")
// setup handle engine and view location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)
//set up static directory to serve
app.use(express.static(publicPath))
//hbs.registerPartials(partialpath)

app.get('',(req,res)=>{
    res.render('index',{
        title:"Welcome !!!",
        name:"All"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"ME .. " 
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"We are here to help ..",
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
        error:"you must provide address"})
    }
    geoCode(req.query.address,(error,response={})=>{
        if(error){
            return res.send({error})
        }
        forecast(response.latitude,response.longitude,(error,resp)=>{
            if(error){
                return res.send({error})
            }
            return res.send({
                Forecast : resp,
                Location : response.Place,
                Address : req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"Help article not found!!!",
        
    })
})

app.get('*',(req,res)=>{

    res.render('error',{
        title:"Page not found!!!",
        
    })
})

app.listen(port,()=>{
    console.log('Server is up at port 3000')
})