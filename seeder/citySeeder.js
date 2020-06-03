const City = require('../models/City');
const citiesJson = require('./cities.json');

module.exports = async () => {
  const cityCount = await City.collection.countDocuments();
  if (!cityCount) {
    City.create(citiesJson.cities)
      .then(cities => {
        console.log(`City seed done: ${cities.length} cities created`);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
