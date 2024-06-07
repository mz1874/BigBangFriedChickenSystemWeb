$(document).ready(function() {
    $('#register').on('submit', function(e) {
        e.preventDefault(); // Correctly prevent default form submission

        var nameInput = $('#name').val();
        var lastNameInput = $('#lastName').val();
        var mobileNumberInput = $('#mobileNumber').val();
        var emailInput = $('#email').val();
        var passwordInput = $('#password').val();
        var confirmPasswordInput = $('#confirmPassword').val();
        var dobInput = $('#dob').val();
        var latestNewsCheckbox = $('#latestNews').is(':checked');
        var termsConditionsCheckbox = $('#termsConditions').is(':checked');
        var sex = 1;
        var role ="3";
        var address = "beijing";

        let isValid = true;

        if (passwordInput !== confirmPasswordInput) {
            alert('Password and confirm password do not match');
            isValid = false;
        }

        var dobRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
        if (dobInput && !dobRegex.test(dobInput)) {
            alert('Please enter the date of birth in the correct format (DD-MM-YYYY)');
            isValid = false;
        }

        if (!termsConditionsCheckbox) {
            alert('Please accept the Terms and Conditions');
            isValid = false;
        }

        if (isValid) {

            var requestData = {
                username: nameInput,
                password: passwordInput,
                role: role, // Assuming '3' is for client, you can modify as needed
                address: address, // Example address, you can modify as needed
                telephone:mobileNumberInput,
                email:emailInput
            };

            $.ajax({
                url: 'http://localhost:5000/register',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(requestData),
                success: function(response) {
                    alert('Register successfully, kindly proceed to the log in page');
                    $('#register')[0].reset(); // Clear the form fields
                },
                error: function(xhr, status, error) {
                    console.log(error)
                }
            });
            
        }
    });
});

