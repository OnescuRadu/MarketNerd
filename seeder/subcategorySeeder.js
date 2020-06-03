const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

module.exports = async () => {
  const subcategoryCount = await Subcategory.collection.countDocuments();
  if (!subcategoryCount) {
    const realEstateCat = await Category.findOne({ title: 'Real Estate' });
    const carsMotoBoatsCat = await Category.findOne({
      title: 'Cars, motorcyles and boats'
    });
    const electronicsAplicancesCat = await Category.findOne({
      title: 'Electronics and appliances'
    });
    const fashionBeautyCat = await Category.findOne({
      title: 'Fashion and beauty'
    });
    const houseGardenCat = await Category.findOne({
      title: 'House and garden'
    });
    const motherChildCat = await Category.findOne({
      title: 'Mother and child'
    });
    const sportsLeisureArtCat = await Category.findOne({
      title: 'Sports, leisure, art'
    });
    const agricultureIndustryCat = await Category.findOne({
      title: 'Agriculture and industry'
    });

    const subcategoryData = [
      { title: 'Cars', category: carsMotoBoatsCat.id },
      { title: 'Vans', category: carsMotoBoatsCat.id },
      { title: 'Trucks/Caravans/Trailers', category: carsMotoBoatsCat.id },
      { title: 'Motorcycles/Scooters/ATV', category: carsMotoBoatsCat.id },
      { title: 'Boats', category: carsMotoBoatsCat.id },
      { title: 'Parts/Accesories', category: carsMotoBoatsCat.id },
      { title: 'Dismantling Vehicles', category: carsMotoBoatsCat.id },
      { title: 'Apartments/Studios', category: realEstateCat.id },
      { title: 'Houses', category: realEstateCat.id },
      { title: 'Lands', category: realEstateCat.id },
      { title: 'Offices', category: realEstateCat.id },
      { title: 'Other Properties', category: realEstateCat.id }
    ];
    Subcategory.create(subcategoryData)
      .then(subcategories => {
        console.log(
          `Subcategory seed done: ${subcategories.length} subcategories created.`
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
};
