const { default: mongoose } = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places , descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(()=>{
    console.log('MONGO CONNECTION OPEN!!!');
})
.catch(err=>{
    console.log('OH NO MONGO CONNECTION ERROR!!!!');
    console.log(err);
});

const sample = (array) => {
    return array[Math.floor(Math.random()*array.length)];
}

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0;i<200;i++){
        const rand = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '6595414313f254b097cfa2c3',
            location : `${cities[rand].city}, ${cities[rand].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae consequuntur iusto necessitatibus eaque aut! Consectetur molestiae dolore quasi ut ipsam assumenda similique, pariatur suscipit necessitatibus hic eius distinctio natus. Doloremque.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[rand].longitude,
                    cities[rand].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dthtrercm/image/upload/v1704356444/YelpCamp/kv9favhvhygv4hfamxdw.jpg',
                    filename: 'YelpCamp/kv9favhvhygv4hfamxdw'
                },
                {
                    url: 'https://res.cloudinary.com/dthtrercm/image/upload/v1704356444/YelpCamp/ztnyia9cflf1dvp6vjat.jpg',
                    filename: 'YelpCamp/ztnyia9cflf1dvp6vjat'
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(()=>mongoose.connection.close());