/**
 * @author Alfred Walther
 * @version 1.1
 * @description This file contains global objects and functions being used on ALL shop pages
 */

/**
 * The cart object
 * @type {{grandTotal: number, numOfItems: number, items: *[]}}
 */
let cart = {
  items: [],
  numOfItems: 0,
  grandTotal: 0
}

/**
 * Loads the cart model from the session storage and displays it
 * @param querySelector - a querySelector to render, e.g. '#partial-header'
 */
function initCart(querySelector) {
  const cartInSession = sessionStorage.getItem("cart")
  if (cartInSession) {
    cart = JSON.parse(cartInSession)
  }
  render(cart, querySelector)
}

function clearCart() {
  cart.items = []
  cart.numOfItems = 0
  cart.grandTotal = 0
  sessionStorage.setItem("cart", JSON.stringify(cart))
}


// only initialize after the static HTML content has been fully loaded!
document.addEventListener("DOMContentLoaded", function (event) {
  setTimeout(function () {
    if (!location.pathname.includes('index.html')) {
      initCart()
    }
    // wait 150 milliseconds, so that other Handlebars DOM elements may be created, first!
  }, 150)
})
