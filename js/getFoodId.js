function fetchFoodDetails(foodId) {
    $.ajax({
        url: 'http://bugcreator.org.cn:5000//food/query',
        type: 'GET',
        data: { foodId: foodId },
        success: function (response) {
            if (response.code === 200) {
                var foodData = response.data;
                $('#cart-item').text(foodData.foodName);
                $('#item-image').attr('src', foodData.src);
                $('#info').text(foodData.info);
                $('#price').text('Price: $' + foodData.price);
            } else {
                alert('Error fetching food details: ' + response.message);
            }
        },
        error: function (xhr, status, error) {
            alert('Error fetching food details: ' + xhr.responseText);
        }
    })

}