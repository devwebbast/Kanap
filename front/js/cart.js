// produit enregistré dns le localstorage
let products = JSON.parse(localStorage.getItem("productCart")) // converti les donnés au format JSON dans le localstorage en object JS


async function main(){
      let cartHtmlList = ""
      let totalPrice = 0
      if(products === null || products.length === 0) return -1
       for (let k = 0; k < products.length; k++){
        const product = products[k] 
        totalPrice = totalPrice + product.price * product.quantity
        cartHtmlList = cartHtmlList + `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
              <img src="${product.imageUrl}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${product.color}</p>
                <p>${product.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`
          document.querySelector("#cart__items").innerHTML = cartHtmlList
          document.querySelector("#totalPrice").innerHTML = totalPrice
          
        }

        //modification de la quantité d'un produit du panier
        let btnChangeQuantity = document.querySelectorAll(".itemQuantity")
        for (let j = 0; j < btnChangeQuantity.length; j++){
          btnChangeQuantity[j].addEventListener("change", function(){
            products[j].quantity = btnChangeQuantity[j].value
            localStorage.setItem("productCart", JSON.stringify(products))
            alert('La quantité a bien été modifiée')
            location.reload()
          })
        }


        //suppression d'un produit du panier        
        let btnDelete = document.querySelectorAll(".deleteItem")
        for (let l = 0; l < btnDelete.length; l++){
          btnDelete[l].addEventListener("click", function(){
            products.splice(l, 1)
            localStorage.setItem("productCart", JSON.stringify(products))
            alert('Le produit a bien été supprimé du panier')
            location.reload()
          })
        }
      }

main()

    //Bouton validation du formulaire
    const orderButton = document.querySelector('#order')
    orderButton.addEventListener('click', (event) => {
      event.preventDefault();
      validateForm(); 
    })


        // Validation des données du formulaire + regex
function validateForm() {
      // Vérifier que le panier n'est pas vide
      const cart = JSON.parse(localStorage.getItem('productCart'))
      if (cart.length == 0) {
      alert('Votre panier est vide')
      return
      }
      
  // Regex
  let simpleRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/
  let adressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/
  let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/
  
  const firstName = document.querySelector('#firstName').value
  const lastName = document.querySelector('#lastName').value
  const address = document.querySelector('#address').value
  const city = document.querySelector('#city').value
  const email = document.querySelector('#email').value
  
  let isError = false
  if ((simpleRegex.test(firstName) === false) || (firstName.value == "")) {
    document.querySelector('#firstNameErrorMsg').textContent = 'Veuillez saisir un prénom valide'
    isError = true
  }else{
    document.querySelector('#firstNameErrorMsg').textContent = ''
  }
  
  if ((simpleRegex.test(lastName) === false) || (lastName.value == "")) {
    document.querySelector('#lastNameErrorMsg').textContent = 'Veuillez saisir un nom valide';
    isError = true
  }else{
    document.querySelector('#lastNameErrorMsg').textContent = ''
  }
  
  if ((adressRegex.test(address) === false) || (address.value == "")) {
    document.querySelector('#addressErrorMsg').textContent = 'Veuillez saisir une adresse valide'
    isError = true
  }else{
    document.querySelector('#addressErrorMsg').textContent = ''
  }
  
  if ((simpleRegex.test(city) === false) || (city.value == "")) {
    document.querySelector('#cityErrorMsg').textContent = 'Veuillez saisir une ville valide';
    isError = true
  }else{
    document.querySelector('#cityErrorMsg').textContent = ''
  }
  
  if ((emailRegex.test(email) === false) || (email.value == "")) {
    document.querySelector('#emailErrorMsg').textContent = 'Veuillez saisir une adresse mail valide'
    isError = true
  }else{
    document.querySelector('#emailErrorMsg').textContent = ''
  }

  if(isError) {
    return -1
  }
  
  // Création de l'objet contact
  const contact = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email
  }
  const body = {contact: contact, products: cart}
  console.log(body)
  fetch('http://localhost:3000/api/products/order', {
  method: 'POST',
  body: JSON.stringify({
    contact: contact,
    products: products.map(product => product.id),
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
    localStorage.removeItem('productCart')
    document.location.href = `confirmation.html?orderId=${data.orderId}`
  })
  .catch(error => console.error(error));
}    
    
    
    

    
    