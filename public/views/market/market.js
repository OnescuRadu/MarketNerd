$(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get('categoryId');
  const advertisementContainer = $('#advertisement-container');
  const advertisementCategory = $('#advertisement-category');
  let advertisementURL = '/api/advertisement';

  //Method that gets all the advertisements and appends them to the page
  const getAdvertisements = () => {
    $.get(advertisementURL)
      .done(data => {
        data.response.map(advertisement => {
          advertisementContainer.append(`
        <div class="col-lg-4 col-sm-6 col-12 mt-4">
        <!--Card-->
        <div class="card card-cascade card-ecommerce wider">
          <!--Card image-->
          <div class="view view-cascade overlay">
            <img
              class="card-img-top"
              src=${
                advertisement.images.length !== 0
                  ? advertisement.images[0].href
                  : 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png'
              }
              alt=""
            />
            <a href="/advertisement/${advertisement._id}">
              <div class="mask rgba-white-slight"></div>
            </a>
          </div>
          <!--/.Card image-->
  
          <!--Card content-->
          <div class="card-body card-body-cascade text-center">
            <span class="badge badge-default">${
              advertisement.used === true ? 'Used' : 'New'
            }</span> <br>
            <!--Category & Title-->
            <h5>${advertisement.category.title}</h5>
            <h4 class="card-title product-card-title">
              <strong><a href="/advertisement/${advertisement._id}">${
            advertisement.title
          }</a></strong>
            </h4>
  
            <!--Description-->
            <p class="card-text">
              ${advertisement.description}
            </p>
  
            <!--Card footer-->
            <div class="card-footer">
              <span>${advertisement.price} DKK</span>
            </div>
          </div>
          <!--/.Card content-->
        </div>
        <!--/.Card-->
      </div>
      `);
        });
      })
      .fail(() => {
        advertisementContainer.append(
          `
        <h5>Could not retrieve latest added advertisements.</h5>
        `
        );
      });
  };

  //If categoryId exists get the category by id and then get all the advertisements
  if (categoryId) {
    $.get(`/api/category/${categoryId}`)
      .done(data => {
        if (data.response) {
          advertisementCategory.text(data.response.title);
          advertisementURL = advertisementURL.concat(`?category=${categoryId}`);
        } else {
          advertisementCategory.text(
            'Category does not exist. Showing all advertisements.'
          );
        }
      })
      .fail(() => {
        advertisementCategory.text(
          'There was an error retrieving the category. Showing all advertisements.'
        );
      })
      .always(() => {
        getAdvertisements();
      });
  } else {
    getAdvertisements();
  }
});
