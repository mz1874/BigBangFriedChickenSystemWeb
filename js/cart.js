$(document).ready(function () {
    // Function to get and format current date and time
    function getCurrentDateTime() {
        var now = new Date();
        var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return now.toLocaleDateString('en-US', options);
    }

    // Set current date and time
    $('#current-date-time').text(getCurrentDateTime());

    // Function to fetch and display shopping cart items
    function fetchShoppingCart() {
        $.ajax({
            url: 'http://bugcreator.org.cn:5000/shoppingCart/select',
            type: 'GET',
            success: function (response) {
                var cartItems = response.message;
                $('#add-to-cart-form').empty();
                var totalPrice = 0;
                cartItems.forEach(function (item) {
                    var itemTotal = item.single_price * item.total;
                    totalPrice += itemTotal;
                    $('#cart-items').append(
                        '<div class="cart-item">' +
                        '<div class="item-details">' +
                        '<p>' + item.food_name + '</p>' + // 食物名称
                        '<p>' + 'Added Time: ' + new Date(item.added_time).toLocaleString() + '</p>' + // 添加时间
                        '<p><img src="' + item.img + '" alt="' + item.food_name + '" width="50"></p>' + // 图片
                        '</div>' +
                        '<div class="item-price">RM' + item.single_price.toFixed(2) + '</div>' + // 单价
                        '<div class="item-quantity">' +
                        '<button class="qty-btn minus-btn" data-food-id="' + item.food_id + '">-</button>' +
                        '<span class="qty">' + item.total + '</span>' +
                        '<button class="qty-btn plus-btn" data-food-id="' + item.food_id + '">+</button>' +
                        '</div>' +
                        '<div class="item-total">RM' + itemTotal.toFixed(2) + '</div>' + // 商品总价
                        '</div>'
                    );
                });
                $('#total-price').text(totalPrice.toFixed(2));
            },
            error: function (xhr, status, error) {
                alert('Error fetching shopping cart: ' + xhr.responseText);
            }
        });
    }

    // Fetch shopping cart when the page loads
    fetchShoppingCart();

    // Add item to cart
    $('#add-to-cart-form').on('submit', function (e) {
        e.preventDefault();
        var foodId = $('#food-id').val();
        var quantity = $('#quantity').val() || 1;
        $.ajax({
            url: 'http://bugcreator.org.cn:5000/shoppingCart/add',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ foodId: foodId, quality: quantity }),
            success: function (response) {
                alert(response.message);
                fetchShoppingCart(); // 更新购物车列表
            },
            error: function (xhr, status, error) {
                alert('Error adding item to cart: ' + xhr.responseText);
            }
        });
    });

    // Remove item from cart
    $(document).on('click', '.remove-item', function () {
        var foodId = $(this).data('food-id');
        $.ajax({
            url: 'http://bugcreator.org.cn:5000/shoppingCart/delete',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ foodId: foodId }),
            success: function (response) {
                alert(response.message);
                fetchShoppingCart();
            },
            error: function (xhr, status, error) {
                alert('Error removing from cart: ' + xhr.responseText);
            }
        });
    });
});