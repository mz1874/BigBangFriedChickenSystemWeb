/*This js is used for get food details in food detail page*/
$(document).ready(function () {
    var categoryId = 0;
    var foodId = localStorage.getItem("currentFoodId")
    AjaxHelper.sendGet(`http://bugcreator.org.cn:5000/food/query?foodId=${foodId}`).then(success => {
        var obj = success.message;
        console.log(obj)
        $("#cart-item").text(obj.foodName);
        $("#price").text(obj.price);
        $("#info").text(obj.info);
        $('#picture').attr('src', obj.src);
    }).catch(error => {

    })

    /*添加数量事件*/

    var quantity = parseInt($("#quantity").val())
    $("#add-btn").on("click", function () {
        quantity += 1;
        $("#quantity").val(quantity)
    })

    $("#subtract-btn").on("click", function () {
        if (quantity!=1){
            quantity-=1;
        }
        $("#quantity").val(quantity)
    })

    $("#add-to-cart-button").on("click", function (e){
        e.preventDefault()
        AjaxHelper.sendPost("http://bugcreator.org.cn:5000/shoppingCart/add", {"foodId":foodId, "quality":quantity, "currentUserId":localStorage.getItem("userId")}).then(success=>{
            alert("Add shopping cart successful !")
        }).catch(error=>{

        })
    })
})