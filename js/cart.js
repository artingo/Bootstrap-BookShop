/**
 * The cart item to remove in the confirm dialog
 */
let itemToRemove;

/**
 * Adds an article to the cart.
 * Increases its quantity, if it already exists.
 * @param articleNo - the article number of the article to add
 */
function addToCart(articleNo) {
  // is this a valid shop article?
  const shopItem = findItemInArticles(articleNo)
  if (shopItem) {
    // is article already in cart?
    let cartItem = findItemInCart(articleNo)
    if (!cartItem) {
      cartItem = shopItem
      cartItem.quantity = 0
      cartItem.total = 0.0
      cart.items.push(cartItem)
    }
    increaseQuantity(cartItem)
    refresh('#partial-header')
  } else {
    console.warn(`Article with id '${articleNo}' doesn't exist`)
  }
}

/**
 * Removes an item from the cart; is called after the confirm dialog.
 * @param itemToRemove
 */
function removeFromCart(itemToRemove) {
  const cartItem = findItemInCart(itemToRemove)
  if (cartItem) {
    cart.numOfItems -= cartItem.quantity
    cart.grandTotal -= cartItem.total
    const itemIndex = cart.items.indexOf(cartItem)
    cart.items.splice(itemIndex, 1)
    refresh()
    refresh('#cart-table')
  }
}

/**
 * Increase the quantity of an existing cart item
 * @param item
 * @param doRefresh - trigger a refresh, afterwards
 */
function increaseQuantity(item, doRefresh) {
  if (typeof item === "number")
    item = findItemInCart(item)

  item.quantity++
  item.showQuantity = (item.quantity > 1)
  item.total += item.price
  cart.numOfItems++
  cart.grandTotal += item.price
  if (doRefresh) {
    refresh()
    refresh('#cart-table')
  }
}

/**
 * Decrease the quantity of an existing cart item
 * @param item
 * @param doRefresh - trigger a refresh, afterwards
 */
function decreaseQuantity(item, doRefresh) {
  if (typeof item === "number")
    item = findItemInCart(item)
  if (item.quantity > 0) {
    item.quantity--
    item.total -= item.price
    cart.numOfItems--
    cart.grandTotal -= item.price
    if (doRefresh) {
      refresh()
      refresh('#cart-table')
    }
  }
}

/**
 * Finds a cart item by its article number
 * @param articleNo
 * @returns {null|*}
 */
function findItemInCart(articleNo) {
  for (const item of cart.items) {
    if (item.id === articleNo) return item
  }
  // no cart item with this articleNo was found
  return null
}

/**
 * Finds a item in the list of books
 * @param articleNo
 * @returns {any|null}
 */
function findItemInArticles(articleNo) {
  for (const item of data.books) {
    if (item.id === articleNo) return item
  }
  // no shop item with this articleNo was found
  return null
}

/**
 * Stores the cart model in the session storage and refreshes the page
 * @param querySelector
 */
function refresh(querySelector) {
  const selector = querySelector || '#partial-header'
  sessionStorage.setItem("cart", JSON.stringify(cart))
  render(cart, selector)
}

/*document.addEventListener("DOMContentLoaded", function (event) {
  initCart()
})*/

