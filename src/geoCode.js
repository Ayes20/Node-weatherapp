const request = require('postman-request')

const geoCode=(location, callback)=>{
    var geourl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(location)+".json?access_token=pk.eyJ1IjoiYXllc2hhYSIsImEiOiJjazg1eWQ0d3cwYWxwM25vNzkwOTY2ZWFwIn0.zSIss28QuiPcH-Kb9b7riA"
    console.log("url :"+geourl)
    request({url:geourl,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect, please check network.",undefined)
        }
        else if(body.features.length === 0){
            callback("Please provide correct location.",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                Place:body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode