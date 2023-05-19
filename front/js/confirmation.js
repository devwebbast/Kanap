const urlParams = new URLSearchParams(document.location.search)
const id = urlParams.get('orderId')

document.querySelector('#orderId').textContent = id