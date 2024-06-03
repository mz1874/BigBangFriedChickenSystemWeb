$(document).ready(function () {
    var currentUserId = localStorage.getItem("userId");
    if(currentUserId==="" || currentUserId==null){
        alert("You have login first!")
        window.location.href = '.\\logIn.html';
        return;
    }

    function showOrderHistory(){
        AjaxHelper.sendGet(`http://bugcreator.org.cn:5000/order/selectOrderByUserId?userId=${currentUserId}`)
            .then(success => {
                console.log(success);
                if (success && success.message && success.message.length > 0) {
                    success.message.forEach(order => {
                        var orderNumber = `#${order.id.toString().padStart(8, '0')}`; // 根据订单ID生成订单号
                        var orderedOn = new Date(order.orderTime).toLocaleString(); // 将订单时间格式化为本地时间字符串
                        var price = `$${order.total.toFixed(2)}`; // 格式化价格

                        var orderInfo = `
                        <div class="order-info">
                            <ul>
                                <li><strong>Order Number:</strong> ${orderNumber}</li>
                                <li><strong>Ordered On:</strong> ${orderedOn}</li>
                                <li><strong>Price:</strong> <span id="price">${price}</span></li>
                                <li><button  style="margin-left: 160px" class="btn btn-info orderDetails" data-order-id="${order.id}">Details</button></li>
                            </ul>
                        </div>
                    `;
                        $("#order-container").append(orderInfo); // 将订单信息添加到页面中
                    });
                } else {
                    $("#order-container").text("No orders found."); // 如果没有订单数据，则显示提示信息
                }
            }).catch(error => {
            console.error("Error fetching orders:", error);
            $(".order-container").text("Error fetching orders. Please try again later."); // 如果发生错误，则显示错误信息
        });

    }

    showOrderHistory();


    $("#order-container").on("click", ".orderDetails", function () {
        var order = $(this).data("order-id");
        var dataTosend = {
            orderId:order
        }
        AjaxHelper.sendGet("http://localhost:5000/order/selectFoodByOrderId", dataTosend).then(success=>{
            console.log(success)
        }).catch(error=>{

        })
    });

});