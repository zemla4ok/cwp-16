const axios = require('axios');
const Promise = require('bluebird');

start();
async function start()
{
    console.log('task 1');  
    let cities = await Promise.all([
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Madrid`),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Rome`)
        ]);
    cities.forEach((i)=>{
        console.log(i.data.results[0].formatted_address);
    });

    console.log();
    console.log('task 2');
    let country = await Promise.any([
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Paris`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Nice`)
    ])
    console.log(country.data.results[0].formatted_address);
    console.log();

    console.log('task 3');
    let ViaNicolaSalvi = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Via Nicola Salvi`);
    console.log(ViaNicolaSalvi.data.results[0].formatted_address);
    ViaNicolaSalvi.data.results[0].address_components.forEach((component) => {
        console.log(`   -${component.long_name}`);
    });
}