$(document).ready(function () {

    var currentFoodImageSrc = "";

    function getFoodCategory() {
        AjaxHelper.sendGet("http://bugcreator.org.cn:5000/foodCategory/list", null)
            .then(success => {
                success.message.items.forEach(e => {
                    var foodTypeSelect = $('#foodType');
                    var option = $('<option></option>').attr('value', e.id).text(e.categoryName);
                    foodTypeSelect.append(option);
                })
            }).catch(error => {

        })
    }

    function selectAllfood(page = 1) { // 默认页码为1
        AjaxHelper.sendGet(`http://localhost:5000/food/page?page=${page}`).then(success => {
            console.log(success);
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = ''; // 清空现有的表格内容

            success.message.items.forEach(food => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <th scope="row">${food.foodId}</th>
                <td>${food.foodName}</td>
                <td>${food.price}</td>
                <td>
                    <button type="button" class="btn btn-link">Detail</button>
                    &nbsp
                    <button type="button" id="delete_button" class="btn btn-danger btn-delete" data-food-id="${food.foodId}">DELETE</button>
                    &nbsp
                    <button type="button" class="btn btn-success">Update</button>
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
        const selectedValue = $('#foodType').val();
        let foodName = $('#foodName').val();
        if (foodName === '' && !isNaN(selectedValue)) {
            AjaxHelper.sendGet(`http://localhost:5000/food/page?page=1&foodCategoryId=${selectedValue}`).then(success => {
                console.log(success);
                const tableBody = document.getElementById('tableBody');
                tableBody.innerHTML = ''; // 清空现有的表格内容
                success.message.items.forEach(food => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                <th scope="row">${food.foodId}</th>
                <td>${food.foodName}</td>
                <td>${food.price}</td>
                <td>
                    <button type="button" class="btn btn-link">Detail</button>
                    &nbsp
                     <button type="button" class="btn btn-danger btn-delete" data-food-id="${food.foodId}">DELETE</button>
                    &nbsp
                    <button type="button" class="btn btn-success">Update</button>
                </td>
            `;
                    tableBody.appendChild(row);
                });

                updatePagination(success.message); // 假设已有该函数实现分页更新
            }).catch(error => {
                console.error(error);
            });
        } else if (isNaN(selectedValue) && foodName !== '') {
            AjaxHelper.sendGet(`http://localhost:5000/food/page?page=1&foodName=${foodName}`).then(success => {
                console.log(success);
                const tableBody = document.getElementById('tableBody');
                tableBody.innerHTML = ''; // 清空现有的表格内容
                success.message.items.forEach(food => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                <th scope="row">${food.foodId}</th>
                <td>${food.foodName}</td>
                <td>${food.price}</td>
                <td>
                    <button type="button" class="btn btn-link">Detail</button>
                    &nbsp
                    <button type="button" class="btn btn-danger btn-delete" data-food-id="${food.foodId}">DELETE</button>
                    &nbsp
                    <button type="button" class="btn btn-success">Update</button>
                </td>
            `;
                    tableBody.appendChild(row);
                });

                updatePagination(success.message); // 假设已有该函数实现分页更新
            }).catch(error => {
                console.error(error);
            });
        } else {
            AjaxHelper.sendGet(`http://localhost:5000/food/page?page=1&foodName=${foodName}&foodCategoryId=${selectedValue}`).then(success => {
                console.log(success);
                const tableBody = document.getElementById('tableBody');
                tableBody.innerHTML = ''; // 清空现有的表格内容
                success.message.items.forEach(food => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                <th scope="row">${food.foodId}</th>
                <td>${food.foodName}</td>
                <td>${food.price}</td>
                <td>
                    <button type="button" class="btn btn-link">Detail</button>
                    &nbsp
                   <button type="button" id="delete_button" class="btn btn-danger btn-delete" data-food-id="${food.foodId}">DELETE</button>
                    &nbsp
                    <button type="button" class="btn btn-success">Update</button>
                </td>
            `;
                    tableBody.appendChild(row);
                });

                updatePagination(success.message); // 假设已有该函数实现分页更新
            }).catch(error => {
                console.error(error);
            });
        }


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
                selectAllfood(page);
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
    function deleteFoodById(foodId) {
        AjaxHelper.sendPost("http://bugcreator.org.cn:5000/food/delete", {"foodId": foodId}).then(success => {
            selectAllfood();
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
            console.log(success)
            $('#successToast').toast('show');
        }).catch(error => {
            console.log(error)
        })
    });


    getFoodCategory();
    selectAllfood();

    $('#tableBody').on('click', '.btn-delete', function () {
        const foodId = $(this).data('food-id');
        if (confirm(`Are you sure you want to delete food with ID ${foodId}?`)) {
            deleteFoodById(foodId);
        }
    });

    $("#buttonToAddFood").on("click", function () {
        const formData = {
            foodName: $('#food_Name').val(),
            src: currentFoodImageSrc,  // Assume this is set after file upload
            foodCategoryId: $('#foodCategoryId').val(),
            price: $('#price').val(),
            info: $('#info').val()
        };
        if (formData.src === "") {
            alert("You have to update picture first !")
            return
        }
        AjaxHelper.sendPost("http://bugcreator.org.cn:5000/food/add", formData).then(success => {
            selectAllfood();
        }).catch(error => {

        })
    })
});