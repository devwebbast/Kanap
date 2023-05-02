// produit enregistré dns le localstorage
let products = JSON.parse(localStorage.getItem("productCart")) // converti les donnés au format JSON dans le localstorage en object JS


async function main(){
      let cartHtmlList = ""
      let totalPrice = 0
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


        //Bouton validation du formulaire

        const orderButton = document.querySelector('#order')
        orderButton.addEventListener('click', (event) => {
          event.preventDefault();
          validateForm();
        })

      }
main()
      // Validation des données du formulaire + regex
function validateForm() {
      
        // Variables Regex
      let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/
      let adressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/
      let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/
      
      const firstName = document.querySelector('#firstName').value
      const lastName = document.querySelector('#lastName').value
      const address = document.querySelector('#address').value
      const city = document.querySelector('#city').value
      const email = document.querySelector('#email').value
      
      
      if ((nameRegex.test(firstName) === false) || (firstName.value == "")) {
        document.querySelector('#firstNameErrorMsg').textContent = 'Prénom non valide'
        console.log('Prénom non valide')
      }else{
        document.querySelector('#firstNameErrorMsg').textContent = ''
        console.log('Prénom valide')
      }
      
      if ((nameRegex.test(lastName) === false) || (lastName.value == "")) {
        document.querySelector('#lastNameErrorMsg').textContent = 'Nom non valide';
        console.log('Nom non valide')
      }else{
        document.querySelector('#lastNameErrorMsg').textContent = ''
        console.log('Nom valide')
      }
      
      if ((adressRegex.test(address) === false) || (address.value == "")) {
        document.querySelector('#addressErrorMsg').textContent = 'Adresse non valide'
        console.log('Adresse non valide')
      }else{
        document.querySelector('#addressErrorMsg').textContent = ''
        console.log('Adresse valide')
      }
      
      if ((nameRegex.test(city) === false) || (city.value == "")) {
        document.querySelector('#cityErrorMsg').textContent = 'Ville non valide';
        console.log('Ville non valide')
      }else{
        document.querySelector('#cityErrorMsg').textContent = ''
        console.log('Ville valide')
      }
      
      if ((emailRegex.test(email) === false) || (email.value == "")) {
        document.querySelector('#emailErrorMsg').textContent = 'Email non valide'
        console.log('Email non valide')
      }else{
        document.querySelector('#emailErrorMsg').textContent = ''
        console.log('Email valide')
      }
}    








