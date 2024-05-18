$(document).ready(function() {
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

        // 现在你可以将 dataToSend 用于提交数据或进行其他操作
        console.log('Data to send:', dataToSend);
    });
});
