const request = require('postman-request')

const forecast=(long,lat, callback)=>{
    const url = 'https://api.darksky.net/forecast/20334be8e5e211d2ae4f428f9627d555/'+long+','+lat
    console.log("url :"+url)
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect, please check network.",undefined)
        }
        else if(body.daily === undefined){
            callback("Please provide correct long and lat value.",undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary+"It is currently "+body.currently.temperature + " degress out.There is "+body.currently.precipProbability+"% chance of rain.")
        }
    })
}

module.exports = forecast