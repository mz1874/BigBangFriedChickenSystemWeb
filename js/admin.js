$(document).ready(function() {
    var userName = localStorage.getItem('username');
    if (userName) {
      $('.user-name').text(userName);
    } else {
      // Handle case where username is not available
      $('.user-name').text('Guest');
    }
  });