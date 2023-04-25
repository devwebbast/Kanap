// produit enregistré dns le localstorage
let productToLocalStorage = JSON.parse(localStorage.getItem("productCart")) // converti les donnés au format JSON dans le localstorage en oject JS
console.log(productToLocalStorage)

async function main(){
      let cartHtmlList = []
       for (let k = 0; k < productToLocalStorage.length; k++){
        cartHtmlList = cartHtmlList + `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
              <img src="${productToLocalStorage.imageURL}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${productToLocalStorage.name}</h2>
                <p>Vert</p>
                <p>${productToLocalStorage.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`
          document.querySelector("#cart__items").innerHTML = cartHtmlList
       }

}
main()




