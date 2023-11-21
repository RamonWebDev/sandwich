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
