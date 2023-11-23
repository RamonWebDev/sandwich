//Function to get year and place in copyright
document.addEventListener('DOMContentLoaded', function(){
    let yearElement = document.getElementById('copyright-year');
    if(yearElement){
        let currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
})

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//open cart 
cartIcon.onclick = function(){
    cart.classList.add("active");
}

//close cart 
closeCart.onclick = function(){
    cart.classList.remove("active");
}

//Cart Working JS 
if(document.readyState == 'loading'){
    loadLocalStorage()
    document.addEventListener('DOMContentLoaded', ready)
}else{
    localStorage()
    ready();
}

//Save to local storage
function saveLocalStorage(){
    var cartContentList = document.getElementById('itemstorage')
    localStorage.setItem('favorites', cartContentList.outerHTML)
}

//Load from local storage
function loadLocalStorage(){
    //Load cart Content
    document.getElementById('itemstorage').outerHTML = localStorage.getItem('favorites');
    
    //load total price and update the display total
    let loadedTotalPrice = parseFloat(localStorage.getItem('totalPrice'))
    if(!isNaN(loadedTotalPrice)){
        document.getElementsByClassName('total-price')[0].innerText = '$' + loadedTotalPrice.toFixed(2);
    }
}

//Save price to local storage 
function saveTotalPrice(total){
    localStorage.setItem('totalPrice', total);
}

function ready(){
    //Remove items from Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(let i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(let i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addCart = document.getElementsByClassName('add-cart')
        for(let i = 0; i < addCart.length; i++){
            var button = addCart[i];
            button.addEventListener("click", addCartClicked)
    }

    //buy Button 
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}

function buyButtonClicked(){
    alert('Your Order is placed!')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}

//remove items from cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    saveLocalStorage()
    updateTotal()
}

//quantityChanged
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal()
}

//Add to Cart 
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
    for(let i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert('You have already added this item to cart')
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class=i"detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
        </div> <!--Detail-box-->
        <!--Remove Cart-->
        <i class='bx bx-trash cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    saveLocalStorage()
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}

//update Total
function updateTotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for(let i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //If price contains some cent value
        total = Math.round(total * 100) /100

        document.getElementsByClassName('total-price')[0].innerText = '$' + total

        //function to get total included what is saved in storage
        saveTotalPrice(total);
}