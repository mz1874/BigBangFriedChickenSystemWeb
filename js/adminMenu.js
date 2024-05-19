function getCategoryFromUrl() {
    var url = window.location.href;
    var parts = url.split('/');
    var lastPart = parts[parts.length - 1];
    var categoryName = lastPart.replace('.html', '').replace('admin_MenuUpdate_', '');
    return categoryName;
}

$(document).ready(function() {
    // Function to fetch menu items for a category
    $(document).ready(function() {
        function fetchMenuItems(categoryId) {
            $.ajax({
                url: `http://bugcreator.org.cn:5000/foodCategory/getFoodsByCategoryId?categoryId=${categoryId}`,
                type: 'GET',
                success: function(response) {
                    var menuItems = response.data;
                    $('#menuItem').empty();
                    menuItems.forEach(function(item) {
                        $('#menuItem').append(`
                            <div class="col">
                                <div class="card shadow-sm mt-4">
                                    <img src="${item.img}" class="card-img-top" alt="${item.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${item.name}</h5>
                                        <p class="card-text" style="color: #818181">${item.info}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="btn-group">
                                                <text>RM ${item.price.toFixed(2)}</text>
                                            </div>
                                        </div>
                                        <p></p>
                                        <div>
                                            <a href="admin_menuUpdateDetails.html" class="btn btn-primary">Edit</a>
                                            <button type="button" class="btn btn-danger">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `);
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching menu items:', error);
                }
            });
        }
    
        // Function to fetch category ID using the category name
        function fetchCategoryId(categoryName) {
            $.ajax({
                url: `http://bugcreator.org.cn:5000/foodCategory/list`,
                type: 'GET',
                success: function(response) {
                    var categories = response.message.items;
                    var category = categories.find(c => c.categoryName.replace(/\s+/g, '').toLowerCase() === categoryName);
                    if (category) {
                        fetchMenuItems(category.id);
                    } else {
                        console.error('Category not found');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching categories:', error);
                }
            });
        }
    
        // Get category name from URL and fetch corresponding category ID
        var categoryName = getCategoryFromUrl();
        fetchCategoryId(categoryName);
    });
});

