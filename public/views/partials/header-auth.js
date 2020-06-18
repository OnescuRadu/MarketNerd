$(function() {
  //Gets the current logged in user and ads its id to the user advertisement href and then saves it in cookies
  $.get('/api/user')
    .done(data => {
      if (data.response) {
        localStorage.setItem('userId', data.response.id);
        $('#user-advertisement-link').attr(
          'href',
          `/advertisement/user/${data.response.id}`
        );
      }
    })
    .fail(() => {
      console.error('Could not retrieve current profile.');
    });
});
