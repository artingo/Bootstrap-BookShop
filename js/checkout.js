/**
 * Triggers BootsTrap's validation
 * @param form
 * @returns {Boolean} - true, if there was no validation error
 */
function validateForm(form) {
  form.classList.add('was-validated')
  return form.checkValidity()
}

/**
 * Creates a new order
 * @param form - the HTML form element
 */
function checkout(form) {
  const billing = {
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    company: form.company.value,
    country: form.country.value,
    address: form.address.value,
    city: form.city.value,
    state: form.state.value,
    zip: form.zip.value,
    phone: form.phone.value,
    email: form.email.value,
    paymentMethod: form.paymentMethod.value,
  }

  const today = new Date()
  const orderDate = today.toLocaleString('en-US')
  const newOrder = {
    billing: billing,
    orderDate: orderDate,
    items: cart.items,
    numOfItems: cart.numOfItems,
    grandTotal: cart.grandTotal
  }

  const orderNumber = placeOrder(newOrder)
  clearCart()
  location.href = 'order.html?id=' + orderNumber
}

/**
 * Saves the new order to localStorage
 * @param newOrder - the new order
 * @returns {number} -  the new order number
 */
function placeOrder(newOrder) {
  const orders = readOrders()
  const orderNumber = nextOrderNumber()
  newOrder.id = orderNumber
  orders[orderNumber.toString()] = newOrder

  localStorage.setItem("orders", JSON.stringify(orders))
  localStorage.setItem('orderCounter', JSON.stringify(orderNumber))
  return orderNumber
}

/**
 * Reads the current order counter from localStorage and increases it
 * @returns {number} - the current order counter + 1
 */
function nextOrderNumber() {
  let orderCounter = localStorage.getItem('orderCounter') || '0'
  orderCounter = Number(orderCounter)
  orderCounter++
  return orderCounter
}

/**
 * Reads the orders from localStorage
 * @returns {any} - a Map of the orders, so far
 */
function readOrders() {
  const ordersInStorage = localStorage.getItem("orders") || '{}'
  return JSON.parse(ordersInStorage)
}
