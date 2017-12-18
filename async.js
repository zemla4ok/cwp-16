const axios = require('axios');
const bluebird = require('bluebird');
start();

async function start()
{
    console.log('task 1');  
    let cities = await bluebird.all([
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Madrid`),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Rome`)
        ]);
        cities.forEach((i)=>{
        console.log(i.data.results[0].formatted_address);
    });

    console.log();
    console.log('task 2');

}