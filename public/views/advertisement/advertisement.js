$(function() {
  //Page Items
  const title = $('#advertisement-title');
  const price = $('#advertisement-price');
  const description = $('#advertisement-description');
  const seller = $('#advertisement-seller');
  const location = $('#advertisement-location');
  const used = $('#advertisement-used');
  const advertisementWrapper = $('#advertisement-wrapper');
  const advertisementAlert = $('#advertisement-alert');
  const advertisementSellerProfile = $('#advertisement-seller-profile');
  const advertisementImageContainer = $('#advertisement-image-container');
  const advertisementId = window.location.href.split('/').pop();
  let userId = '';

  advertisementWrapper.hide();
  advertisementAlert.hide();

  //Get the advertisement by id and appends its data to the page
  $.get(`/api/advertisement/${advertisementId}`)
    .done(data => {
      if (data.response) {
        title.text(data.response.title);
        price.text(data.response.price);
        description.text(data.response.description);
        seller.text(
          `${data.response.user.firstName} ${data.response.user.lastName}`
        );
        location.text(data.response.city.title);
        used.text(data.response.used === true ? 'Yes' : 'No');
        advertisementSellerProfile.attr(
          'href',
          `/advertisement/user/${data.response.user._id}`
        );
        advertisementImageContainer.append(`
        <div class="carousel-item active">
          <img
            class="d-block w-100"
            src="${
              data.response.images.length !== 0
                ? data.response.images[0].href
                : 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png'
            }"
            alt="First slide"
          />
        </div>
        `);

        if (data.response.images.length >= 2) {
          data.response.images.slice(1).map(image => {
            advertisementImageContainer.append(`
            <div class="carousel-item">
            <img class="d-block w-100" src="${image.href}" alt=""
              />
            </div>`);
          });
        }
        advertisementWrapper.show();
        userId = data.response.user._id;
      } else {
        advertisementAlert.text('The current advertisement does not exist.');
        advertisementAlert.show();
      }
    })
    .fail(() => {
      advertisementAlert.text(
        'There was an error retrieving the advertisement data.'
      );
      advertisementAlert.show();
    });

  $('.alert').hide();

  //On contact seller form submit
  $('#contact-seller-form').submit(event => {
    event.preventDefault();

    mailData = {
      advertisementId: advertisementId,
      message: $('#contact-seller-message').val()
    };

    $.post({ url: `/api/user/${userId}/mail`, data: mailData })
      .done(data => {
        $('.alert').removeClass('alert-danger');
        $('.alert').addClass('alert-success');
        $('.alert').text(data.response);
        $('#contact-seller-message').val('');
        $('.alert').show();
      })
      .fail(error => {
        $('.alert').removeClass('alert-success');
        $('.alert').addClass('alert-danger');
        if (error.status === 401) {
          $('.alert').text('You need to be logged in to contact the seller.');
        } else {
          $('.alert').text(error.responseJSON.response);
        }
        $('.alert').show();
      });
  });
});
