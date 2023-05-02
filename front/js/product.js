/* RECUPERATION DE l'ID DU PRODUIT DE LA PAGE COURANTE */
const urlParams = new URLSearchParams(document.location.search)
const id = urlParams.get('id')
const UrlApi = `http://localhost:3000/api/products/${id}`
let selectedProduct = {}

// Récupération des information du produit
fetch(UrlApi)
  .then(response => response.json())
  .then((product) => {

    selectedProduct = product
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
      let productCart = {
        id: id,
        imageUrl : selectedProduct.imageUrl,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: quantityChoice,
        color: colorChoice
      }
      if (productCart.color == "" && productCart.quantity <= 0) {
        alert("Veuillez choisir une couleur et une quantité")
        return -1
        
      }
      if (productCart.color == "") {
        alert("Veuillez choisir une couleur")
        return -1
      }
      if (productCart.quantity <= 0) {
        alert("Veuillez choisir une quantité") 
        return -1
      }
      
      const productAdded = () => {
        if(window.confirm(`Votre produit a bien été ajouté au panier 
Cliquez sur ok pour continuer`)){
          window.location.href = "cart.html"
        }
      }
      
      //produit enregistré dans le local storage
      let productToLocalStorage = JSON.parse(localStorage.getItem("productCart")) // converti les donnés au format JSON dans le localstorage en object JS
      
      
      // si il y a déjà des produit dans le local storage
      if(productToLocalStorage){

        // Vérification si un produit est déjà présent dans le local storage en fonction de l'id et de la couleur, on utilise .find() pour trouver le produit
        const productInCart = productToLocalStorage.find(product => product.id === id && product.color === colorChoice)

        // nouveau produit ajouté dans le local storage
        if(productInCart){
          let newProductAdded = parseInt(productInCart.quantity) + parseInt(quantityChoice)
          productInCart.quantity = newProductAdded
          localStorage.setItem("productCart", JSON.stringify(productToLocalStorage))
          productAdded()

        // produit déjà présent, on utilise .push() pour ajouter le nouveau produit dans le local storage
        }else{
        productToLocalStorage.push(productCart)
        localStorage.setItem("productCart", JSON.stringify(productToLocalStorage))
        productAdded()
        }

      // si il n'y a pas de produit dans le local storage  
        }else{
        productToLocalStorage = []
        productToLocalStorage.push(productCart)
        localStorage.setItem("productCart", JSON.stringify(productToLocalStorage))
        productAdded()
        }
    })
}
    

    
  addToCart ()  