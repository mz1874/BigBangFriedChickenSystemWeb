$(document).ready(function() {
    var currentUserId = localStorage.getItem("userId");
    if (!currentUserId) {
        alert("Invalid request! You must login first.");
        return;
    }

    function getCurrentCart(){
        // 发送 AJAX 请求获取购物车数据
        AjaxHelper.sendGet(`http://localhost:5000/shoppingCart/select?currentUserId=${currentUserId}`).then(success => {
            // 清空现有的内容
            $(".container .row").empty();
            let totalPrice = 0; // 初始化总价为0

            // 处理获取到的每个购物车项
            success.message.forEach(e => {
                // 创建购物车项的 HTML 结构
                var itemHTML = `
                <div class="card-body col-md-12">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${e.img}" width="130px" height="130px">
                        </div>
                        <div class="col-md-6">
                            <h5 class="card-title">${e.food_name}</h5>
                            <div class="total-row">
                                <span>Unit price</span>
                                <span class="subtotal">RM ${e.single_price.toFixed(2)}</span>
                            </div>
                            <div class="total-row">
                                <span>Quantity</span>
                                <span class="subtotal">${e.total}</span>
                            </div>
                            <div class="total-row">
                                <span>Total price</span>
                                <span class="subtotal">RM ${(e.single_price * e.total).toFixed(2)}</span>
                            </div>
                            <button class="btn btn-danger delete-item"  data-food-id="${e.food_id}">Delete</button>
                        </div>
                    </div>
                </div>
            `;
                // 将购物车项添加到 .row 容器中
                $(".container").append(itemHTML);

                // 计算总价并累加
                totalPrice += e.single_price * e.total;
            });

            // 更新总价显示
            $("#total-price").text(`RM ${totalPrice.toFixed(2)}`);

            // 添加删除按钮的点击事件
            $(".delete-item").on("click", function() {
                const foodId = $(this).data('food-id');
                AjaxHelper.sendPost("http://localhost:5000/shoppingCart/delete", {"currentUser":currentUserId, "foodId":foodId}).then(success=>{
                    alert("删除成功")
                    getCurrentCart();
                }).catch(error=>{

                })
            });
        }).catch(error => {
            console.error("Error fetching shopping cart data:", error);
        });
    }

    getCurrentCart();

});
