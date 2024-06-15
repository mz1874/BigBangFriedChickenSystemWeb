$(document).ready(function () {

    $('#pagination').on('click', '.page-link', function(event) {
        event.preventDefault(); // 阻止默认行为
        var page = $(this).text(); // 获取点击的页码
        selectAllOrders(page)
    });

    // 处理 Next 按钮点击事件
    $('#pagination').on('click', '.page-next', function(event) {
        event.preventDefault(); // 阻止默认行为
        var currentPage = parseInt($('#pagination .active a').text()); // 获取当前页码
        var nextPage = currentPage + 1; // 计算下一页页码
        selectAllOrders(nextPage); // 加载下一页数据
    });

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

    function selectAllOrders(page){
        var dataTosend = {
            "page":page,
            "count":20,
            "status":1
        }

        AjaxHelper.sendGet("http://bugcreator.org.cn:5000/order/page", dataTosend).then(success=>{
            updatePagination(success.message)
            let tbody = $('.table-hover tbody');
            tbody.empty(); // 清空现有内容，以免重复添加
            success.message.items.forEach(order => {
                // 状态文本映射
                let statusText = '';
                switch(order.status) {
                    case 1:
                        statusText = 'Ordered';
                        break;
                    case 2:
                        statusText = 'Payment successful!';
                        break;
                    case 3:
                        statusText = 'Delivering';
                        break;
                    case 4:
                        statusText = 'Delivered';
                        break;
                    default:
                        statusText = 'Unknow';
                }

                let newRow = `
                    <tr>
                        <td>${order.id || '-'}</td>
                        <td>${order.orderTime || '-'}</td>
                        <td>${order.username || '-'}</td>
                        <td>${statusText}</td> 
                        <td>${order.total || '-'}</td>
                        <td> <button 
                                type="button" 
                                id="operation"
                                class="btn btn-success" 
                                data-toggle="modal" 
                                data-target="#myModal"
                                data-orderid="${order.id}"
                            >Pay</button></td>
                    </tr>
                `;
                tbody.append(newRow);
            });
        }).catch(error=>{
            console.error('Error fetching orders:', error);
        });
    }


    selectAllOrders(1);


    $('body').on("click", "#operation", function() {
        var orderId = $(this).data("orderid");
        AjaxHelper.sendPost("http://bugcreator.org.cn:5000/order/updateStatus", {"orderId":orderId, "status":2}).then(success=>{
            alert("update order statue successful!")
            selectAllOrders(1);
        }).catch(error=>{

        })
    });

    $("#search").on("click",function (){
        var orderId = $('#id').val();
        var startDay = $("#startDate").val();
        var endDay = $("#endDate").val();
        var dataTosend = {
            orderId : orderId,
            startTime:startDay,
            endTime:endDay
        }
        AjaxHelper.sendGet("http://bugcreator.org.cn:5000/order/page", dataTosend).then(success=>{
            updatePagination(success.message)
            let tbody = $('.table-hover tbody');
            tbody.empty(); // 清空现有内容，以免重复添加
            success.message.items.forEach(order => {
                // 状态文本映射
                let statusText = '';
                switch(order.status) {
                    case 1:
                        statusText = 'Ordered';
                        break;
                    case 2:
                        statusText = 'Payment successful!';
                        break;
                    case 3:
                        statusText = 'Delivering';
                        break;
                    case 4:
                        statusText = 'Delivered';
                        break;
                    default:
                        statusText = 'Unknow';
                }

                let newRow = `
                    <tr>
                        <td>${order.id || '-'}</td>
                        <td>${order.orderTime || '-'}</td>
                        <td>${order.username || '-'}</td>
                        <td>${statusText}</td> 
                        <td>${order.total || '-'}</td>
                        <td> <button 
                                type="button" 
                                id="operation"
                                class="btn btn-success" 
                                data-toggle="modal" 
                                data-target="#myModal"
                                data-orderid="${order.id}"
                            >Detail</button></td>
                    </tr>
                `;
                tbody.append(newRow);
            });
        }).catch(error=>{
            console.error('Error fetching orders:', error);
        });

    })

})
