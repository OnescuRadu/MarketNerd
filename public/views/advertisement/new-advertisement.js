$(function() {
  $('.alert').hide();
  const categoryInput = $('#category');
  const subcategoryInput = $('#subcategory');
  const cityInput = $('#city');

  categoryInput.change(function() {
    getSubcategory(this.selectedOptions[0].value);
  });

  $.get('/api/category').done(data => {
    data.response.map(category => {
      categoryInput[0].add(new Option(category.title, category._id));
    });
  });

  const getSubcategory = categoryId => {
    $.get(`/api/subcategory/${categoryId}`).done(data => {
      data.response.map(subcategory => {
        subcategoryInput[0].add(new Option(subcategory.title, subcategory._id));
      });
    });
  };

  $.get('/api/city').done(data => {
    data.response.map(city => {
      cityInput[0].add(new Option(city.title, city._id));
    });
  });
});
