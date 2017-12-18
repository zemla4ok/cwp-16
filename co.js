const axios = require('axios');
const Promise = require('bluebird');
const geolib = require('geolib');
const co = require('co');

start();

async function start(){
    console.log('task 1');
    await co(function* () {
        return yield Promise.all([
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Brest`),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`)
        ]);
    }).then(function (value) {
        console.log(geolib.getDistance(value[0].data.results[0].geometry.location, value[1].data.results[0].geometry.location));
    });

    console.log();
    console.log('task 2');

}