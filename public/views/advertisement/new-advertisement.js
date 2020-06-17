$(function() {
  const categoryInput = $('#category');
  const subcategoryInput = $('#subcategory');
  const cityInput = $('#city');

  //On category change fill subcategory input
  categoryInput.change(function() {
    getSubcategory(this.selectedOptions[0].value);
  });

  //Fill out category input
  $.get('/api/category').done(data => {
    data.response.map(category => {
      categoryInput[0].add(new Option(category.title, category._id));
    });
  });

  //Fill out subcategory input
  const getSubcategory = categoryId => {
    $.get(`/api/subcategory/${categoryId}`).done(data => {
      subcategoryInput.empty();
      data.response.map(subcategory => {
        subcategoryInput[0].add(new Option(subcategory.title, subcategory._id));
      });
    });
  };

  //Fill out city input
  $.get('/api/city').done(data => {
    data.response.map(city => {
      cityInput[0].add(new Option(city.title, city._id));
    });
  });

  //Hide alert div
  $('.alert').hide();

  //Submit form
  $('#new-advertisement-form').submit(function() {
    event.preventDefault();

    const postUrl = $(this).attr('action');
    const formData = $(this).serialize();
    const userId = localStorage.getItem('userId');

    $.post({
      url: postUrl,
      data: formData,
      success: function(xhr, statusText) {
        window.location.href = `/advertisement/user/${userId}`;
      },
      error: function(xhr, statusText, err) {
        $('.alert').text(xhr.responseJSON.response);
        $('.alert').show();
      }
    });
  });
});
