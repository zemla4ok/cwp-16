const axios = require('axios');
const Promise = require('bluebird');
const geolib = require('geolib');
const co = require('co');

co(function* () {
    
    let cities = yield Promise.all([
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Brest`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`)
    ]); 

    let dest = yield Promise.all([
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Copenhagen`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Oslo`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Brussel`)
    ]);

    let street = yield Promise.all([
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Piazza del Сolosseo`)
    ]);

    console.log('task 1');
    console.log(geolib.getDistance(cities[0].data.results[0].geometry.location, cities[1].data.results[0].geometry.location));
    console.log();   

    console.log('task 2');
    let cit = [];
    dest.forEach((city) => {
        cit[city.data.results[0].formatted_address] = city.data.results[0].geometry.location;
    });
    console.log(geolib.findNearest(cit['Minsk, Belarus'], cit, 1));
    console.log();
    
    console.log('task 3');
    console.log(street[0].data.results[0].formatted_address);
    street[0].data.results[0].address_components.forEach((component) => {
        console.log(`   -${component.long_name}`);
    });
})