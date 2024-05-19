$(document).ready(function() {
    $('#login-form').on('submit', function(e) {
      e.preventDefault(); // Prevent form submission
  
      var username = $('#username').val();
      var password = $('#password').val();
  
      $.ajax({
        type: 'POST',
        url: 'http://bugcreator.org.cn:5000/login',
        contentType: 'application/json',
        data: JSON.stringify({ username: username, password: password }),
        success: function(response) {
          if (response.status_code === 200) {
            // Login successful
            alert(response.message);
            // Redirect or perform other actions as needed
          } else {
            // Login failed
            alert(response.message);
          }
        },
        error: function(xhr, status, error) {
          // Handle error
          alert('An error occurred: ' + error);
        }
      });
    });
  });