const request=require('request');
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXl1c2gtc3JpdmFzdGF2YSIsImEiOiJja2o4dzA3YTQxMTV6MnFydWgzcHplbGxmIn0.PWTkqu0lHcvYkI7QvZzqCA&country=IN`;
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to web server", undefined);
      } else if (body.features.length === 0) {
        callback('Unable to find the location')
      }
      else{
        callback(undefined,{
          latitude:body.features[0].center[1],
          longitude:body.features[0].center[0],
          location:body.features[0].place_name
        })
      }
    });
  };
  module.exports=geocode