$(document).ready(function () {
    function selectUserById() {
        var userId = localStorage.getItem("userId");
        if (!userId) {
            alert("User ID not found in local storage.");
            return;
        }

        let dataToSend = {"userId": userId};

        AjaxHelper.sendGet("http://bugcreator.org.cn:5000/user/selectUserById", dataToSend)
            .then(success => {
                var data = success.message
                console.log(data)
                console.log(data.userName)
                $("#userName").text(data.userName);
                $("#mobileNumber").text(data.tel);
                $("#email").text(data.email);
                $("#dateOfBirth").text(data.birthDay);
                $("#address").text(data.address);

            })
            .catch(error => {
                console.error('Error details:', error);
                alert('An error occurred: ' + (error.message || 'Unknown error'));
            });
    }

    selectUserById();
});