$(document).ready(function () {


    var userName = localStorage.getItem('username');
    var userPhone = localStorage.getItem('num');
    var userEmail = localStorage.getItem('email');

    // Check if the values are available in local storage
    if (userName) {
        $('#name').val(userName);
    }
    if (userPhone) {
        $('#tel').val(userPhone);
    }
    if (userEmail) {
        $('#email').val(userEmail);
    }


    function clean(){
        $("#name").val("");
        $("#tel").val("");
        $("#email").val("");
        $("input[name='rating']").prop("checked", false); // 取消选中评分
        $("#message").val("");
    }

    $('#submit').on('click', function (e) {
        e.preventDefault(); // 阻止表单默认提交行为
        // 获取表单字段的值
        var name = $("#name").val();
        var tel = $("#tel").val();
        var email = $("#email").val();
        let rating = $("input[name='rating']:checked").val();
        var message = $("#message").val();

        // 检查字段是否为空
        if (name === '' || tel === '' || email === '' ||
            rating === '' || message === '') {
            $('#myModal').modal('show');
            return; // 停止执行函数
        }

        // 构建要发送的数据对象
        var dataToSend = {
            name: name,
            tel: tel,
            email: email,
            rating: rating,
            message: message
        };

        AjaxHelper.sendPost("http://bugcreator.org.cn:5000/feedback/add", dataToSend)
            .then(success => {
                $('#successToast').toast('show'); // 显示成功提示框
                clean();
            })
            .catch(error => {
                // 错误回调
                console.error('Error:', error);
                $('#errorModal').modal('show'); // 显示错误模态框
            });

    });
    $('#reset').on('click', function (e) {
        e.preventDefault(); // 阻止表单默认提交行为
        // 清空表单字段的值
        clean();
    });


});
