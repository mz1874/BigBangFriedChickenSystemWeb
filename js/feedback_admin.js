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

    $('#feedbackTable').on('click', '.btn-success', function() {
        var feedbackId = $(this).data('feedback-id');
        loadFeedbackDetails(feedbackId); // 调用函数加载 Feedback 数据
    });

    // 加载 Feedback 详情数据
    function loadFeedbackDetails(feedbackId) {
        $.ajax({
            url: "http://localhost:5000/feedback/" + feedbackId,
            type: "GET",
            success: function(response) {
                console.log(response)
                if (response.status_code === 200) {
                    var feedback = response.message;
                    // 更新页面显示
                    $('#modalFeedbackEmail').text(feedback.email);
                    $('#modalFeedbackId').text(feedback.id);
                    $('#modalFeedbackMessage').text(feedback.message);
                    $('#modalFeedbackName').text(feedback.name);
                    $('#modalFeedbackTel').text(feedback.tel);
                    $('#modalFeedbackSubject').text(feedback.rating);
                    $('#feedbackModal').modal('show');
                } else {
                    console.log("Failed to load feedback details.");
                }
            },
            error: function(xhr, status, error) {
                console.log("Error loading feedback details:", error);
            }
        });
    }

    // 定义加载指定页码数据的函数
    function loadPageData(page) {
        var requestData = { "page": page, "count": 20 };
        AjaxHelper.sendGet("http://localhost:5000/feedback/page", requestData)
            .then(success => {
                // 清空现有数据
                $('#feedbackTable tbody').empty();
                // 填充新数据
                success.message.items.forEach(item => {
                    var newRow = $('<tr>');
                    newRow.append('<td><span>' + item.id + '</span></td>');
                    newRow.append('<td><span>' + item.name + '</span></td>');
                    newRow.append('<td><span>' + item.message + '</span></td>');
                    newRow.append('<td><button type="button" class="btn btn-success" data-feedback-id="' + item.id + '">Detail</button></td>'); // 添加 data-feedback-id 属性
                    $('#feedbackTable tbody').append(newRow);
                });

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
