/* RECUPERATION DE l'ID DU PRODUIT DE LA PAGE COURANTE */
const urlParams = new URLSearchParams(document.location.search)
const id = urlParams.get('id')
const UrlApi = `http://localhost:3000/api/products/${id}`

// Récupération des information du produit
fetch(UrlApi)
  .then(response => response.json())
  .then((product) => {

    // Ajout de l'image
    let productImage = document.createElement('img')
    productImage.setAttribute('src', product.imageUrl)
    productImage.setAttribute('alt', product.altTxt)
    document.querySelector('.item__img').appendChild(productImage)

    // Ajout du nom du canapé
    let name = document.querySelector("#title")
    name.textContent = product.name

    // Ajout du prix du canapé
    let price = document.querySelector("#price")
    price.textContent = product.price

    // Ajout de la description du canapé
    let description = document.querySelector("#description")
    description.textContent = product.description

    // Ajout des couleurs du canapé
    let colors = document.querySelector("#colors")
    for (let i = 0; i < product.colors.length; i++){
      colors.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
    }

  })

  function addToCart () {
    document.querySelector('#addToCart').addEventListener('click', function (){
      let quantityChoice = document.querySelector("#quantity").value
      let colorChoice = document.querySelector("#colors").value
      let name = document.querySelector("#title").value
      let productCart = {
        id: id,
        name: name,
        quantity: quantityChoice,
        color: colorChoice
      }
      if (productCart.color == "" && productCart.quantity <= 0) {
        alert("Veuillez choisir une couleur et une quantité")
      }else if (productCart.color == "") {
        alert("Veuillez choisir une couleur")
      }else if (productCart.quantity <= 0) {
        alert("Veuillez choisir une quantité") 
      }   
      //produit enregistré dans le local storage
      let productToLocalStorage = JSON.parse(localStorage.getItem("productCart")) // converti les donnés au format JSON dans le localstorage en oject JS
      console.log(productToLocalStorage)


      // si il y a déjà des produit dans le local storage
      if(productToLocalStorage){
        productToLocalStorage.push(productCart)
        localStorage.setItem("productCart", JSON.stringify(productToLocalStorage))
      }else{
        productToLocalStorage = []
        productToLocalStorage.push(productCart)
        localStorage.setItem("productCart", JSON.stringify(productToLocalStorage))
      }

    })
  }
  addToCart ()  