$(document).ready(function () {
    var currentUserId = localStorage.getItem("userId");
    if(currentUserId==="" || currentUserId==null){
        alert("You have login first!")
        window.location.href = '.\\logIn.html';
        return;
    }

    function showOrderHistory(){
        AjaxHelper.sendGet(`http://localhost:5000/order/selectOrderByUserId?userId=${currentUserId}`)
            .then(success => {
                if (success && success.message && success.message.length > 0) {
                    success.message.forEach(order => {
                        var orderNumber = `#${order.id.toString().padStart(8, '0')}`; // 根据订单ID生成订单号
                        var orderedOn = new Date(order.orderTime).toLocaleString(); // 将订单时间格式化为本地时间字符串
                        var price = `$${order.total.toFixed(2)}`; // 格式化价格
                        var statusText = "";
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

                        var orderInfo = `
                        <div class="order-info">
                            <ul>
                                <li><strong>Order Number:</strong> ${orderNumber}</li>
                                <li><strong>Ordered On:</strong> ${orderedOn}</li>
                                <li><strong>Price:</strong> <span id="price">${price}</span></li>
                                <li><strong>Status:</strong> <span id="status">${statusText}</span></li>
                                <li><strong>Pick Up or Delivery:</strong> <span id="status">${order.isPickUp ? "Pick Up" : "Delivery" }</span></li>
                                <li><button style="margin-left: 160px" class="btn btn-info orderDetails" data-toggle="modal" data-target="#myModal" data-order-id="${order.id}">Details</button></li>
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
        $(".foods").empty();
        AjaxHelper.sendGet("http://bugcreator.org.cn:5000/order/selectFoodByOrderId", dataTosend).then(success=>{
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

});
