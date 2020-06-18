$(function() {
  const userId = window.location.href.split('/').pop();
  const advertisementTableBody = $('#advertisement-table-body');
  const userAdvertisementURL = `/api/advertisement/user/${userId}`;

  //Method that gets all the advertisements of the user and append them to the page
  const getAdvertisements = () => {
    $.get(userAdvertisementURL)
      .done(data => {
        data.response.map(advertisement => {
          let soldButton = `
          <button type="button" class="btn btn-warning btn-rounded btn-sm waves-effect waves-light advertisement-sold-button" data-advertisement=${advertisement._id}>
          Mark as sold
          </button>
        `;
          advertisementTableBody.append(` <tr>
          <th class="align-middle" scope="row">${advertisement._id}</th>
          <td class="align-middle">${advertisement.title}</td>
          <td class="align-middle">
          <a href="/advertisement/${
            advertisement._id
          }/images" class="btn btn-default btn-rounded btn-sm waves-effect waves-light advertisement-manage-images-button"data-advertisement=${
            advertisement._id
          }>
          Manage images
          </a>
          </td>
          <td class="align-middle">
          <a href="/advertisement/${
            advertisement._id
          }/edit" class="btn btn-default btn-rounded btn-sm waves-effect waves-light advertisement-edit-button" data-advertisement=${
            advertisement._id
          }>
            Edit
          </a>
          <button type="button" class="btn btn-danger btn-rounded btn-sm waves-effect waves-light advertisement-delete-button" data-advertisement=${
            advertisement._id
          }>
            Delete
          </button>
          </td>
          <td class="align-middle">
        ${advertisement.sold === true ? 'Yes' : soldButton}
          </td>
        </tr>`);
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

  //On delete advertisement button click
  $(document).on('click', '.advertisement-delete-button', event => {
    const advertisementId = $(event.target).data('advertisement');

    $.ajax({
      url: `/api/advertisement/${advertisementId}`,
      type: 'DELETE',
      success: function(data) {
        $('.alert-container')
          .append(`<div class="alert alert-success text-center" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          ${data.response}
        </div>`);
        setTimeout(function() {
          location.reload();
        }, 3000);
      },
      error: function(error) {
        $('.alert-container')
          .append(`<div class="alert alert-danger text-center" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          ${error}
        </div>`);
      }
    });
  });

  //On mark advertisement as sold button click
  $(document).on('click', '.advertisement-sold-button', event => {
    const advertisementId = $(event.target).data('advertisement');
    $.post(`/api/advertisement/${advertisementId}/sold`)
      .done(data => {
        $('.alert-container')
          .append(`<div class="alert alert-success text-center" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            ${data.response}
          </div>`);
        setTimeout(function() {
          location.reload();
        }, 3000);
      })
      .fail(error => {
        $('.alert-container')
          .append(`<div class="alert alert-danger text-center" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            ${error}
          </div>`);
      });
  });
});
