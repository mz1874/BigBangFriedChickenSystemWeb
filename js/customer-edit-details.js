$(document).ready(function () {
    function selectUserById() {
        var userId = localStorage.getItem("userId");
        if (!userId) {
            alert("User ID not found in local storage.");
            return;
        }

        let dataToSend = {"userId": userId};

        AjaxHelper.sendGet("http://localhost:5000/user/selectUserById", dataToSend)
            .then(success => {
                var data = success.message
                console.log(data)
                $("#name").val(data.userName);
                $("#mobileNumber").val(data.tel);
                $("#email").val(data.email);
                $("#dob").val(data.birthDay);
                $("#address").val(data.address);
            })
            .catch(error => {
            });
    }


    $("#submit").on("click", function(event) {
        event.preventDefault(); // 阻止默认事件

        if ($("#password").val() != $("#confirmPassword").val()) {
            alert("Password is not match！");
            return;
        }

        const formData = {
            "address": $("#address").val(),
            "user_id": localStorage.getItem("userId"),
            "birthDay": $("#dob").val(),
            "email": $("#email").val(),
            "password": $("#password").val(),
            "tel": $("#mobileNumber").val()
        };

        AjaxHelper.sendPost("http://localhost:5000/updateUser",formData).then(success=>{
            alert("User information has been updated!")
            window.location.href = '.\\customerDetails.html';
        }).catch(error=>{

        })
    });


    selectUserById();
});