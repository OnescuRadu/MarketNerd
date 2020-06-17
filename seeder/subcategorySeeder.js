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
      { title: 'Other Properties', category: realEstateCat.id },
      { title: 'Mobile Phones', category: electronicsAplicancesCat.id },
      { title: 'Laptops/Computers', category: electronicsAplicancesCat.id },
      { title: 'TVs', category: electronicsAplicancesCat.id },
      {
        title: 'Audio/Video Electronics',
        category: electronicsAplicancesCat.id
      },
      { title: 'Appliances', category: electronicsAplicancesCat.id },
      { title: 'Tablets/eReaders', category: electronicsAplicancesCat.id },
      { title: 'Cameras', category: electronicsAplicancesCat.id },
      { title: 'Gaming Consoles', category: electronicsAplicancesCat.id },
      {
        title: 'GPS/Navigation Systems',
        category: electronicsAplicancesCat.id
      },
      {
        title: 'Other Electronic Devices',
        category: electronicsAplicancesCat.id
      },
      { title: 'Women`s Clothes', category: fashionBeautyCat.id },
      { title: 'Women`s Shoes', category: fashionBeautyCat.id },
      { title: 'Men`s Clothes', category: fashionBeautyCat.id },
      { title: 'Men`s Shoes', category: fashionBeautyCat.id },
      { title: 'Accessories', category: fashionBeautyCat.id },
      { title: 'Jewelry', category: fashionBeautyCat.id },
      { title: 'Cosmetics/Perfumes', category: fashionBeautyCat.id },
      { title: 'Children`s Clothes', category: fashionBeautyCat.id },
      { title: 'Children`s Shoes', category: fashionBeautyCat.id },
      { title: 'Furniture/Decorations', category: houseGardenCat.id },
      { title: 'Household Items', category: motherChildCat.id },
      { title: 'Construction Materials', category: houseGardenCat.id },
      { title: 'Thermal/Electrical/Sanitary', category: houseGardenCat.id },
      { title: 'Tools/Hardware', category: houseGardenCat.id },
      { title: 'Sports and Tourism Equipment', category: sportsLeisureArtCat.id },
      { title: 'Books/Movies/Music', category: sportsLeisureArtCat.id },
      { title: 'Events/Entertainment', category: sportsLeisureArtCat.id },
      { title: 'Art/Collectibles', category: sportsLeisureArtCat.id },
      { title: 'Agricultural and Industrial Equipment', category: agricultureIndustryCat.id },
      { title: 'Products market - food', category: agricultureIndustryCat.id },
      { title: 'Cereals/Plants/Trees', category: agricultureIndustryCat.id }
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
