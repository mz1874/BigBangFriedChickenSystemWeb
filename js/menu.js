// Function to fetch menu items based on categoryId
function fetchMenuItems(categoryId) {
    $.ajax({
        url: 'http://bugcreator.org.cn:5000/foodCategory/getFoodsByCategoryId?categoryId=' + categoryId,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Data received for categoryId ' + categoryId + ':', data);
            if (data && data.data) {
                var items = data.data;
                var html = '';
                items.forEach(function(item) {
                    html += '<div class="col">';
                    html += '<div class="card shadow-sm mt-4">';
                    html += '<img src="' + item.img + '" class="card-img-top" alt="' + item.name + '">';
                    html += '<div class="card-body">';
                    html += '<h5 class="card-title">' + item.name + '</h5>';
                    html += '<p class="card-text">' + item.info + '</p>';
                    html += '<div class="d-flex justify-content-between align-items-center">';
                    html += '<div class="btn-group">';
                    html += '<text>RM ' + item.price.toFixed(2) + '</text>'; 
                    html += '</div>';
                    html += '<a href="menu_detail.html?id=' + item.id + '">';
                    html += '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#7F3720" class="bi bi-plus-square-fill" viewBox="0 0 16 16">';
                    html += '<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>';
                    html += '</svg>';
                    html += '</a>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                });
                $('#foodItem').html(html); // Replace existing content with fetched menu items
            }
        },
        error: function(xhr, status, error) {
            console.error('Error fetching menu items for categoryId ' + categoryId + ':', error);
        }
    });
}

// Function to extract category name from URL
function getCategoryFromUrl() {
    var url = window.location.href;
    var parts = url.split('/');
    var lastPart = parts[parts.length - 1];
    var categoryName = lastPart.replace('.html', '').replace('menu_', '');
    return categoryName;
}
