$(function() {
  const advertisementId = window.location.href.split('/').reverse()[1];

  const titleInput = $('#title');
  const categoryInput = $('#category');
  const subcategoryInput = $('#subcategory');
  const descriptionInput = $('#description');
  const priceInput = $('#price');
  const cityInput = $('#city');
  const usedInput = $('#used');

  //Get the advertisement data
  $.get(`/api/advertisement/${advertisementId}`)
    .done(data => {
      if (data.response) {
        titleInput.val(data.response.title);
        descriptionInput.val(data.response.description);
        priceInput.val(data.response.price);
        if (data.response.used === true) {
          usedInput.prop('checked', true);
        }
      } else {
        $('.alert').text('The current advertisement does not exist.');
        $('.alert').show();
      }
    })
    .fail(() => {
      $('.alert').text('There was an error retrieving the advertisement data.');
      $('.alert').show();
    });

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

    const formData = $(this).serialize();

    $.ajax({
      type: 'PATCH',
      url: `/api/advertisement/${advertisementId}`,
      data: formData,
      success: function(xhr, statusText) {
        window.location.href = `/advertisement/${advertisementId}`;
      },
      error: function(xhr, statusText, err) {
        $('.alert').text(xhr.responseJSON.response);
        $('.alert').show();
      }
    });
  });
});
