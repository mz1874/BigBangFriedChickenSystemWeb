
  $(document).ready(function() {
    var userName = localStorage.getItem('username');
    if (userName) {
      $('#login-link').text(userName);
      $('#login-link').attr('href', '#');
      
      $('#login-link').click(function(event) {
        event.preventDefault();
        $('#user-dropdown').toggle();
      });

      $('#sign-out').click(function(event) {
        event.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('roles');
        window.location.href = 'logIn.html'; // Redirect to the login page
      });

      $(document).click(function(event) {
        if (!$(event.target).closest('#login-link').length && !$(event.target).closest('#user-dropdown').length) {
          $('#user-dropdown').hide();
        }
      });
    }
  });

