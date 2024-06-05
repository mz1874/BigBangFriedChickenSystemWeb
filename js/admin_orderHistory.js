$(document).ready(function () {


    function selectAllOrders(){
        var dataTosend = {
            "page":1,
            "count":20,
        }

        // 假设有一个处理按钮点击的函数
        function handleButtonClick(orderId) {
            alert(`点击了订单ID为 ${orderId} 的按钮`);
            // 在这里可以执行与该订单ID相关的操作
        }
        AjaxHelper.sendGet("http://localhost:5000/order/page", dataTosend).then(success=>{
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



    }
    selectAllOrders();
    $('body').on("click", "#operation", function() {
        var orderId = $(this).data("orderid");
        var dataTosend = {
            orderId:orderId
        }
        $(".foods").empty();
        AjaxHelper.sendGet("http://localhost:5000/order/selectFoodByOrderId", dataTosend).then(success=>{
            console.log(success)
            success.message.forEach(e=>{
                console.log(e)
                var itemHTML = `
                <div class="card-body col-md-12">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${e.img}" width="130px" height="130px">
                        </div>
                        <div class="col-md-6">
                            <h5 class="card-title">${e.foodName}</h5>
                            <div class="total-row">
                                <span>Unit price</span>
                                <span class="subtotal">RM ${e.price.toFixed(2)}</span>
                            </div>
                            <div class="total-row">
                                <span>Quantity</span>
                                <span class="subtotal">${e.quantity}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
                // 将购物车项添加到 .row 容器中
                $(".foods").append(itemHTML);
            })
        }).catch(error=>{

        })
    });
})
