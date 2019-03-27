const request = require('request')

const geoCode = (address, callback) => {
    const key = '?access_token=pk.eyJ1IjoicHJlZG9wcmVkbyIsImEiOiJjanRkZjg1Z2wwdXkxM3lxamYwcHRzNGs1In0.MnZ5TYdVH-KiOhnjG5M6hQ'
    const baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
    const url = `${baseURL}/${address}.json${key}`
    if (address) {
        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to locations service', undefined)
            } else if (!body.features.length) {
                callback("Can't find location. Try another search.", undefined)
            } else {
                const { center, place_name: location } = body.features[0];
                const [longitude, latitude] = center;
                callback(undefined, { latitude, longitude, location })
            }
        })
    } else {
        callback('Please type an address', undefined)
    }
}

module.exports = geoCode