$(function() {
  const categoryId = '5ee7878915abed2ebc216413';
  const advertisementContainer = $('#advertisement-container');
  const advertisementCategory = $('#advertisement-category');
  let advertisementURL = '/api/advertisement';

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
              src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(4).jpg"
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
});
