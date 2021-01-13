const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=31daab2a24eca312e4c54ce8c496aef8&query=${latitude},${longitude}`
    request({url,json:true},(error,resp)=>{
        if(error){
            callback('Unable to connect to Web Server',undefined)
        }else if(resp.body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,resp.body.current.weather_descriptions[0] + '. It is currently ' + resp.body.current.temperature + ' degrees out. It feels like ' + resp.body.current.feelslike + ' degrees out.' + ' The wind is flowing with speed of '
             + resp.body.current.wind_speed + ' Observation Time is ' +resp.body.current.observation_time)
        }
    })
} 
module.exports=forecast;
