const mongoose = require('mongoose');
//importa archivo citiees
const cities = require('./cities')
//importa archivo seedHelpers {nombre del lugar + otro}
const {places, descriptors} = require('./seedHelpers');
const Attractions = require('../models/attractions');
// ./ hace referencia a la carpeta actual -- ../ a la anterior
mongoose.connect('mongodb://127.0.0.1:27017/tourApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];   


const seedDB = async() => {
    await Attractions.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 100);
        const price = Math.floor(Math.random() * 20) + 1;
        const attrac = new Attractions({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/9659363',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam itaque libero ut aspernatur voluptatem repudiandae quod nam aut quis! Sapiente vitae nihil corrupti et totam rerum ipsam quibusdam nulla sed.',
            price
        })
        await attrac.save();   
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})