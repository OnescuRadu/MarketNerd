$(function() {
  const userId = window.location.href.split('/').pop();
  const advertisementContainer = $('#advertisement-container');
  const advertisementUser = $('#advertisement-user');
  const userAdvertisementURL = `/api/advertisement/user/${userId}`;

  //Method that gets all the advertisements of the user and append them to the page
  const getAdvertisements = () => {
    $.get(userAdvertisementURL)
      .done(data => {
        advertisementUser.text(
          `${data.response[0].user.firstName} ${data.response[0].user.lastName}'s `
        );
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
        <h5>Could not retrieve users advertisements.</h5>
        `
        );
      });
  };

  //If the userId exists get all the advertisements else append an error message
  if (userId) {
    getAdvertisements();
  } else {
    advertisementContainer.append(
      `
        <h5>Could not retrieve users advertisements.</h5>
        `
    );
  }
});
