function readOrder(id) {
  const ordersInStorage = localStorage.getItem("orders") || '{}'
  const orders = JSON.parse(ordersInStorage)
  const order = orders[id] || {}
  render(order)
}

document.addEventListener("DOMContentLoaded", function (event) {
  const params = new URLSearchParams(location.search)
  const id = params.get('id')
  readOrder(id)
})
