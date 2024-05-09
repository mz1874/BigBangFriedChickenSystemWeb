(function () {
  'use strict';

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {

        // 在表单提交时进行电话号码验证
        var phoneNumber = document.getElementById('phoneNumber').value;
        var phoneNumberPattern = /^[0-9]{8}$/;
        if (!phoneNumberPattern.test(phoneNumber)) {
          // 如果电话号码格式不正确，阻止表单提交
          event.preventDefault();
          event.stopPropagation();
        }

        // 在表单提交时进行电子邮件地址验证
        var email = document.getElementById('newEmail').value;
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 简单的电子邮件地址验证模式
        if (!emailPattern.test(email)) {
          // 如果电子邮件地址格式不正确，阻止表单提交
          event.preventDefault();
          event.stopPropagation();
        }

        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
  }, false);

  // 找到重置按钮元素
  var resetButton = document.querySelector('button[type="reset"]');

  // 监听重置按钮的点击事件
  resetButton.addEventListener('click', function () {
    // 找到表单元素
    var form = document.querySelector('form');
    // 重置表单
    form.reset();

    // 移除所有输入框的错误样式
    var inputs = form.querySelectorAll('input');
    inputs.forEach(function (input) {
      input.classList.remove('is-invalid');
    });

    // 移除表单的验证状态
    form.classList.remove('was-validated');
  });

  // 找到按钮元素
  var button = document.getElementById('mySubmitButton');

  // 添加点击事件监听器
  button.addEventListener('click', function () {
    // 指定跳转到的页面的 URL
    var destinationUrl = 'form_submitted.html';

    // 执行页面跳转
    window.location.href = destinationUrl;
  });
})();