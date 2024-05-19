function getCategoryFromUrl() {
    var url = window.location.href;
    var parts = url.split('/');
    var lastPart = parts[parts.length - 1];
    var categoryName = lastPart.replace('.html', '').replace('menu_', '');
    return categoryName;
}

function fetchCategories() {
    $.ajax({
        url: 'http://bugcreator.org.cn:5000/foodCategory/list',
        type: 'GET',
        success: function (response) {
            var categories = response.message.items;
            var categoryList = $('<ul></ul>').addClass('nav-tabs');
            var listItem = $('<li></li>').addClass('nav');
            var currentCategory = getCategoryFromUrl().toString();

            categories.forEach(function (category) {
                var categoryName = category.categoryName.replace(/\s+/g, '').toLowerCase();
                var categoryLink = 'menu_' + categoryName + '.html';
                var tabLink = $('<a></a>').addClass('nav-item nav-link link-body-emphasis').attr('href', categoryLink).text(category.categoryName);

                if (categoryName === currentCategory) {
                    tabLink.addClass('active');
                    $('#categoryName').text(category.categoryName);

                }

                listItem.append(tabLink);
                categoryList.append(listItem);
            });

            $('#categoriesTabs').html(categoryList);


        },
        error: function (xhr, status, error) {
            alert('Error fetching categories: ' + xhr.responseText);
        }
    });
}

function getCurrentFoodByFoodId(){
    AjaxHelper.sendGet("http://bugcreator.org.cn:5000/food/query", {"foodId":localStorage.getItem("currentFoodId")})
        .then(success=>{
            console.log(success)
        }).catch(error=>{

    })
}

$(document).ready(function () {
    fetchCategories();
    getCurrentFoodByFoodId();
});
