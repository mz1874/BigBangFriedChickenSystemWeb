$(document).ready(function() {
  $('#login-form').on('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    var username = $('#username').val();
    var password = $('#password').val();

    $.ajax({
      type: 'POST',
      url: 'http://localhost:5000/login',
      contentType: 'application/json',
      data: JSON.stringify({ username: username, password: password }),
      success: function(response) {
        if (response.status_code === 200) {
          // Login successful
          alert(response.message);

          var userId = response.data.id;
          var roles = response.data.role; // Extract role information
          var userName =response.data.userName;
          var phonenumber = response.data.tel;
          var email = response.data.email;


          localStorage.setItem('userId', userId);
          localStorage.setItem('roles', JSON.stringify(roles));// Store roles in localStorage
          localStorage.setItem('username', userName);
          localStorage.setItem('num',phonenumber);
          localStorage.setItem('email',email);


          // Redirect or perform other actions as needed based on roles
          // For example, you could redirect admin users to an admin dashboard
          if (roles.includes('admin')) {
            window.location.href = '.\\admin_main.html';
          } else if (roles.includes('driver')) {
            window.location.href = '.\\driver_main.html';
          }else if(roles.includes("cashier")){
            window.location.href = '.\\cashier_main.html';
          }else {
            window.location.href = '.\\menu_beverages.html';
          }

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
