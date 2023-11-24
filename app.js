// Function to set the current year in the copyright element
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

// Event listener to open cart when cart icon is clicked
cartIcon.onclick = function(){
    cart.classList.add("active");
}

// Event listener to close cart when close icon is clicked
closeCart.onclick = function(){
    cart.classList.remove("active");
}
document.addEventListener('DOMContentLoaded', function() {
// Check document readiness and perform actions accordingly
if(document.readyState == 'loading'){
    loadLocalStorage()
    document.addEventListener('DOMContentLoaded', ready)
}else{
    localStorage
    ready();
}

// Save to local storage
function saveLocalStorage(){
    var cartContentList = document.getElementById('itemstorage');
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    var quantities = [];

    // Save cart items and quantities
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        var quantity = input.value;
        quantities.push(quantity);
    }

    localStorage.setItem('favorites', cartContentList.outerHTML);
    localStorage.setItem('quantities', JSON.stringify(quantities));
}

// Load from local storage
function loadLocalStorage(){
    // Load cart Content
    document.getElementById('itemstorage').outerHTML = localStorage.getItem('favorites');
    
    // Load total price and update the display total
    let loadedTotalPrice = parseFloat(localStorage.getItem('totalPrice'));
    if(!isNaN(loadedTotalPrice)){
        document.getElementsByClassName('total-price')[0].innerText = '$' + loadedTotalPrice.toFixed(2);
    }

    // Load quantities
    let quantities = JSON.parse(localStorage.getItem('quantities'));
    if (quantities) {
        var quantityInputs = document.getElementsByClassName('cart-quantity');
        for (let i = 0; i < quantities.length && i < quantityInputs.length; i++) {
            quantityInputs[i].value = quantities[i];
        }
    }
}

// Save price to local storage 
function saveTotalPrice(total){
    localStorage.setItem('totalPrice', total);
}

// Actions to be performed once the document is ready
function ready(){
    // Remove items from Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    for(let i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // Add event listeners for quantity input changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(let i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // Add event listeners for "Add to Cart" buttons
    var addCart = document.getElementsByClassName('add-cart')
    for(let i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked)
    }

    // Buy Button event listener
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}

// Actions when the "Buy" button is clicked
function buyButtonClicked(){
    alert('Your Order is placed!')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}

// Remove items from cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    saveLocalStorage()
    updateTotal()
}

// Handle quantity changes
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    saveLocalStorage()
    updateTotal()
}

// Handle "Add to Cart" button click
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src
    addProductToCart(title, price, productImg);
    updateTotal();
}


    // Function to add a product to the cart
function addProductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsBoxes = cartItems.getElementsByClassName('detail-box');

    // Check if the product is already in the cart
    for (let i = 0; i < cartItemsBoxes.length; i++) {
        var cartBox = cartItemsBoxes[i];
        var cartBoxTitle = cartBox.getElementsByClassName('cart-product-title')[0];
        if (cartBoxTitle.innerText.toLowerCase() === title.toLowerCase()) {
            alert('You have already added this item to the cart');
            return;
        }
    }

    // Create a new cart box
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    // Cart box HTML content
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div> <!--Detail-box-->
        <!--Remove Cart-->
        <i class='bx bx-trash cart-remove'></i>`;

    // Set the HTML content
    cartShopBox.innerHTML = cartBoxContent;

    // Append the cart box to the cart items
    cartItems.append(cartShopBox);

    // Add event listeners for the new cart box
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    saveLocalStorage();
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}



// Update the total price in the cart
function updateTotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    let tax = 0
    for(let i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        tax = total * .07
        total = tax + total;
    }
    // If price contains some cent value
    total = (Math.round(total * 100) / 100).toFixed(2)

    document.getElementsByClassName('total-price')[0].innerText = '$' + total

    // Function to get the total, including what is saved in storage
    saveTotalPrice(total);
}
});

// Function to handle the form submission
function infoSent(){
    // Getting info submitted by the user
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    alert('Dear ' + name + '. Thank you for the feedback. We will reach you at the email you entered: ' + email);
}