const request = require('request');

const forecast = (lat, long, callback) => {
    const baseUrl = 'https://api.darksky.net/forecast';
    const key = 'd68d2bffd2a13ed0b5faf043ffb0faa6';
    const url = `${baseUrl}/${key}/${lat},${long}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback(`Error ${body.code}: ${body.error}`, undefined)
        } else {
            const { temperature, precipProbability: rainChance } = body.currently
            const summary = body.daily.data[0].summary;
            callback(undefined, `${summary} It is currently ${Math.floor(temperature)} degrees out. There is a ${rainChance}% chance of rain.`)
        }
    })
}

module.exports = forecast