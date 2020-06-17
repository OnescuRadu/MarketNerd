$(function() {
  const advertisementId = window.location.href.split('/').reverse()[1];
  const imagesTableBody = $('#images-table-body');

  $.get(`/api/advertisement/${advertisementId}`)
    .done(data => {
      data.response.images.map(image => {
        imagesTableBody.append(`
          <tr>
          <th class="align-middle" scope="row"><img src="${image.href}" class="w-25"/></th>
          <td class="align-middle"><button type="button" class="btn btn-alert btn-rounded delete-image-button" data-image="${image._id}">Delete</button></td>
          </tr>`);
      });
    })
    .fail(() => {
      console.log(fail);
    });

  $(document).on('click', '.delete-image-button', event => {
    const imageId = $(event.target).data('image');

    $.post(`/api/advertisement/image/${imageId}/delete`)
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

  $('#upload-images-form').submit(function(event) {
    event.preventDefault();
    const formData = new FormData($(this)[0]);
    $.ajax({
      type: 'POST',
      url: `/api/advertisement/${advertisementId}/image`,
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        $('#images-alert-container').append(
          `<div class="alert alert-success text-center" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            ${data.response}
            </div>`
        );
        setTimeout(function() {
          location.reload();
        }, 3000);
      },
      error: function(error) {
        $('#images-alert-container').append(
          `<div class="alert alert-danger text-center" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          ${error}
          </div>`
        );
      }
    });
  });
});
