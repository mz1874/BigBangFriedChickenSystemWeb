$(document).ready(function () {
    $('#submit').on('click', function (e) {
        e.preventDefault(); // 阻止表单默认提交行为
        // 获取表单字段的值
        var name = $("#name").val();
        var tel = $("#tel").val();
        var email = $("#email").val();
        var category = $("#category").val();
        var visitType = $("#visitType").val();
        var timeVisit = $("#timeVisit").val();
        var dateVisit = $("#dateVisit").val(); // 修正了变量名为dateVisit
        var subject = $("#subject").val();
        var message = $("#message").val();

        // 检查字段是否为空
        if (name === '' || tel === '' || email === '' || category === '' ||
            visitType === '' || timeVisit === '' || dateVisit === '' ||
            subject === '' || message === '') {
            $('#myModal').modal('show');
            return; // 停止执行函数
        }

        // 构建要发送的数据对象
        var dataToSend = {
            name: name,
            tel: tel,
            email: email,
            category: category,
            visitType: visitType,
            timeVisit: timeVisit,
            dateVisit: dateVisit,
            subject: subject,
            message: message
        };

        AjaxHelper.sendPost("http://bugcreator.org.cn:5000/feedback/add", dataToSend)
            .then(success => {
                // 成功回调
                $('#successToast').toast('show'); // 显示成功提示框
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
        $("#name").val("");
        $("#tel").val("");
        $("#email").val("");
        $("#category").val("");
        $("#visitType").val("");
        $("#timeVisit").val("");
        $("#dateVisit").val("");
        $("#subject").val("");
        $("#message").val("");
    });


});
