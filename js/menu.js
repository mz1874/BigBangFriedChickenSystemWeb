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
                                        <div>
                                            <button class="show-info-btn" data-food-id="${item.id}">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#7F3720" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                                                </svg>
                                            </button>
                                        </div>
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

    // Event delegation to handle click on show-info-btn
    $(document).on("click", ".show-info-btn", function (){
        var foodId = $(this).data("food-id"); // Get food ID from data attribute
        localStorage.setItem("currentFoodId", foodId); // Set currentFoodId in localStorage
        window.location.href = "./menu_detail.html"; // Redirect to menu_detail.html
    });

});


        // // Example event listener for category tabs or links
        // $('.categoriesTabs').on('click', function(e) {
        //     e.preventDefault();
        //     var categoryId = $(this).text();
        //      $('#Category').text(categoryId); // Update the category name heading
        //     fetchMenuItems(categoryId);
        // });

            // // Event handler for category links
        // $('#categoriesTabs').on('click', 'a', function(e) {
        //     e.preventDefault(); // Prevent default link behavior
        //     var categoryName = $(this).text(); // Get the category name from the clicked link
        //     $('#Category').text(categoryName); // Update the category name heading
        //     fetchMenuItems(categoryName); // Fetch menu items for the selected category
        // });