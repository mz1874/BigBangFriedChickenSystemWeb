function fetchFoodDetails(foodId) {
    $.ajax({
        url: 'http://bugcreator.org.cn:5000//food/query',
        type: 'GET',
        data: { foodId: foodId },
        success: function (response) {
            if (response.code === 200) {
                var foodData = response.data;
                $('#foodName').text(foodData.foodName);
                $('#foodImage').attr('src', foodData.src);
                $('#foodInfo').text(foodData.info);
                $('#foodPrice').text('Price: $' + foodData.price);
            } else {
                alert('Error fetching food details: ' + response.message);
            }
        },
        error: function (xhr, status, error) {
            alert('Error fetching food details: ' + xhr.responseText);
        }
    })

}