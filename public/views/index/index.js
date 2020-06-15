$(function() {
  //Fetch categories and add them on the page
  categoryContainer = $('.category-container');
  $.get('/api/category')
    .done(data => {
      data.response.map(category => {
        categoryContainer.append(`
          <div class="col-4 mb-4 category-wrapper">
            <a href="/market?categoryId=${category._id}">
            <i class="${category.icon} fa-3x text-default"></i>
            <h5 class="font-weight-bold">${category.title}</h5>
            </a>
         </div>
      `);
      });
    })
    .fail(error => {
      categoryContainer.append(
        `
        <h5>Could not retrieve categories.</h5>
        `
      );
    });

  //Fetch latest added ads and add them on the page
  latestAdvertisementContainer = $('.latest-advertisement-container');
  $.get('/api/advertisement?limit=6')
    .done(data => {
      data.response.map(advertisement => {
        latestAdvertisementContainer.append(`
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
      categoryContainer.append(
        `
        <h5>Could not retrieve latest added advertisements.</h5>
        `
      );
    });
});
