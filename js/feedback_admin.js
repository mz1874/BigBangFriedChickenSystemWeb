$(document).ready(function() {
    // 处理分页链接的点击事件
    $('#pagination').on('click', '.page-link', function(event) {
        event.preventDefault(); // 阻止默认行为
        var page = $(this).text(); // 获取点击的页码
        loadPageData(page); // 加载对应页码的数据
    });

    // 处理 Next 按钮点击事件
    $('#pagination').on('click', '.page-next', function(event) {
        event.preventDefault(); // 阻止默认行为
        var currentPage = parseInt($('#pagination .active a').text()); // 获取当前页码
        var nextPage = currentPage + 1; // 计算下一页页码
        loadPageData(nextPage); // 加载下一页数据
    });

    // 定义加载指定页码数据的函数
    function loadPageData(page) {
        var requestData = { "page": page, "count": 20 };
        AjaxHelper.sendGet("http://bugcreator.org.cn:5000/feedback/page", requestData)
            .then(success => {
                // 清空现有数据
                $('#feedbackTable tbody').empty();

                // 填充新数据
                success.message.items.forEach(item => {
                    var newRow = $('<tr>');
                    newRow.append('<td><span>' + item.id + '</span></td>');
                    newRow.append('<td><span>' + item.category + '</span></td>');
                    newRow.append('<td><span>' + item.name + '</span></td>');
                    newRow.append('<td><span>' + item.message + '</span></td>');
                    newRow.append('<td><button type="button" class="btn btn-success">Detail</button></td>');
                    $('#feedbackTable tbody').append(newRow);
                });

                // 更新分页导航
                updatePagination(success.message);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // 定义更新分页导航的函数
    function updatePagination(message) {
        var pagination = $('#pagination');
        pagination.empty(); // 清空现有分页导航

        if (message.has_prev) {
            pagination.append('<li class="page-item"><a class="page-link" href="#">Previous</a></li>');
        } else {
            pagination.append('<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>');
        }

        for (var i = 1; i <= message.pages; i++) {
            if (i === message.page) {
                pagination.append('<li class="page-item active"><a class="page-link" href="#">' + i + '</a></li>');
            } else {
                pagination.append('<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>');
            }
        }

        if (message.has_next) {
            pagination.append('<li class="page-item"><a class="page-link page-next" href="#">Next</a></li>');
        } else {
            pagination.append('<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>');
        }
    }

    // 初始加载第一页数据
    loadPageData(1);
});
