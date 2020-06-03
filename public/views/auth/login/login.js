$(document).ready(function() {
  //Hide alert div
  $('.alert').hide();

  $('#login-form').submit(function(event) {
    event.preventDefault();
    const postUrl = $(this).attr('action');
    const formData = $(this).serialize();

    const email = $('#email').val();
    const password = $('#password').val();

    if (email && password) {
      $.post({
        url: postUrl,
        data: formData,
        success: function(xhr, statusText) {
          window.location.href = '/';
        },
        error: function(xhr, statusText, err) {
          $('.alert').text(xhr.responseJSON.response);
          $('.alert').show();
        }
      });
    } else {
      $('.alert').text('Email and password are required.');
      $('.alert').show();
    }
  });
});
