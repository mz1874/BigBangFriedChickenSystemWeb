$(document).ready(function () {

    var currentFoodImageSrc = "";

    function selectAllPerson(page = 1) { // 默认页码为1
        AjaxHelper.sendGet(`http://localhost:5000/user/page?page=${page}`).then(success => {

            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = ''; // 清空现有的表格内容
            success.message.items.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <th scope="row">${user.id}</th>
            <td>${user.userName}</td>
            <td>${user.address}</td>
            <td>
                <button type="button" id="detail_button" class="btn btn-link btn-detail" data-user-id="${user.id}">Detail</button>
                <button type="button" id="delete_button" class="btn btn-danger btn-delete" data-user-id="${user.id}">DELETE</button>
                <button type="button" class="btn btn-success btn-update" data-user-id="${user.id}">Update</button>
            </td>
        `;
                tableBody.appendChild(row);
            });
            updatePagination(success.message); // 假设已有该函数实现分页更新
        }).catch(error => {
            console.error(error);
        });

    }


    $('#Reset').click(function () {
        $('#searchForm')[0].reset(); // 重置表单
    });

    $("#Search").on("click", function () {
        let currentPersonName = $('#currentPersonName').val();
        AjaxHelper.sendGet(`http://localhost:5000/user/page?page=1&username=${currentPersonName}`).then(success => {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = ''; // 清空现有的表格内容
            success.message.items.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <th scope="row">${user.id}</th>
            <td>${user.userName}</td>
            <td>${user.address}</td>
            <td>
                <button type="button" id="detail_button" class="btn btn-link btn-detail" data-user-id="${user.id}">Detail</button>
                <button type="button" id="delete_button" class="btn btn-danger btn-delete" data-user-id="${user.id}">DELETE</button>
                <button type="button" class="btn btn-success btn-update" data-user-id="${user.id}">Update</button>
            </td>
        `;
                tableBody.appendChild(row);
            });
            updatePagination(success.message); // 假设已有该函数实现分页更新
        }).catch(error => {
            console.error(error);
        });
    })

    // 定义更新分页导航的函数
    function updatePagination(message) {
        var pagination = $('#pagination');
        pagination.empty(); // 清空现有分页导航

        if (message.has_prev) {
            pagination.append('<li class="page-item"><a class="page-link" href="#" data-page="' + (message.page - 1) + '">Previous</a></li>');
        } else {
            pagination.append('<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>');
        }

        for (var i = 1; i <= message.pages; i++) {
            if (i === message.page) {
                pagination.append('<li class="page-item active"><a class="page-link" href="#" data-page="' + i + '">' + i + '</a></li>');
            } else {
                pagination.append('<li class="page-item"><a class="page-link" href="#" data-page="' + i + '">' + i + '</a></li>');
            }
        }

        if (message.has_next) {
            pagination.append('<li class="page-item"><a class="page-link" href="#" data-page="' + (message.page + 1) + '">Next</a></li>');
        } else {
            pagination.append('<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>');
        }

        // 添加分页按钮点击事件
        pagination.find('.page-link').click(function (e) {
            e.preventDefault();
            var page = $(this).data('page');
            if (page) {
                selectAllPerson(page);
            }
        });
    }


    /*新增食物*/
    $('#Add').click(function () {
        $('#foodAdd').modal('show');
        AjaxHelper.sendGet("http://bugcreator.org.cn:5000/foodCategory/list", null).then(success => {
            const foodCategories = success.message.items;
            const foodCategorySelect = $('#foodCategoryId');
            foodCategorySelect.empty();
            // 遍历每个食物类别并创建 <option> 元素
            foodCategories.forEach(category => {
                const option = $('<option></option>')
                    .attr('value', category.id)
                    .text(category.categoryName);
                foodCategorySelect.append(option);
            });
        }).catch(error => {

        })
    });



    /*删除食物*/
    function deleteUserById(userId) {
        AjaxHelper.sendPost("http://localhost:5000/deleteUser", {"user_id": userId}).then(success => {
            selectAllPerson();
        }).catch(error => {

        })
    }


    /*文件上传*/
    // 监听文件选择框的change事件
    $('#imageFile').on('change', function () {
        const file = $(this)[0].files[0]; // 获取选择的文件
        const formData = new FormData(); // 创建一个FormData对象
        formData.append('foodImage', file); // 将文件添加到FormData对象中
        AjaxHelper.sendPost("http://bugcreator.org.cn:5000/food/upload", formData).then(success => {
            currentFoodImageSrc = success.file_path;

            $('#successToast').toast('show');

        }).catch(error => {
            console.log(error)
        })
    });


    $('#imageFile_update').on('change', function () {
        const file = $(this)[0].files[0]; // 获取选择的文件
        const formData = new FormData(); // 创建一个FormData对象
        formData.append('foodImage', file); // 将文件添加到FormData对象中
        AjaxHelper.sendPost("http://bugcreator.org.cn:5000/food/upload", formData).then(success => {
            currentFoodImageSrc = success.file_path;
            $("#CurrentImageUpdate").attr('src', "http://bugcreator.org.cn" + currentFoodImageSrc);
            $('#successToast2').toast('show');
        }).catch(error => {
            console.log(error)
        })
    });


    $('#tableBody').on('click', '.btn-delete', function () {
        const userId = $(this).data('user-id');
        if (confirm(`Are you sure you want to delete food with ID ${userId}?`)) {
            deleteUserById(userId);
        }
    });

    $('#tableBody').on('click', '.btn-update', function () {
        const user = $(this).data('user-id');
        const dataTosend = {
            "userId":user
        }
        AjaxHelper.sendGet(`http://localhost:5000/user/selectUserById`, dataTosend).then(success => {
            var obj = success.message;
            $("#name_update").val(obj.userName);
            $("#mobileNumber_update").val(obj.tel);
            $("#address_update").val(obj.email);
            $("#email_update").val(obj.address);
            $("#dob_update").val(obj.dob_update);
            $('#foodUpdate').modal('show');
        }).catch(error => {

        })
    });


    $('#tableBody').on('click', '.btn-detail', function () {
        const user = $(this).data('user-id');
        const dataTosend = {
            "userId":user
        }
        AjaxHelper.sendGet(`http://localhost:5000/user/selectUserById`, dataTosend).then(success => {
            var obj = success.message;
            $("#name_detail").val(obj.userName);
            $("#mobileNumber_detail").val(obj.tel);
            $("#email_detail").val(obj.email);
            $("#address_detail").val(obj.address);
            $('#foodShow').modal('show');
        }).catch(error => {

        })
    });

    $("#buttonToAddFood").on("click", function () {
        var name = $("#name").val();
        var lastname = $("#lastName").val();
        var mobileNumber = $("#mobileNumber").val();
        var email = $("#email").val();
        var password = $("#password").val();

        var requestData = {
            username: name + lastname,
            password: password,
            role: 3, // Assuming '3' is for client, you can modify as needed
            address: "beijing", // Example address, you can modify as needed
            telephone:mobileNumber,
            email:email
        };

        AjaxHelper.sendPost("http://localhost:5000/register", requestData).then(success => {
            selectAllPerson();
        }).catch(error => {

        })
    })

    $("#buttonToAddFood_update").on("click", function () {

        const formData = {
            foodId: localStorage.getItem("currentUpdateId"),
            foodName: $('#food_Name_update').val(),
            src: "http://bugcreator.org.cn" + currentFoodImageSrc,
            category: $('#foodCategoryId_update').val(),
            price: $('#price_update').val(),
            info: $('#info_update').val()
        };
        if (currentFoodImageSrc === "") {
            alert("You must upload a picture")
            return
        }
        AjaxHelper.sendPost("http://bugcreator.org.cn:5000/food/update", formData).then(success => {
            selectAllfood();
        }).catch(error => {

        })
        console.log(formData)
    })

    selectAllPerson();

});