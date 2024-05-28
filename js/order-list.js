function readOrderList() {
  const ordersInStorage = localStorage.getItem("orders") || '{}'
  const orders = JSON.parse(ordersInStorage)
  const ordersToRender = {
    orders: Object.values(orders)
  }
  render(ordersToRender)
}

document.addEventListener("DOMContentLoaded", function (event) {
  readOrderList()
})
