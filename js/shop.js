/**
 * The cart object
 * @type {{grandTotal: number, numOfItems: number, items: *[]}}
 */
let cart = {
  items: [],
  numOfItems: 0,
  grandTotal: 0,
}

/**
 * Loads the cart model from the session storage and displays it
 */
function initCart(querySelector) {
  const cartInSession = sessionStorage.getItem("cart")
  if (cartInSession) {
    cart = JSON.parse(cartInSession)
  }
  render(cart, querySelector)
}

// only initialize after the DOM has been fully generated!
document.addEventListener("DOMContentLoaded", function (event) {
  setTimeout(function () {
    if (cart.numOfItems === 0) {
      initCart()
    }
  }, 150)
})
