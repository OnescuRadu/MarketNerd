$(document).ready(function() {
  //Hide alert div
  $('.alert').hide();

  $('#register-form').submit(function(event) {
    event.preventDefault();
    const postUrl = $(this).attr('action');
    const formData = $(this).serialize();

    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const passwordConfirmation = $('#passwordConfirmation').val();
    const phoneNumber = $('#phoneNumber').val();
    if (
      firstName &&
      lastName &&
      email &&
      password &&
      passwordConfirmation &&
      phoneNumber
    ) {
      if (password === passwordConfirmation) {
        $.post({
          url: postUrl,
          data: formData,
          success: function(xhr, statusText) {
            $('#register-form').hide();
            $('.alert').text(xhr.response);
            $('#register-alert').append(
              `<br> <a href="/login">Click here to go to login page.</a>`
            );
            $('.alert').removeClass('alert-danger');
            $('.alert').addClass('alert-success');
            $('.alert').show();
          },
          error: function(xhr, statusText, err) {
            showError(xhr.responseJSON.response);
          }
        });
      } else {
        showError('Passwords do not match.');
      }
    } else {
      showError('Missing fields. All fields are required.');
    }
  });
});

const showError = message => {
  $('.alert').text(message);
  $('.alert').removeClass('alert-success');
  $('.alert').addClass('alert-danger');
  $('.alert').show();
};

const validateEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(String(email).toLowerCase());
};
